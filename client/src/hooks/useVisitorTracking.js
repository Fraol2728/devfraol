import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_TRACKER_API_URL || "http://localhost:5000/api/v1";

const getSessionId = () => {
  let sessionId = localStorage.getItem("visitor_session");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("visitor_session", sessionId);
  }

  return sessionId;
};

export const useVisitorTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const sessionId = getSessionId();

    fetch(`${API_URL}/visitors/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        path: location.pathname,
      }),
    }).catch(() => {});
  }, [location.pathname]);

  useEffect(() => {
    const sessionId = getSessionId();

    const interval = setInterval(() => {
      fetch(`${API_URL}/visitors/heartbeat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
        }),
      }).catch(() => {});
    }, 30000);

    return () => clearInterval(interval);
  }, []);
};
