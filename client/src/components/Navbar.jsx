import { motion } from "framer-motion";
import { Code2, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchDialog from "./SearchDialog";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/education", label: "Education" },
  { path: "/experience", label: "Experience" },
  { path: "/skills", label: "Skills" },
  { path: "/projects", label: "Projects" },
  { path: "/certificates", label: "Certificates" },
  { path: "/contact", label: "Contact" },
  // { path: "/analytics", label: "Analytics" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      ref={menuRef}
      className="fixed top-0 w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            {/* Left — Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <Code2 className="w-8 h-8 text-white" aria-hidden="true" />
                <span className="text-xl font-bold text-white">Niladri</span>
              </Link>
            </div>

            {/* Center — Search (desktop) */}
            <div className="hidden md:flex flex-1 justify-center">
              <SearchDialog />
            </div>

            {/* Right — Nav links (desktop) */}
            <div className="hidden md:flex flex-shrink-0 items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link flex items-center gap-1.5 ${
                    location.pathname === link.path
                      ? "bg-white/15 backdrop-blur-sm"
                      : ""
                  }`}
                  aria-current={
                    location.pathname === link.path ? "page" : undefined
                  }
                >
                  {link.icon && link.icon}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile — Search + Hamburger */}
            <div className="flex md:hidden items-center space-x-2 ml-auto">
              <SearchDialog />
              <button
                className="p-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-black/50 backdrop-blur-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors ${
                    location.pathname === link.path
                      ? "bg-white/10 backdrop-blur-sm text-white"
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={
                    location.pathname === link.path ? "page" : undefined
                  }
                >
                  {link.icon && link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
