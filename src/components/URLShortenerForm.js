import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Grid, Link } from "@mui/material";
import { Log } from "../loggingMiddleware";
import { loadData, saveData } from "../utils/storage";

function URLShortenerForm() {
  const [urls, setUrls] = useState([
    { longUrl: "", shortcode: "", expiry: "" },
  ]);
  const [results, setResults] = useState([]);

  // Handle input change
  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  // Add a new row (up to 5)
  const addRow = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: "", shortcode: "", expiry: "" }]);
  };

  // Shorten URLs
  const handleShorten = () => {
    const storedUrls = loadData("urls") || [];
    const newResults = [];

    urls.forEach((u, index) => {
      if (!u.longUrl) return; // skip empty

      // Default expiry
      const expiry = u.expiry ? parseInt(u.expiry) : 30;

      // Auto-generate shortcode if empty
      const shortcode =
        u.shortcode ||
        Math.random().toString(36).substring(2, 8); // 6-char code

      // Check uniqueness
      if (storedUrls.find((item) => item.shortcode === shortcode)) {
        Log("frontend", "error", "URLShortenerForm", `Shortcode ${shortcode} already exists`);
        alert(`Shortcode ${shortcode} already exists!`);
        return;
      }

      const newEntry = {
        longUrl: u.longUrl,
        shortcode,
        expiry,
        createdAt: new Date(),
        clicks: [],
      };

      storedUrls.push(newEntry);
      newResults.push(newEntry);

      // Logging
      Log("frontend", "info", "URLShortenerForm", `Shortened URL ${u.longUrl} as ${shortcode}`);
    });

    saveData("urls", storedUrls);
    setResults(newResults);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        URL Shortener
      </Typography>

      {urls.map((url, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Long URL"
                value={url.longUrl}
                onChange={(e) => handleChange(index, "longUrl", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Shortcode (Optional)"
                value={url.shortcode}
                onChange={(e) => handleChange(index, "shortcode", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry (minutes)"
                type="number"
                value={url.expiry}
                onChange={(e) => handleChange(index, "expiry", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button variant="contained" onClick={addRow} disabled={urls.length >= 5}>
          Add URL
        </Button>
        <Button variant="contained" color="primary" onClick={handleShorten}>
          Shorten URLs
        </Button>
      </Box>

      {results.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Results:
          </Typography>
          {results.map((r, idx) => (
            <Paper key={idx} sx={{ p: 2, mb: 1 }} elevation={2}>
              <Link
                href={`/${r.shortcode}`}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                {r.shortcode} → {r.longUrl}
              </Link>
              <Typography variant="body2" color="textSecondary">
                Expires in {r.expiry} mins
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default URLShortenerForm;
