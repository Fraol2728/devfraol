export const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
};

export const formatRepoCount = (count) => {
  if (count < 5) return count.toString();
  return `${Math.floor(count / 5) * 5}+`;
};

export const isTouchDevice = () =>
  typeof window !== "undefined" &&
  (navigator.maxTouchPoints > 0 || "ontouchstart" in window);

export const validateContactForm = (data) => {
  const errors = {};
  if (!data.name?.trim() || data.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters";
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address";
  if (!data.subject?.trim()) errors.subject = "Subject is required";
  if (!data.message?.trim() || data.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";
  return errors;
};
