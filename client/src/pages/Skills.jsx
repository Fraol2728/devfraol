import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Terminal,
  Wrench,
  Users,
  Brain,
  MessageSquare,
  GitBranch,
} from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import {
  JavaScriptLogo,
  ReactLogo,
  TypeScriptLogo,
  NodeLogo,
  MongoDBLogo,
  VSCodeLogo,
  GitLogo,
  TailwindLogo,
  NextjsLogo,
  VercelLogo,
  PythonLogo,
  ReduxLogo,
  ExpressLogo,
  BcryptLogo,
  JWTLogo,
  AWSLogo,
  RenderLogo,
  PostmanLogo,
  BashLogo,
  WindowsLogo,
  UbuntuLogo,
  LinuxLogo,
} from "@/components/TechLogos";

const skills = [
  {
    category: "Programming Languages",
    icon: <Code2 className="w-6 h-6" />,
    items: [
      { name: "JavaScript", icon: <JavaScriptLogo /> },
      { name: "TypeScript", icon: <TypeScriptLogo /> },
      { name: "Python", icon: <PythonLogo /> },
      { name: "Bash", icon: <BashLogo /> },
    ],
  },
  {
    category: "Front-End Development",
    icon: <Layout className="w-6 h-6" />,
    items: [
      { name: "React.js", icon: <ReactLogo /> },
      { name: "Next.js", icon: <NextjsLogo /> },
      { name: "Tailwind", icon: <TailwindLogo /> },
      { name: "Redux", icon: <ReduxLogo /> },
    ],
  },
  {
    category: "Back-End Development",
    icon: <Server className="w-6 h-6" />,
    items: [
      { name: "Node.js", icon: <NodeLogo /> },
      { name: "Express", icon: <ExpressLogo /> },
      { name: "JWT", icon: <JWTLogo /> },
      { name: "Bcrypt", icon: <BcryptLogo /> },
    ],
  },
  {
    category: "Databases & Cloud",
    icon: <Database className="w-6 h-6" />,
    items: [
      { name: "MongoDB", icon: <MongoDBLogo /> },
      { name: "Cloudinary", icon: <Cloud className="w-4 h-4" /> },
      { name: "AWS", icon: <AWSLogo /> },
    ],
  },
  {
    category: "Version Control & DevOps",
    icon: <GitBranch className="w-6 h-6" />,
    items: [
      { name: "Git", icon: <GitLogo /> },
      { name: "GitHub", icon: <GitLogo /> },
      { name: "Vercel", icon: <VercelLogo /> },
      { name: "Render", icon: <RenderLogo /> },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: <Wrench className="w-6 h-6" />,
    items: [
      { name: "VS Code", icon: <VSCodeLogo /> },
      { name: "Compass", icon: <MongoDBLogo /> },
      { name: "Postman", icon: <PostmanLogo /> },
    ],
  },
  {
    category: "Operating Systems",
    icon: <Terminal className="w-6 h-6" />,
    items: [
      { name: "Windows", icon: <WindowsLogo /> },
      { name: "Ubuntu", icon: <UbuntuLogo /> },
      { name: "Linux", icon: <LinuxLogo /> },
    ],
  },
  {
    category: "Soft Skills",
    icon: <Brain className="w-6 h-6" />,
    items: [
      { name: "Teamwork", icon: <Users className="w-4 h-4" /> },
      { name: "Communication", icon: <MessageSquare className="w-4 h-4" /> },
      { name: "Debugging", icon: <Wrench className="w-4 h-4" /> },
    ],
  },
];

const Skills = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          Technical Skills
        </h2>
      </ScrollAnimation>

      <ScrollAnimation>
        <p className="text-gray-400 mb-12 max-w-2xl">
          A comprehensive overview of my technical expertise and tools I work
          with
        </p>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skillGroup) => (
          <ScrollAnimation key={skillGroup.category}>
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-800/70 transition-all border border-white/5">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-white/10 rounded-lg">
                  {skillGroup.icon}
                </div>
                <h3 className="text-lg font-semibold">{skillGroup.category}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {skillGroup.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-gray-700/50 px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all group"
                  >
                    <div className="text-gray-400 group-hover:text-white transition-colors">
                      {skill.icon}
                    </div>
                    <span className="text-gray-400 group-hover:text-white transition-colors text-sm">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Skills;
