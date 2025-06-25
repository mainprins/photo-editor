
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import ListsPage from "./pages/ListsPage";

function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/lists" element={<ListsPage/>}/>
      </Routes>
    </>
  )
}

export default App
