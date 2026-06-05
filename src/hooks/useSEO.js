import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://niladri1.vercel.app";

const PAGE_META = {
  "/": {
    title: "Niladri Chatterjee - Full Stack Developer | MERN Stack Expert",
    description:
      "Niladri Chatterjee — Full Stack Developer specializing in MERN stack, React.js, Node.js, Next.js and TypeScript. Based in Kolkata, India.",
  },
  "/about": {
    title: "About - Niladri Chatterjee | Full Stack Developer",
    description:
      "Learn about Niladri Chatterjee — B.Tech Computer Science graduate, Full Stack Developer with 3+ internships and 10+ projects.",
  },
  "/projects": {
    title: "Projects - Niladri Chatterjee | Full Stack Developer Portfolio",
    description:
      "Explore full-stack web projects built by Niladri Chatterjee using React.js, Node.js, MongoDB, Next.js and TypeScript.",
  },
  "/skills": {
    title: "Skills - Niladri Chatterjee | React, Node.js, MERN Stack",
    description:
      "Technical skills of Niladri Chatterjee — React.js, Node.js, Express, MongoDB, Next.js, TypeScript, AWS, Docker and more.",
  },
  "/experience": {
    title: "Experience - Niladri Chatterjee | Full Stack Developer",
    description:
      "Professional experience of Niladri Chatterjee including internships in full stack web development.",
  },
  "/education": {
    title: "Education - Niladri Chatterjee | B.Tech Computer Science",
    description:
      "Educational background of Niladri Chatterjee — B.Tech in Computer Science with 8.48 CGPA.",
  },
  "/certificates": {
    title: "Certificates - Niladri Chatterjee | Developer Certifications",
    description:
      "Professional certifications and achievements of Niladri Chatterjee in web development and cloud technologies.",
  },
  "/contact": {
    title: "Contact - Niladri Chatterjee | Hire a Full Stack Developer",
    description:
      "Get in touch with Niladri Chatterjee for freelance projects, job opportunities or collaborations.",
  },
};

const FALLBACK_META = {
  title: "Niladri Chatterjee - Full Stack Developer",
  description:
    "Portfolio of Niladri Chatterjee — Full Stack Developer specializing in MERN stack.",
};

export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const meta = PAGE_META[location.pathname] ?? FALLBACK_META;
    const url = `${BASE_URL}${location.pathname}`;

    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", meta.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", url);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
  }, [location.pathname]);
};
