import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadData, saveData } from "../utils/storage";
import { Log } from "../loggingMiddleware";

function RedirectHandler() {
  const { shortcode } = useParams();

  useEffect(() => {
    const urls = loadData("urls");
    const found = urls.find((u) => u.shortcode === shortcode);

    if (found) {
      // Record the click
      const clickData = {
        timestamp: new Date(),
        source: "frontend", // could be refined if you capture more info
        location: "en-IN",  // placeholder for location
      };

      found.clicks = found.clicks || [];
      found.clicks.push(clickData);

      saveData("urls", urls);

      // Logging
      Log("frontend", "info", "RedirectHandler", `Redirected shortcode ${shortcode}`, null);

      // Redirect to original URL
      window.location.href = found.longUrl;
    } else {
      Log("frontend", "error", "RedirectHandler", `Shortcode ${shortcode} not found`, null);
      alert("Short URL not found!");
    }
  }, [shortcode]);

  return <div>Redirecting...</div>;
}

export default RedirectHandler;
