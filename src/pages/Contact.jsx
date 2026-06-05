import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  MessageCircle,
  Clock,
  Send,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { CONTACT_INFO, OFFICE_HOURS } from "@/config/contact";
import { validateContactForm } from "@/utils/helpers";

const FORMSPREE_ENDPOINT = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`;

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: CONTACT_INFO.email,
      link: `mailto:${CONTACT_INFO.email}`,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: CONTACT_INFO.phone,
      link: `tel:${CONTACT_INFO.phoneRaw}`,
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: CONTACT_INFO.location,
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Time Zone",
      value: CONTACT_INFO.timezone,
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      link: CONTACT_INFO.github,
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      link: CONTACT_INFO.linkedin,
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      link: `https://wa.me/${CONTACT_INFO.whatsapp}`,
    },
  ];

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("idle");

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData(INITIAL_FORM);
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 max-w-6xl mx-auto pb-16 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex items-center gap-3 mb-8 sm:mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8" />
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
            Get in Touch
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8 sm:gap-12">
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-800/50 p-5 sm:p-6 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                Contact Information
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="group"
                  >
                    {info.link ? (
                      <a
                        href={info.link}
                        className="flex items-center space-x-3 p-2 sm:p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className="text-gray-400 group-hover:text-white transition-colors">
                          {info.icon}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {info.label}
                          </p>
                          <p className="text-sm sm:text-base text-white">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center space-x-3 p-2 sm:p-3">
                        <div className="text-gray-400">{info.icon}</div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {info.label}
                          </p>
                          <p className="text-sm sm:text-base text-white">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-800/50 p-5 sm:p-6 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                Connect with Me
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group flex-1 sm:flex-none justify-center sm:justify-start"
                  >
                    <span className="text-gray-400 group-hover:text-white transition-colors">
                      {social.icon}
                    </span>
                    <span className="text-gray-400 group-hover:text-white transition-colors text-sm">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-800/50 p-5 sm:p-6 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Office Hours
              </h3>
              <div className="space-y-2 text-gray-400 text-sm sm:text-base">
                <p>{OFFICE_HOURS.weekday}</p>
                <p>{OFFICE_HOURS.saturday}</p>
                <p>{OFFICE_HOURS.sunday}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-6">
              Send a Message
            </h3>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 sm:space-y-6"
              noValidate
            >
              <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"} focus:border-white/20 focus:ring-1 focus:ring-white/20 outline-none transition-colors text-sm sm:text-base`}
                    value={formData.name}
                    onChange={handleChange("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"} focus:border-white/20 focus:ring-1 focus:ring-white/20 outline-none transition-colors text-sm sm:text-base`}
                    value={formData.email}
                    onChange={handleChange("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border ${errors.subject ? "border-red-500" : "border-white/10"} focus:border-white/20 focus:ring-1 focus:ring-white/20 outline-none transition-colors text-sm sm:text-base`}
                  value={formData.subject}
                  onChange={handleChange("subject")}
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-red-400">{errors.subject}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border ${errors.message ? "border-red-500" : "border-white/10"} focus:border-white/20 focus:ring-1 focus:ring-white/20 outline-none transition-colors resize-none text-sm sm:text-base`}
                  value={formData.message}
                  onChange={handleChange("message")}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center text-sm sm:text-base"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}

              {submitStatus === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center text-sm sm:text-base"
                >
                  Something went wrong. Please try again or email me directly.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
