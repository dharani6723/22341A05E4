import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import URLShortenerForm from "./components/URLShortenerForm";
import RedirectHandler from "./components/RedirectHandler";
import URLStatistics from "./components/URLStatistics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<URLShortenerForm />} />
        <Route path="/stats" element={<URLStatistics />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
