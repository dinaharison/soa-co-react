import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/pages/Home";
import Login from "./authentication/pages/Login";
import Register from "./authentication/pages/Register";
import NotFound from "./home/pages/NotFound";
import { ToastContainer } from "react-toastify";
import { Grid2 as Grid } from "@mui/material";

function App() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Grid>
  );
}

export default App;
