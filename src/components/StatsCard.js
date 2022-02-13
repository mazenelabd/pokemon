import React from "react";
import { Typography, Grid } from "@mui/material";

const StatsCard = ({ title, value }) => {
  return (
    <Grid item xs={6} sm={4}>
      <Typography
        variant="h4"
        sx={{
          color: "#222224",
          textAlign: "center",
          display: "table-caption",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#9999A1",
          textAlign: "center",
          display: "table-caption",
        }}
      >
        {value}
      </Typography>
    </Grid>
  );
};

export default StatsCard;
