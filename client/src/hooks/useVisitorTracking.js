import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_TRACKER_API_URL || "http://localhost:5000/api/v1";

const isNewSession = () => {
  if (sessionStorage.getItem("site_session")) return false;
  sessionStorage.setItem("site_session", "1");
  return true;
};

export const useVisitorTracking = () => {
  const location = useLocation();

  useEffect(() => {
    fetch(`${API_URL}/visitors/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: location.pathname,
        newSession: isNewSession(),
      }),
    }).catch(() => {});
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/visitors/heartbeat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      }).catch(() => {});
    }, 30000);

    return () => clearInterval(interval);
  }, []);
};
