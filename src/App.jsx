import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegsiterForm";
import PageNotFound from "./pages/PageNotFound";
import PrivateComponents from './components/common/PrivateComponents'
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateComponents />}>
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="create-note" element={<CreateNote/>} />
        </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
