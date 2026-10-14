export const SITE_NAME = "Habib Risky Kurniawan";
export const SITE_ALTERNATE_NAME = "motherbloodss";

export const SOCIAL_LINKS = {
  github: "https://github.com/Motherbloods",
  instagram: "https://instagram.com/habibrk_",
};

export const routeMeta = {
  "/": {
    title: "Habib Risky Kurniawan (motherbloodss) | Developer Portfolio",
    description:
      "Personal portfolio of Habib Risky Kurniawan (motherbloodss): web and mobile projects built with React, Node.js, and Flutter.",
  },
  "/about": {
    title: "About | Habib Risky Kurniawan",
    description:
      "Background, tech stack, education, and journey of Habib Risky Kurniawan, a developer who also studies networking and Linux.",
  },
  "/projects": {
    title: "Projects | Habib Risky Kurniawan",
    description:
      "Selected web, mobile, and backend projects by Habib Risky Kurniawan (motherbloodss), with tech stack and links to source code and demos where available.",
  },
  "/contact": {
    title: "Contact | Habib Risky Kurniawan",
    description:
      "Get in touch with Habib Risky Kurniawan for collaborations, project inquiries, or new opportunities.",
  },
};

export const notFoundMeta = {
  title: `Page not found | ${SITE_NAME}`,
  description: "The page you are looking for does not exist.",
  noindex: true,
};

export function normalizePath(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function getRouteMeta(pathname) {
  return routeMeta[normalizePath(pathname)] ?? notFoundMeta;
}
