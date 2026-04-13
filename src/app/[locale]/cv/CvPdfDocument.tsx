import { Document, Image, Link, Page, Path, StyleSheet, Svg, Text, View } from '@react-pdf/renderer';
import type {
  CvPdfEducationLine,
  CvPdfFeaturedProject,
  CvPdfPayload,
  CvPdfRole,
} from './cvPdfTypes';
import { CV_PDF_BOLD, CV_PDF_BOLD_ITALIC, CV_PDF_REGULAR } from './cvPdfConstants';

const palette = {
  bgPage: '#030014',
  cardBg: '#12121e',
  skillCardBg: '#16161f',
  skillCardBorder: '#35354a',
  text: '#ffffff',
  body: '#d4d4d8',
  muted: '#b3b3b3',
  accent: '#8b5cf6',
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 18,
    paddingBottom: 20,
    paddingHorizontal: 24,
    fontFamily: CV_PDF_REGULAR,
    fontSize: 9.8,
    color: palette.body,
    backgroundColor: palette.bgPage,
  },
  headerCard: {
    backgroundColor: palette.cardBg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 6,
    borderRadius: 8,
  },
  nameRow: {
    width: '100%',
    marginBottom: 6,
    paddingBottom: 0,
  },
  name: {
    fontFamily: CV_PDF_BOLD,
    fontSize: 24.5,
    color: palette.text,
    lineHeight: 1.12,
    textAlign: 'left',
  },
  headlineRow: {
    width: '100%',
    marginTop: 2,
    marginBottom: 8,
  },
  headline: {
    fontFamily: CV_PDF_BOLD,
    fontSize: 11.2,
    color: palette.accent,
    lineHeight: 1.38,
    textAlign: 'left',
  },
  /* Igual que .meta en la web: una sola franja con wrap */
  metaFlow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    marginTop: 6,
  },
  metaChunk: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    marginRight: 2,
  },
  metaIconSlot: {
    width: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3,
  },
  metaText: {
    fontFamily: CV_PDF_REGULAR,
    fontSize: 9.6,
    color: palette.muted,
    lineHeight: 1.4,
  },
  link: {
    fontFamily: CV_PDF_REGULAR,
    color: palette.muted,
    fontSize: 9.6,
    textDecoration: 'underline',
  },
  sep: {
    fontFamily: CV_PDF_REGULAR,
    fontSize: 9.6,
    color: palette.muted,
  },
  langsInline: {
    fontFamily: CV_PDF_REGULAR,
    fontSize: 9.6,
    color: palette.muted,
    lineHeight: 1.4,
  },
  langsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  /* Igual que .section en la web: bloque con fondo de tarjeta */
  sectionCard: {
    marginTop: 9,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: palette.cardBg,
    borderRadius: 10,
  },
  sectionCardFirst: {
    marginTop: 7,
  },
  sectionTitle: {
    fontFamily: CV_PDF_BOLD,
    fontSize: 11.2,
    color: palette.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  summary: {
    fontFamily: CV_PDF_REGULAR,
    fontSize: 10,
    color: palette.muted,
    lineHeight: 1.42,
    textAlign: 'justify',
  },
  summaryEm: {
    fontFamily: CV_PDF_BOLD,
    fontSize: 10,
    color: palette.text,
  },
  skillsGrid: {
    width: '100%',
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  skillRowLast: {
    marginBottom: 0,
  },
  skillCard: {
    width: '48.5%',
    backgroundColor: palette.skillCardBg,
    borderWidth: 1,
    borderColor: palette.skillCardBorder,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  skillTitle: {
    fontFamily: CV_PDF_BOLD,
    fontSize: 10,
    color: palette.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  skillBody: {
    fontFamily: CV_PDF_REGULAR,
    fontSize: 9.2,
    color: palette.muted,
    textAlign: 'center',
    lineHeight: 1.4,
  },
  experienceList: {
    width: '100%',
  },
  roleBlock: {
    marginBottom: 7,
    paddingHorizontal: 0,
    paddingVertical: 2,
  },
  roleTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  roleTitle: {
    fontFamily: CV_PDF_BOLD,
    fontSize: 10.2,
    color: palette.text,
    flex: 1,
    paddingRight: 6,
    lineHeight: 1.2,
  },
  roleMeta: {
    fontFamily: CV_PDF_BOLD,
    fontSize: 9,
    color: palette.muted,
  },
  roleCompany: {
    fontFamily: CV_PDF_REGULAR,
    fontSize: 9,
    color: palette.muted,
    marginBottom: 3,
    lineHeight: 1.3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 1,
    paddingLeft: 1,
  },
  bulletDot: {
    width: 9,
    fontFamily: CV_PDF_REGULAR,
    fontSize: 8.6,
    color: palette.accent,
  },
  bulletText: {
    flex: 1,
    fontFamily: CV_PDF_REGULAR,
    fontSize: 9,
    color: palette.muted,
    lineHeight: 1.38,
  },
  bulletAccent: {
    fontFamily: CV_PDF_BOLD,
    color: palette.accent,
  },
  educationList: {
    width: '100%',
  },
  educationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    paddingLeft: 2,
  },
  educationBullet: {
    width: 10,
    fontFamily: CV_PDF_REGULAR,
    fontSize: 9,
    color: palette.accent,
    lineHeight: 1.45,
  },
  educationLine: {
    fontFamily: CV_PDF_REGULAR,
    fontSize: 9.3,
    color: palette.muted,
    lineHeight: 1.45,
  },
  featuredProjectsGrid: {
    width: '100%',
  },
  featuredProjectsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  featuredProjectsRowLast: {
    marginBottom: 0,
  },
  featuredProjectCell: {
    width: '48.5%',
    paddingHorizontal: 2,
  },
  featuredProject: {
    width: '100%',
  },
  /** Mismo “thumbnail” para ambos proyectos (Miralab transparente + Matchpoint con arte oscuro) */
  featuredImageSlot: {
    width: '100%',
    height: 66,
    marginBottom: 5,
    backgroundColor: '#16161f',
    borderWidth: 1,
    borderColor: '#35354a',
    borderRadius: 5,
    overflow: 'hidden',
  },
  featuredImagePdfInnerDefault: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    paddingVertical: 3,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Mismo padding interior para Miralab (imagen) y Matchpoint (wordmark) */
  featuredImagePdfPaddedInner: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    paddingVertical: 5,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredImage: {
    objectFit: 'contain',
  },
  featuredImageSizeDefault: {
    width: 110,
    height: 53,
  },
  featuredImageSizeBoost: {
    width: 120,
    height: 57,
  },
  featuredDesc: {
    fontFamily: CV_PDF_REGULAR,
    fontSize: 9.5,
    color: palette.muted,
    lineHeight: 1.45,
    marginBottom: 5,
    textAlign: 'justify',
  },
  featuredStack: {
    fontFamily: CV_PDF_REGULAR,
    fontSize: 9.2,
    color: palette.muted,
    lineHeight: 1.42,
    marginBottom: 5,
    textAlign: 'left',
  },
  featuredStackLabel: {
    fontFamily: CV_PDF_BOLD,
    fontSize: 9.2,
    color: palette.text,
  },
  /** Misma idea que MatchpointWordmark / SVG: MATCH amarillo + POINT violeta, negrita itálica */
  featuredWordmarkRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  featuredWordmarkMatch: {
    fontFamily: CV_PDF_BOLD_ITALIC,
    fontSize: 17,
    letterSpacing: -0.95,
    color: '#fbbf24',
  },
  featuredWordmarkPoint: {
    fontFamily: CV_PDF_BOLD_ITALIC,
    fontSize: 17,
    letterSpacing: -0.95,
    color: '#8b5cf6',
  },
});

function EducationLineText({ line }: { line: CvPdfEducationLine }) {
  if (line.kind === 'plain') {
    return (
      <Text style={styles.educationLine}>
        <Text style={styles.summaryEm}>{line.text}</Text>
      </Text>
    );
  }
  return (
    <Text style={styles.educationLine}>
      <Text style={styles.summaryEm}>{line.title}</Text>
      <Text> · </Text>
      <Text>{line.rest}</Text>
    </Text>
  );
}

/** Misma lista vertical que `<ul className={styles.educationBullets}>` en la web */
function EducationWebList({ education }: Pick<CvPdfPayload, 'education'>) {
  return (
    <View style={styles.educationList}>
      {education.map((line, i) => (
        <View key={`edu-${i}`} style={styles.educationRow} wrap={false}>
          <Text style={styles.educationBullet}>•</Text>
          <View style={{ flex: 1 }}>
            <EducationLineText line={line} />
          </View>
        </View>
      ))}
    </View>
  );
}

function SummaryRich({ source }: { source: string }) {
  const parts: { bold: boolean; text: string }[] = [];
  const re = /<k>([^<]*)<\/k>/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    if (m.index > last) {
      parts.push({ bold: false, text: source.slice(last, m.index) });
    }
    parts.push({ bold: true, text: m[1] });
    last = m.index + m[0].length;
  }
  if (last < source.length) {
    parts.push({ bold: false, text: source.slice(last) });
  }

  return (
    <Text style={styles.summary}>
      {parts.map((p, i) =>
        p.bold ? (
          <Text key={i} style={styles.summaryEm}>
            {p.text}
          </Text>
        ) : (
          p.text
        ),
      )}
    </Text>
  );
}

