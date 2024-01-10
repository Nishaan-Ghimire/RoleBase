import "./App.css";

import Abibahit from "./components/Abibahit";
import Janmadarta from "./components/Janmadarta";
import Namsari from "./components/Namsari";
import Template from "./components/NamsariTemplate";
import TemplateAbibahitPranamit from "./components/TemplateAbibahitPranamit";
import TemplateJanmaDarta from "./components/TemplateJanmaDarta";

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/User Dashboard/Dashboard";
import AdminDashboard from "./pages/Admin Dashboard/AdminDashboard";

import Sidebar from "./pages/User Dashboard/Sidebar";
import AdminStatus from "./pages/Admin Dashboard/AdminStatus";
import Status from "./pages/User Dashboard/Status";
// Nishant
function App() {
  return (

  <>
  <Router>

    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/user-home" element={<Dashboard/>}/>
    <Route path="/user-status" element={<Status/>}/>
    <Route path="/admin" element={<AdminDashboard/>}/>
    <Route path="/admin-status" element={<AdminStatus/>}/>
    <Route path="/abibahitSifarish" element={<Abibahit/>}/>
    <Route path="/janmaDartaSifarish" element={<Janmadarta/>}/>
    <Route path="/namsariSifarish" element={<Namsari/>}/>
    <Route path="/sifarishdemo" element={<TemplateJanmaDarta/>}/>
    </Routes>
  </Router>
  </>

)
};

export default App;






