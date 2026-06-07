import { CONTACT_INFO, OFFICE_HOURS } from "@/config/contact";
import { validateContactForm } from "@/utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  Edit2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  Timer,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };
const PENDING_DURATION = 30;

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [pendingData, setPendingData] = useState(null);
  const [countdown, setCountdown] = useState(PENDING_DURATION);

  const sendTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const pendingDataRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(sendTimeoutRef.current);
      clearInterval(countdownIntervalRef.current);
    };
  }, []);

  const clearTimers = () => {
    clearTimeout(sendTimeoutRef.current);
    clearInterval(countdownIntervalRef.current);
  };

  const sendToAPI = async (data) => {
    if (!API_URL) {
      setSubmitStatus("error");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitStatus("success");
      } else {
        if (result.errors?.length) {
          const serverErrors = {};
          result.errors.forEach(({ field, message }) => {
            serverErrors[field] = message;
          });
          setErrors(serverErrors);
        }
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startPending = (data) => {
    pendingDataRef.current = data;
    setPendingData(data);
    setCountdown(PENDING_DURATION);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    sendTimeoutRef.current = setTimeout(() => {
      const toSend = pendingDataRef.current;
      pendingDataRef.current = null;
      setPendingData(null);
      setCountdown(PENDING_DURATION);
      if (toSend) sendToAPI(toSend);
    }, PENDING_DURATION * 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus("idle");

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    clearTimers();
    const snapshot = { ...formData };
    setFormData(INITIAL_FORM);
    setErrors({});
    startPending(snapshot);
  };

  const handleEdit = () => {
    clearTimers();
    setFormData({ ...pendingDataRef.current });
    pendingDataRef.current = null;
    setPendingData(null);
    setCountdown(PENDING_DURATION);
    setSubmitStatus("idle");
  };

  const handleCancel = () => {
    clearTimers();
    pendingDataRef.current = null;
    setPendingData(null);
    setCountdown(PENDING_DURATION);
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

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

  const progressPct = (countdown / PENDING_DURATION) * 100;

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
          {/* Left: contact info */}
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

          {/* Right: form box — pending card lives inside here */}
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
                  rows={5}
                  className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border ${errors.message ? "border-red-500" : "border-white/10"} focus:border-white/20 focus:ring-1 focus:ring-white/20 outline-none transition-colors resize-none text-sm sm:text-base`}
                  value={formData.message}
                  onChange={handleChange("message")}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                >
                  Failed to send message. Please try emailing directly at{" "}
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="underline hover:text-red-300"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !!pendingData}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {/* Pending card — inside the form box, below the button */}
              <AnimatePresence>
                {pendingData && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3 }}
                    className="border border-amber-500/30 bg-amber-500/5 rounded-xl p-4"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Timer className="w-4 h-4 shrink-0" />
                        <span className="text-sm font-medium">
                          Sending in {countdown}s — you can still edit or cancel
                        </span>
                      </div>
                      <span className="text-amber-400 font-mono font-bold tabular-nums text-sm ml-2 shrink-0">
                        {countdown}s
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
                      <motion.div
                        className="h-full bg-amber-400 rounded-full"
                        initial={{ width: "100%" }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.9, ease: "linear" }}
                      />
                    </div>

                    {/* Data preview */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div className="bg-white/5 rounded-lg px-3 py-2">
                        <p className="text-gray-400 text-xs mb-0.5">Name</p>
                        <p className="text-white truncate">
                          {pendingData.name}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg px-3 py-2">
                        <p className="text-gray-400 text-xs mb-0.5">Email</p>
                        <p className="text-white truncate">
                          {pendingData.email}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg px-3 py-2">
                        <p className="text-gray-400 text-xs mb-0.5">Subject</p>
                        <p className="text-white truncate">
                          {pendingData.subject}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg px-3 py-2">
                        <p className="text-gray-400 text-xs mb-0.5">Message</p>
                        <p className="text-white line-clamp-1">
                          {pendingData.message}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors border border-red-500/20"
                      >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
