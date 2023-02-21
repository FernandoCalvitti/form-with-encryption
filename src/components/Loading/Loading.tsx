import { Box, CircularProgress } from "@mui/material";

type Props = {};

const Loading = (props: Props) => {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <CircularProgress size={"5rem"} />
    </Box>
  );
};

export default Loading;
