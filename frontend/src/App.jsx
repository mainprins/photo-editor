
import { Outlet,useNavigation } from "react-router-dom";
import Navbar from "./components/Navbar";
import {ClipLoader} from "react-spinners"

function App() {

  const navigation = useNavigation();
  
  return (
    <>
      <Navbar/>
      {navigation.state == "loading" ? <h1>Loading ...</h1> : <Outlet/> }
    </>
  )
}

export default App
