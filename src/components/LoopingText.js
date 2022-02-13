import { Box, Typography } from "@mui/material";
import "../LoopingText.css";

const LoopingText = ({ title, bgColor }) => {
  const content = [];
  repeatContent();
  function repeatContent() {
    let counter = 0;
    while (counter < 400) {
      content.push(title);
      counter += 1;
    }
  }
  return (
    <Box id="outer" sx={{ backgroundColor: bgColor }}>
      <div>
        <div id="loop">
          <Typography variant="h5" color="white" sx={{ textTransform: "capitalize" }}>
            {content.join(" ")}
          </Typography>
        </div>
      </div>
    </Box>
  );
};
export default LoopingText;
