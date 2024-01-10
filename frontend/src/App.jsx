import { Route, Routes } from "react-router-dom";
// import './App.css'
// import { PrivateRoutes, PublicRoutes } from "./routes";
import PrivateRoutes from "./layouts/PrivateRoute";
import PublicRoutes from "./layouts/PublicRoute";
import AdminRoutes from "./layouts/AdminRoute";
import { adminRoutes, privateRoutes, publicRoutes } from "./routes";


const App = () => {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PublicRoutes>{route.element}</PublicRoutes>}
        />
      ))}
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PrivateRoutes>{route.element}</PrivateRoutes>}
        />
      ))}
      {adminRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<AdminRoutes>{route.element}</AdminRoutes>}
        />
      ))}
      <Route path="*" element={<h1>404 NOT FOUND</h1>} />
    </Routes>
  );
};

export default App;
































// import "./App.css";

// import Abibahit from "./pages/Sifarish Type/Abibahit";
// import Janmadarta from "./pages/Sifarish Type/Janmadarta";
// import Namsari from "./pages/Sifarish Type/Namsari";
// import NamsariTemplate from "./pages/Sifarish Template/NamsariTemplate";
// import TemplateAbibahitPranamit from "./pages/Sifarish Template/TemplateAbibahitPranamit";
// import TemplateJanmaDarta from "./pages/Sifarish Template/TemplateJanmaDarta";

// import { BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
// import Navbar from "./components/Navbar";
// import About from "./pages/About/About";
// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import Signup from "./pages/Signup/Signup";
// import Dashboard from "./pages/User Part/Dashboard";
// import AdminDashboard from "./pages/Admin Part/AdminDashboard";

// import Sidebar from "./pages/User Part/Sidebar";
// import AdminStatus from "./pages/Admin Part/AdminStatus";
// import Status from "./pages/User Part/Status";

// import Room from "./pages/room/Room";
// import ReceiveCall from "./pages/User Part/ReceiveCall/ReceiveCall";

// import Otp from "./pages/Otp/Otp";
// import ForgotPassword from "./pages/Forgot Password/ForgotPassword";
// import ChangePassword from "./pages/Change Password/ChangePassword";
// import UserProfile from "./pages/User Part/UserProfile/UserProfile"
// import ViewDetail from "./pages/User Part/ViewDetail/ViewDetail";
// // Nishant
// function App() {
//   return (

//   <>
  

//     <Routes>
//     <Route path="/" element={<Home/>}/>
//     <Route path="/login" element={<Login/>}/>
//     <Route path="/signup" element={<Signup/>}/>
//     <Route path="/about" element={<About/>}/>
//     <Route path="/:bid/user-home" element={<Dashboard/>}/>
//     <Route path="/user-status" element={<Status/>}/>
//     <Route path="/admin" element={<AdminDashboard/>}/>
//     <Route path="/admin-status" element={<AdminStatus/>}/>
//     <Route path="/abibahitSifarish" element={<Abibahit/>}/>
//     <Route path="/janmaDartaSifarish" element={<Janmadarta/>}/>
//     <Route path="/namsariSifarish" element={<Namsari/>}/>
//     <Route path="/sifarishdemo/:bid" element={<TemplateJanmaDarta/>}/>
//     <Route path="/user-profile" element={<UserProfile/>}/>

//     <Route path="/room/:roomId" element={<Room/>}/>
//     <Route path="/receive-call" element={<ReceiveCall/>}/>

//     <Route path = "/:userId/otp-confirmation" element = {<Otp/>}    />
//     <Route path = "/forgot-password" element = {<ForgotPassword/>} />
//     <Route path = "/change-password" element = {<ChangePassword/>}/>
//     <Route path = "/:bid/detail-Page" element = {<ViewDetail/>}/>

//     </Routes>
//   </>

// )
// };

// export default App;






