import { Typography } from "@mui/material";
import React from "react";

const CircleCard = ({ value, unit }) => {
  return (
    <Typography
      variant="h3"
      sx={{
        color: "#969696",
        backgroundColor: "white",
        borderRadius: "50%",
        width: { xs: "75px", md: "100px", lg: "154px" },
        height: { xs: "75px", md: "100px", lg: "154px" },
        boxShadow: "0px 33px 56px #00000029",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: { xs: "25px", md: "30px", lg: "40px" },
      }}
    >
      {value.toFixed(1)}
      {unit}
    </Typography>
  );
};

export default CircleCard;
