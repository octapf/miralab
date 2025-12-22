export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  link: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "E-Commerce Fashion",
    description: "Plataforma de comercio electrónico completa con pasarela de pagos, gestión de inventario y panel de administración.",
    image: "/images/project1.jpg",
    techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Prisma"],
    link: "https://example.com"
  },
  {
    id: 2,
    title: "App de Fitness",
    description: "Aplicación móvil para seguimiento de ejercicios, planes de entrenamiento personalizados y monitoreo de progreso.",
    image: "/images/project2.jpg",
    techStack: ["React Native", "Firebase", "Redux", "Node.js"],
    link: "https://example.com"
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    description: "Panel de control interactivo con visualización de datos en tiempo real, gráficos dinámicos y reportes automatizados.",
    image: "/images/project3.jpg",
    techStack: ["React", "D3.js", "Chart.js", "Express", "MongoDB"],
    link: "https://example.com"
  },
  {
    id: 4,
    title: "Booking System",
    description: "Sistema de reservas online para hoteles con calendario interactivo, gestión de disponibilidad y confirmación automática.",
    image: "/images/project4.jpg",
    techStack: ["Next.js", "Tailwind", "Supabase", "Stripe"],
    link: "https://example.com"
  },
  {
    id: 5,
    title: "Social Network",
    description: "Red social corporativa con chat en tiempo real, compartir contenido multimedia y sistema de notificaciones.",
    image: "/images/project5.jpg",
    techStack: ["Vue.js", "Socket.io", "AWS", "GraphQL"],
    link: "https://example.com"
  },
  {
    id: 6,
    title: "Learning Platform",
    description: "Plataforma educativa con cursos online, seguimiento de progreso, certificados y sistema de evaluación interactivo.",
    image: "/images/project6.jpg",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Mux"],
    link: "https://example.com"
  }
];
