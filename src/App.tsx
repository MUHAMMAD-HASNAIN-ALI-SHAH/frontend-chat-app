import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import Signin from "./components/Auth/Signin";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { isAuthenticated, verify } = useAuthStore();

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-full h-[90vh] overflow-y-hidden">
        <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/signin"
          element={!isAuthenticated ? <Signin /> : <Navigate to="/" />}
        />
      </Routes>
      </div>
    </div>
  );
}

export default App;