const accent = palette.accent;

function resolvePdfImageSrc(pathOrUrl: string | undefined): string | undefined {
  if (!pathOrUrl) return undefined;
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl;
  if (typeof window !== 'undefined') {
    return new URL(pathOrUrl, window.location.origin).href;
  }
  return pathOrUrl;
}

function SkillCardPdf({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.skillCard}>
      <Text style={styles.skillTitle}>{title}</Text>
      <Text style={styles.skillBody}>{body}</Text>
    </View>
  );
}

function IconPin() {
  return (
    <Svg width={9} height={9} viewBox="0 0 24 24">
      <Path
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        stroke={accent}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        stroke={accent}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconWhatsApp() {
  return (
    <Svg width={9} height={9} viewBox="0 0 24 24">
      <Path
        fill={accent}
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      />
    </Svg>
  );
}

function IconMail() {
  return (
    <Svg width={9} height={9} viewBox="0 0 24 24">
      <Path
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        stroke={accent}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconLinkedIn() {
  return (
    <Svg width={9} height={9} viewBox="0 0 24 24">
      <Path
        fill={accent}
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </Svg>
  );
}

function IconGitHub() {
  return (
    <Svg width={9} height={9} viewBox="0 0 24 24">
      <Path
        fill={accent}
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.755 0 1.266-.012 2.285-.012 2.593 0 .263.18.572.681.475A9.947 9.947 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </Svg>
  );
}

function IconPortfolio() {
  return (
    <Svg width={9} height={9} viewBox="0 0 24 24">
      <Path
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        stroke={accent}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconLang() {
  return (
    <Svg width={9} height={9} viewBox="0 0 24 24">
      <Path
        d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
        stroke={accent}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CvPdfHeader({ data }: { data: CvPdfPayload }) {
  return (
    <View style={styles.headerCard}>
      <View style={styles.nameRow}>
        <Text style={styles.name}>Octavio Frangipani</Text>
      </View>
      <View style={styles.headlineRow}>
        <Text style={styles.headline}>{data.headline}</Text>
      </View>

      <View style={styles.metaFlow}>
        <View style={styles.metaChunk}>
          <View style={styles.metaIconSlot}>
            <IconPin />
          </View>
          <Text style={styles.metaText}>{data.location}</Text>
        </View>
        <Text style={styles.sep}> · </Text>
        <View style={styles.metaChunk}>
          <View style={styles.metaIconSlot}>
            <IconWhatsApp />
          </View>
          <Link src={data.whatsappHref} style={styles.link}>
            {data.phone}
          </Link>
        </View>
        <Text style={styles.sep}> · </Text>
        <View style={styles.metaChunk}>
          <View style={styles.metaIconSlot}>
            <IconMail />
          </View>
          <Link src={`mailto:${data.email}`} style={styles.link}>
            {data.email}
          </Link>
        </View>
        <Text style={styles.sep}> · </Text>
        <View style={styles.metaChunk}>
          <View style={styles.metaIconSlot}>
            <IconLinkedIn />
          </View>
          <Link src={data.linkedinUrl} style={styles.link}>
            {data.linkedinLabel}
          </Link>
        </View>
        <Text style={styles.sep}> · </Text>
        <View style={styles.metaChunk}>
          <View style={styles.metaIconSlot}>
            <IconGitHub />
          </View>
          <Link src={data.githubUrl} style={styles.link}>
            {data.githubLabel}
          </Link>
        </View>
        <Text style={styles.sep}> · </Text>
        <View style={styles.metaChunk}>
          <View style={styles.metaIconSlot}>
            <IconPortfolio />
          </View>
          <Link src={data.portfolioUrl} style={styles.link}>
            {data.portfolioLabel}
          </Link>
        </View>
      </View>

      <View style={styles.langsRow}>
        <View style={styles.metaIconSlot}>
          <IconLang />
        </View>
        <Text style={styles.langsInline}>
          {data.langSpanish}
          <Text style={styles.sep}> · </Text>
          {data.langEnglish}
        </Text>
      </View>
    </View>
  );
}

function FeaturedProjectPdf({ project }: { project: CvPdfFeaturedProject }) {
  const imgSrc = resolvePdfImageSrc(project.imageSrc);
  const imageStyle = [
    styles.featuredImage,
    project.imageSlightScale ? styles.featuredImageSizeBoost : styles.featuredImageSizeDefault,
  ];
  const innerSlot = project.imageComfortPadding
    ? styles.featuredImagePdfPaddedInner
    : styles.featuredImagePdfInnerDefault;

  return (
    <View style={styles.featuredProject}>
      {project.matchpointWordmark ? (
        <View style={styles.featuredImageSlot}>
          <View style={innerSlot}>
            <Link src={project.repoUrl}>
              <View style={styles.featuredWordmarkRow}>
                <Text style={styles.featuredWordmarkMatch}>MATCH</Text>
                <Text style={styles.featuredWordmarkPoint}>POINT</Text>
              </View>
            </Link>
          </View>
        </View>
      ) : imgSrc ? (
        <View style={styles.featuredImageSlot}>
          <View style={innerSlot}>
            <Link src={project.repoUrl}>
              <Image src={imgSrc} style={imageStyle} />
            </Link>
          </View>
        </View>
      ) : null}
      <Text style={styles.featuredDesc}>{project.description}</Text>
      {project.stack.trim() ? (
        <Text style={styles.featuredStack}>
          <Text style={styles.featuredStackLabel}>{project.stackLabel}: </Text>
          {project.stack}
        </Text>
      ) : null}
    </View>
  );
}

function RoleBlock({ role }: { role: CvPdfRole }) {
  return (
    <View style={styles.roleBlock}>
      <View style={styles.roleTop}>
        <Text style={styles.roleTitle}>{role.title}</Text>
        <Text style={styles.roleMeta}>{role.meta}</Text>
      </View>
      <Text style={styles.roleCompany}>{role.company}</Text>
      {role.bullets.map((b, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={b.accent ? [styles.bulletText, styles.bulletAccent] : styles.bulletText}>
            {b.text}
          </Text>
        </View>
      ))}
    </View>
  );
}

type CvPdfDocumentProps = {
  data: CvPdfPayload;
};

export default function CvPdfDocument({ data }: CvPdfDocumentProps) {
  return (
    <Document title={data.metaTitle} author="Octavio Frangipani" language={data.pdfLanguage}>
      <Page size="A4" style={styles.page} wrap>
        <CvPdfHeader data={data} />

        <View style={[styles.sectionCard, styles.sectionCardFirst]}>
          <Text style={styles.sectionTitle}>{data.sectionSummary}</Text>
          <SummaryRich source={data.summaryRich} />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{data.sectionSkills}</Text>
          <View style={styles.skillsGrid}>
            {Array.from({ length: Math.ceil(data.skills.length / 2) }, (_, row) => {
              const pair = data.skills.slice(row * 2, row * 2 + 2);
              const isLast = row === Math.ceil(data.skills.length / 2) - 1;
              return (
                <View key={row} style={[styles.skillRow, isLast ? styles.skillRowLast : {}]}>
                  {pair.map((s) => (
                    <SkillCardPdf key={s.title} title={s.title} body={s.body} />
                  ))}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{data.sectionExperience}</Text>
          <View style={styles.experienceList}>
            {data.roles.map((role, i) => (
              <RoleBlock key={`${role.meta}|${role.company}|${i}`} role={role} />
            ))}
          </View>
        </View>

        <View style={styles.sectionCard} wrap={false}>
          <Text style={styles.sectionTitle}>{data.sectionEducation}</Text>
          <EducationWebList education={data.education} />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{data.sectionFeaturedProjects}</Text>
          <View style={styles.featuredProjectsGrid}>
            {Array.from({ length: Math.ceil(data.featuredProjects.length / 2) }, (_, row) => {
              const pair = data.featuredProjects.slice(row * 2, row * 2 + 2);
              const rowCount = Math.ceil(data.featuredProjects.length / 2);
              const isLast = row === rowCount - 1;
              return (
                <View
                  key={`fp-row-${row}`}
                  style={[styles.featuredProjectsRow, isLast ? styles.featuredProjectsRowLast : {}]}
                >
                  {pair.map((project, i) => (
                    <View key={`fp-${row}-${i}`} style={styles.featuredProjectCell}>
                      <FeaturedProjectPdf project={project} />
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}
