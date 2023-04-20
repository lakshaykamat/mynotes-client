import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from './pages/Register/RegisterForm';
import PageNotFound from "./pages/PageNotFound";
import PrivateComponents from './components/common/PrivateComponents'
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import CreateNote from "./pages/Home/CreateNote";
import EditNote from "./pages/Home/EditNote";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import LandingPage from "./pages/Home/LandingPage";

function App() {
  const SERVER_URL = "https://mynotes-server-jznn.onrender.com"
  return (
    <>
    <Navbar/>
      <Routes>
        <Route element={<PrivateComponents />}>
          <Route path="/home" element={<Home server_url={SERVER_URL}/>} />
          <Route path="/profile" element={<Profile  server_url={SERVER_URL}/>} />
          <Route path="/home/create-note" element={<CreateNote  server_url={SERVER_URL}/>} />
          <Route path="/home/edit-note/:noteId" element={<EditNote  server_url={SERVER_URL}/>} />
        </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/contact" element={<ContactPage/>} />
      </Routes>
    </>
  );
}

export default App;
