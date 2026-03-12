import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '6rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Página no encontrada</h2>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        La página que buscas no existe.
      </p>
      <Link
        href="/"
        style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          color: 'white',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '1.1rem',
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
