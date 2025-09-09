import React, { useEffect, useState } from "react";
import { loadData } from "../utils/storage";
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Log } from "../loggingMiddleware";

function URLStatistics() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const allUrls = loadData("urls");
    setUrls(allUrls || []);

    // Log that user viewed stats
    Log("frontend", "info", "URLStatistics", "Viewed URL statistics page");
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">URL Statistics</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Shortcode</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Expiry (minutes)</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((u, idx) => (
            <TableRow key={idx}>
              <TableCell>{u.shortcode}</TableCell>
              <TableCell>{u.longUrl}</TableCell>
              <TableCell>{new Date(u.createdAt).toLocaleString()}</TableCell>
              <TableCell>{u.expiry}</TableCell>
              <TableCell>{(u.clicks || []).length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default URLStatistics;
