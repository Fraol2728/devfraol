import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  FileText,
  ExternalLink,
} from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import collegeImg from "@/assets/education/college_img.jpg";
import schoolImg from "@/assets/education/school_img.jpg";
import bTechPdf from "@/assets/files/education_pdf/B Tech.pdf";
import hsMarkSheetPdf from "@/assets/files/education_pdf/HS MARK SHEET.pdf";

const educationData = [
  {
    id: 1,
    school: "Bengal College of Engineering and Technology",
    location: "Durgapur, WB, India",
    duration: "July 2020 - June 2024",
    degree: "B.Tech (Computer Science and Engineering)",
    grade: "CGPA: 8.48 (80%)",
    image: collegeImg,
    resultUrl: bTechPdf,
    coursework: [
      "Software Development",
      "DSA",
      "OOPs",
      "DBMS",
      "AI",
      "ML",
      "OS",
      "Networking",
    ],
    description:
      "During my time at BCET, I built a strong foundation in computer science, focusing on software development, problem-solving, and real-world applications. Engaging in hands-on projects, internships, and coding challenges enhanced my technical and analytical skills.",
  },
  {
    id: 2,
    school: "Birsingha Bhagabati Vidyalaya (H.S)",
    location: "Medinipur, WB, India",
    duration: "June 2018 - July 2019",
    degree: "Higher Secondary (WBSC)",
    grade: "Percentage: 79%",
    image: schoolImg,
    resultUrl: hsMarkSheetPdf,
    subjects: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Biology",
      "Computer Science",
    ],
    description:
      "My higher secondary education laid the foundation for my technical journey, strengthening analytical thinking and problem-solving abilities. The strong emphasis on mathematics and computer science shaped my passion for software development.",
  },
];

const Education = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GraduationCap className="w-8 h-8" />
          <h2 className="text-4xl font-bold gradient-text">Education</h2>
        </motion.div>
      </ScrollAnimation>

      <div className="space-y-12">
        {educationData.map((edu) => (
          <ScrollAnimation key={edu.id}>
            <div className="relative bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-gray-800/70 transition-all">
              <div className="absolute top-0 right-0 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-bl-xl flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300">{edu.duration}</span>
              </div>

              <div className="grid md:grid-cols-[350px,1fr]">
                <div className="relative h-96 md:h-full">
                  <img
                    src={edu.image}
                    alt={edu.school}
                    loading="lazy"
                    width={350}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{edu.school}</h3>
                      <div className="flex items-center gap-2 text-gray-300 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Award className="w-4 h-4" />
                        <span>{edu.grade}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <h4 className="text-lg font-semibold">{edu.degree}</h4>
                  </div>

                  <div className="flex items-start gap-2 text-gray-300 mb-6">
                    <FileText className="w-5 h-5 mt-1 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{edu.description}</p>
                  </div>

                  {edu.coursework && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu.subjects && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {edu.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <motion.a
                    href={edu.resultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                  >
                    View Result
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Education;
