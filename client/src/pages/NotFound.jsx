import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto relative z-10">
        <ScrollAnimation>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-[12rem] font-bold leading-none gradient-text"
              animate={{ y: [0, -20, 0], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              404
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          </motion.div>
        </ScrollAnimation>

        <ScrollAnimation>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Page Not Found
          </motion.h2>
        </ScrollAnimation>

        <ScrollAnimation>
          <motion.p
            className="text-gray-400 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Oops! The page you're looking for seems to have vanished into the
            digital void.
          </motion.p>
        </ScrollAnimation>

        <ScrollAnimation>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </ScrollAnimation>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] -z-10 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default NotFound;
