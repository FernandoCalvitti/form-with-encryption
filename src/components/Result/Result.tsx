import { Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetForm } from "../../app/reducers/form/formSlice";

type Props = {};

const Result = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetForm());
  });

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
