export const SITE = {
  name: "Renzo Beux",
  title: "Renzo Beux — Software Engineer",
  description:
    "Personal website and blog of Renzo Beux. Software Engineer writing about self-hosting, DevOps, open source, and building things.",
  url: "https://renzobeux.dev",
  ogImage: "/og-image.png",
};

export const NAV_LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
] as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/renzo-beux/?locale=en",
  github: "https://github.com/RenzoBeux",
} as const;

export type ProjectLink = { label: string; href: string };

export type Project = {
  title: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  /** Which scroll-driven mini demo sits next to the project. */
  viz: "split" | "services" | "fire" | "compose";
  logo?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Spliteo",
    description:
      "Split expenses with friends, roommates and family, and keep your own budgets in the same app. Multi-currency groups, on web, iOS and Android.",
    tags: ["NestJS", "React", "Capacitor", "PostgreSQL"],
    links: [{ label: "spliteo.app", href: "https://www.spliteo.app" }],
    viz: "split",
    logo: "/logos/spliteo.png",
  },
  {
    title: "Dashboarr",
    description:
      "Open-source mobile app for a self-hosted media stack. qBittorrent, Radarr, Sonarr, Plex and more from one screen.",
    tags: ["Expo", "React Native", "TypeScript", "Open Source"],
    links: [
      { label: "Source", href: "https://github.com/RenzoBeux/Dashboarr" },
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/dashboarr/id6762170117",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.dashboarr.app",
      },
    ],
    viz: "services",
    logo: "/logos/dashboarr.png",
  },
  {
    title: "FIRE Planner",
    description:
      "Open-source financial independence calculator: your retirement number, how many years until you reach it, and whether the portfolio holds.",
    tags: ["React", "TypeScript", "Vite", "Open Source"],
    links: [
      { label: "fire.renzobeux.dev", href: "https://fire.renzobeux.dev" },
      { label: "Source", href: "https://github.com/RenzoBeux/InvestmentCalculator" },
    ],
    viz: "fire",
    logo: "/logos/fire.svg",
  },
  {
    title: "*arr Stack",
    description:
      "The Docker Compose setup behind my media server: Sonarr, Radarr, Prowlarr, qBittorrent, Plex and Jellyfin, wired together.",
    tags: ["Docker Compose", "Self-Hosting", "Homelab"],
    links: [{ label: "Read the write-up", href: "/blog/docker-compose-arr-stack" }],
    viz: "compose",
  },
];

export type Skill = {
  name: string;
  category: string;
};

export const SKILLS: Skill[] = [
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Astro", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "NestJS", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Docker", category: "DevOps" },
  { name: "Docker Compose", category: "DevOps" },
  { name: "Linux", category: "DevOps" },
  { name: "Git", category: "DevOps" },
  { name: "CI/CD", category: "DevOps" },
  { name: "Nginx", category: "DevOps" },
];
