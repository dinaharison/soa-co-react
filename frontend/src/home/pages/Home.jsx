import React, { useEffect } from "react";
import useAuthStore from "../../authentication/hooks/useAuthStore";
import Logout from "../../authentication/components/Logout";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Home() {
  const { user } = useAuthStore();

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Welcome!! {user.username}
      </Typography>
      <Logout />
    </div>
  );
}

export default Home;
