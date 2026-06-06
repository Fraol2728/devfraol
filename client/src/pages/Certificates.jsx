import typescriptPdf from "@/assets/files/certificates_pdf/TypeScript.pdf";
import awsEcsPdf from "@/assets/files/certificates_pdf/aws_ecs.pdf";
import cybersecurityPdf from "@/assets/files/certificates_pdf/cybersecurity_virtual_program.pdf";
import dockerPdf from "@/assets/files/certificates_pdf/docker_fundamentals.pdf";
import javascriptPdf from "@/assets/files/certificates_pdf/javascript.pdf";
import pythonPdf from "@/assets/files/certificates_pdf/python.pdf";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink } from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "Typescript Programming",
    issuer: "Geekster",
    date: "22nd April 2025",
    link: typescriptPdf,
    description:
      "Covers TypeScript fundamentals, including syntax, types. Includes practical examples and real-world applications.",
    skills: [
      "TypeScript",
      "JavaScript",
      "Frontend Development",
      "Backend Development",
    ],
  },
  {
    id: 2,
    title: "AWS ECS Deployment and Management",
    issuer: "KodeKloud",
    date: "20th March 2025",
    link: awsEcsPdf,
    description:
      "Covers deploying and managing containers on AWS using ECS, including cluster management, load balancing, auto-scaling, and CI/CD integration.",
    skills: ["AWS ECS", "Cloud Computing", "DevOps", "CI/CD"],
  },
  {
    id: 3,
    title: "JavaScript Programming",
    issuer: "HackerRank",
    date: "18th February 2025",
    link: javascriptPdf,
    description:
      "Validates JavaScript fundamentals, including syntax, functions, and problem-solving.",
    skills: ["JavaScript", "ES6", "Asynchronous Programming"],
  },
  {
    id: 4,
    title: "Docker Fundamentals",
    issuer: "KodeKloud",
    date: "18th February 2025",
    link: dockerPdf,
    description:
      "Teaches containerization, networking, security, and CI/CD with Docker.",
    skills: ["Docker", "Containerization", "CI/CD"],
  },
  {
    id: 5,
    title: "Python Programming",
    issuer: "HackerRank",
    date: "10th October 2023",
    link: pythonPdf,
    description:
      "Validates Python basics, including loops, functions, and data structures.",
    skills: ["Python", "Functions", "Data Structures"],
  },
  {
    id: 6,
    title: "Cybersecurity Virtual Program",
    issuer: "Forage",
    date: "10th July 2023",
    link: cybersecurityPdf,
    description:
      "Focuses on cybersecurity threats, vulnerabilities, and risk mitigation.",
    skills: ["Cybersecurity", "Threat Mitigation", "Ransomware"],
  },
];

const Certificates = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Award className="w-8 h-8" />
          <h2 className="text-4xl font-bold gradient-text">Certificates</h2>
        </motion.div>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <ScrollAnimation key={cert.id}>
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-800/70 transition-all group border border-white/5 h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
              <div className="text-gray-400 space-y-2 flex flex-col flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-lg">{cert.issuer}</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>
                </div>
                <p className="text-gray-300 line-clamp-2">{cert.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-sm bg-white/10 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-4">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 group-hover:translate-x-2 transition-transform"
                  >
                    View Certificate
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
