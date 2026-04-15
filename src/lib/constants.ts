export const SITE = {
  name: "Renzo Beux",
  title: "Renzo Beux — Software Engineer",
  description:
    "Personal website and blog of Renzo Beux. Software Engineer writing about self-hosting, DevOps, open source, and building things.",
  url: "https://renzobeux.dev",
  ogImage: "/og-image.png",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
] as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/renzo-beux/?locale=en",
  github: "https://github.com/RenzoBeux",
} as const;

export type Project = {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  github?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Dashboarr",
    description:
      "An open-source dashboard to manage and monitor your *arr stack. Built to simplify self-hosted media management.",
    tags: ["Open Source", "Self-Hosting", "Docker", "TypeScript"],
    github: "https://github.com/RenzoBeux/Dashboarr",
  },
  {
    title: "*arr Stack Setup",
    description:
      "A fully connected self-hosted media stack using Docker Compose — Sonarr, Radarr, Prowlarr, and more, all orchestrated together.",
    tags: ["Docker", "Docker Compose", "Self-Hosting", "Homelab"],
  },
  {
    title: "Personal Website",
    description:
      "This website! Built with Astro, React, Tailwind CSS, and Motion. Dark mode, animated, and blog-ready.",
    tags: ["Astro", "React", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/RenzoBeux/RenzoBeux",
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
  { name: "PostgreSQL", category: "Backend" },
  { name: "Docker", category: "DevOps" },
  { name: "Docker Compose", category: "DevOps" },
  { name: "Linux", category: "DevOps" },
  { name: "Git", category: "DevOps" },
  { name: "CI/CD", category: "DevOps" },
  { name: "Nginx", category: "DevOps" },
];
