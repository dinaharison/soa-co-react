import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn) {
      console.log(user);
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  return children;
}
