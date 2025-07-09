
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ClipLoader } from "react-spinners"
import axios from "axios";
import { useEffect } from "react";

function App() {

  const navigation = useNavigation();

  const isAuthCheck = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/isAuth", { withCredentials: true });
      localStorage.setItem('auth', "true");
    } catch (error) {
      localStorage.setItem('auth', "false");
    }


  }
  useEffect(() => {
    const check = async () => {
      await isAuthCheck();
    };
    check();
  }, []);

  return (
    <>
      <Navbar />
      {navigation.state == "loading" ? <ClipLoader color="#36d7b7" />: <Outlet />}
    </>
  )
}

export default App
