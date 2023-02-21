import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {};

const Result = (props: Props) => {
  return (
    <Card
      sx={{
        maxWidth: "500px",
        width: "236px",
        marginTop: "40vh",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }}>
          Your Information was registered.
        </Typography>

        <Typography variant="body2">
          Check your email to continue with the process!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Result;
