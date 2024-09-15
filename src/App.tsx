import { Navigate, Route, Routes } from "react-router-dom";
import "./styles/root/app.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "./store/store"; // Adjust the import path as needed
import Message from "./components/abstracts/Message";

function App() {
  const message = useSelector((state: RootState) => state.app.message);
  const accessToken = useSelector(
    (state: RootState) => state.auth.auth.accessToken
  );

  return (
    <div className="app">
      <AnimatePresence>
        {message.messageType && (
          <Message msgType={message.messageType} msg={message.message} />
        )}
      </AnimatePresence>
      <Routes>
        <Route
          path="/"
          element={accessToken !== "" ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={accessToken === "" ? <Login /> : <Home />}
        />
        <Route
          path="/register"
          element={accessToken === "" ? <Register /> : <Home />}
        />
      </Routes>
    </div>
  );
}

export default App;
