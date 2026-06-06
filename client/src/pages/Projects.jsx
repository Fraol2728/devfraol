import project1 from "@/assets/projects_img/project-1.png";
import project2 from "@/assets/projects_img/project-2.png";
import project3 from "@/assets/projects_img/project-3.png";
import project4 from "@/assets/projects_img/project-4.png";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Mail Spam Detector",
    description:
      "AI-powered Gmail client that detects spam, summarises emails, and lets you chat with your inbox — built with React, Node.js & Gemini API.",
    image: project4,
    github: "https://github.com/niladri-1/EMail-Spam-Detector",
    live: "https://spam-detector1.vercel.app",
    tags: [
      "MongoDB",
      "Express",
      "React",
      "Node",
      "JavaScript",
      "Gmail API",
      "OAuth2",
    ],
  },
  {
    id: 2,
    title: "Book Store",
    description:
      "A modern Book Management System built with the MERN stack (React 19 & Tailwind 4.0). Features secure JWT authentication, protected routes, and full CRUD functionality.",
    image: project3,
    github: "https://github.com/niladri-1/Bookstore-Auth-MERN",
    live: "https://curd-auth-app.vercel.app",
    tags: [
      "MongoDB",
      "Express",
      "React",
      "Node",
      "Tailwind",
      "JWT",
      "Bcrypt",
      "REST API",
    ],
  },
  {
    id: 3,
    title: "NetScan-Pro",
    description:
      "Bash-based network scanning tool that provides live host discovery, port scanning, traceroute, and ping tests, featuring visually appealing ASCII banners and 80+ stars on GitHub.",
    image: project2,
    github: "https://github.com/niladri-1/NetScan-Pro",
    live: "",
    tags: ["Linux", "Bash", "Networking", "Monitoring", "NMAP", "Scripting"],
  },
  {
    id: 4,
    title: "Student Portfolio",
    description:
      "A professional portfolio template for engineering students. Easy to set up, fully customizable, and perfect for showcasing projects and skills.",
    image: project1,
    github: "https://github.com/niladri-1/Frontend-develope-portfolio",
    live: "https://techfolio1.vercel.app",
    tags: ["Next", "Tailwind CSS", "TypeScript", "ThreeJS", "Responsive"],
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-12 gradient-text">
          Featured Projects
        </h2>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ScrollAnimation key={project.id}>
            <div className="bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm h-full flex flex-col">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm bg-purple-500/20 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Projects;
