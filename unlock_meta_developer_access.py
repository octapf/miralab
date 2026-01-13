import os
import re
import time

from dotenv import load_dotenv
from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright


load_dotenv('.env.local')


def _env_int(name: str, default: int) -> int:
    try:
        return int(os.getenv(name, str(default)))
    except Exception:
        return default


def _click_by_text(page, patterns: list[str], timeout_ms: int = 1500) -> bool:
    for p in patterns:
        rx = re.compile(p, re.IGNORECASE)
        for role in ('button', 'link'):
            try:
                page.get_by_role(role, name=rx).first.click(timeout=timeout_ms)
                return True
            except Exception:
                pass
        try:
            page.get_by_text(rx).first.click(timeout=timeout_ms)
            return True
        except Exception:
            pass
    return False


def _is_logged_in(context, page) -> bool:
    try:
        cookies = context.cookies()
        names = {c.get('name') for c in cookies}
        if 'c_user' in names:
            return True
    except Exception:
        pass

    try:
        url = page.url or ''
        if 'login' in url or 'checkpoint' in url:
            return False
    except Exception:
        return False

    return True


def main() -> None:
    email = (os.getenv('META_LOGIN_EMAIL') or 'frangipani.octavio@gmail.com').strip()
    width = _env_int('BROWSER_WIDTH', 1200)
    height = _env_int('BROWSER_HEIGHT', 800)
    # Login can require mobile approval (Instagram/Facebook notification).
    # Defaults are intentionally generous; you can override via env vars.
    max_login_wait_s = _env_int('MAX_MANUAL_LOGIN_TOTAL_SECONDS', 600)
    keep_open_s = _env_int('KEEP_BROWSER_OPEN_SECONDS', 180)
    user_data_dir = os.getenv('PW_USER_DATA_DIR', os.path.join(os.getcwd(), '.pw-profile'))

    business_settings = 'https://business.facebook.com/settings'
    forced_login_url = (
        'https://www.facebook.com/login.php?next='
        'https%3A%2F%2Fbusiness.facebook.com%2Fsettings'
    )

    with sync_playwright() as p:
        # Persistent profile = you log in once and subsequent runs keep the session.
        context = p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=False,
            viewport={'width': width, 'height': height},
            args=[f'--window-size={width},{height}'],
        )

        # Kill popups: force window.open to behave like same-tab navigation.
        context.add_init_script(
            """
            (() => {
              const _open = window.open;
              window.open = (url) => {
                try { if (url) window.location.href = url; } catch (e) {}
                return null;
              };
            })();
            """
        )

        page = context.pages[0] if context.pages else context.new_page()

        print('\n=== META BUSINESS MANAGER FIX (SIMPLE) ===')
        print(f'Email sugerido: {email}')
        print('Objetivo: Business Settings -> Cuentas -> Aplicaciones -> Añadir app.')
        print('No se usan popups. Si hay 2FA, lo completás manual y sigo.')
        print(f'Perfil persistente: {user_data_dir} (para no loguear cada vez)')

        page.goto(business_settings, wait_until='domcontentloaded')
        time.sleep(1)

        # If login wall appears, force Facebook login in same tab (only once).
        current = page.url or ''
        if any(k in current for k in ('login', 'checkpoint', 'business/login')):
            page.goto(forced_login_url, wait_until='domcontentloaded')

        # Best-effort email prefill (manual password/2FA required).
        try:
            page.get_by_label(re.compile(r'correo|email', re.IGNORECASE)).fill(email, timeout=1500)
        except Exception:
            try:
                page.locator('input[type="email"], input[name="email"], #email').first.fill(email, timeout=1500)
            except Exception:
                pass

        # Wait for manual login / mobile approval.
        # IMPORTANT: If we are on checkpoint/two_factor, do NOT navigate away.
        deadline = time.time() + max_login_wait_s
        while time.time() < deadline:
            if _is_logged_in(context, page):
                break
            url = page.url or ''
            if any(k in url for k in ('checkpoint', 'two_factor', 'approvals', 'login/device-based')):
                # Mobile approval flows can take time; just wait.
                time.sleep(2)
            else:
                time.sleep(1)
        else:
            print('⏳ Login todavía no completado (probablemente aprobación móvil/2FA).')
            print('Dejo el navegador abierto para que lo completes manualmente.')
            time.sleep(keep_open_s)
            context.close()
            return

        # Go back to Business Settings.
        page.goto(business_settings, wait_until='domcontentloaded')
        time.sleep(2)

        # Navigate left menu: Accounts -> Apps.
        print('\n=== NAVEGANDO A Cuentas -> Aplicaciones ===')

        # Some UIs already have direct route.
        try:
            page.goto('https://business.facebook.com/settings/apps', wait_until='domcontentloaded')
            time.sleep(2)
        except Exception:
            pass

        # If not on apps, click through sidebar.
        _click_by_text(page, [r'^cuentas$', r'^accounts$'])
        time.sleep(1)
        _click_by_text(page, [r'^aplicaciones$', r'^apps$'])
        time.sleep(2)

        print('=== INTENTANDO "Añadir" / "Crear" APP ===')
        clicked_add = _click_by_text(
            page,
            [
                r'añadir',
                r'agregar',
                r'add',
                r'crear',
                r'create',
                r'nueva',
                r'new',
            ],
            timeout_ms=2000,
        )
        print(f'Click add/create detectado: {clicked_add}')

        if clicked_add:
            # Give the UI a moment to open any inline dialog.
            time.sleep(2)

        # Open developers apps as a final check.
        print('\n=== ABRIENDO Developers /apps ===')
        try:
            page.goto('https://developers.facebook.com/apps/', wait_until='domcontentloaded')
        except PlaywrightTimeoutError:
            page.goto('https://developers.facebook.com/apps/')

        print(f'URL final: {page.url}')
        print(f'\nDejo el navegador abierto {keep_open_s}s para que termines pasos manuales.')
        print('Tip: si ya quedó abierta la pantalla correcta, cerralo cuando termines.')
        time.sleep(keep_open_s)
        context.close()


if __name__ == '__main__':
    main()
