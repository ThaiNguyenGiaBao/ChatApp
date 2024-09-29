import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useUserStore } from "./zustand/userStore";

function App() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="p-4 flex items-center justify-center h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={user ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to={"/"} /> : <Signup />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
