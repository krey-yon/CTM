import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { SocketProvider } from "./Context/socketContext";
import Dashboard from "./Components/Dashboard";
import AuthPage from "./pages/AuthPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Components/ProtectedRoute";
// import 'dotenv/config'

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            {/* <Route path="/" element={<Login />} /> */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
