import { Route, Routes, useNavigate ,} from "react-router-dom";
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
import { useCallback, useMemo, useState } from "react";
import axios from "axios";
function App () {
  const navigate = useNavigate()
  const SERVER_URL = "http://localhost"
  // const SERVER_URL = "https://mynotes-server-jznn.onrender.com"

  //state for all user notes
  const [allNotes, setAllNotes] = useState(null);

  let token
  const getAccessToken = useMemo(() => {
    console.log("fetching")
    token = localStorage.getItem("token");
    if (!token) navigate("/login");
    return JSON.parse(token).accessToken;
  }, [token])

  //!Fetch Notes API
  const fetchingNotes =  useCallback(async() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${SERVER_URL}/api/notes/` ,
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
    };
    try {
      const response = await axios.request(config);
      console.log(response.data)
      if (response.data.length === 0) {
        setAllNotes([]);
      } else {
        setAllNotes(response.data);
      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.message === "User is not authorized") {
        navigate("/login");
      }
    }
  },[allNotes])

  return (
    <>
      <Navbar server_url={SERVER_URL} getAccessToken={getAccessToken} />
      <Routes>
        <Route element={<PrivateComponents />}>
          <Route path="/home" element={
            <Home
              getAccessToken={getAccessToken}
              allNotes={allNotes}
              fetchingNotes={fetchingNotes}
              server_url={SERVER_URL}
              setAllNotes={setAllNotes} />
          } />
          <Route path="/profile" element={<Profile server_url={SERVER_URL} />} />
          <Route path="/home/create-note" element={<CreateNote server_url={SERVER_URL} />} />
          <Route path="/home/edit-note/:noteId" element={<EditNote server_url={SERVER_URL} />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm server_url={SERVER_URL} />} />
        <Route path="/register" element={<RegisterForm server_url={SERVER_URL} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;
