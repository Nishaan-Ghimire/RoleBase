import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Otp from "./pages/Otp/Otp";
import Signup from "./pages/Signup/Signup";

import AdminDashboard from "./pages/Admin Part/AdminDashboard";
import AdminStatus from "./pages/Admin Part/AdminStatus";
import Abibahit from "./pages/Sifarish Type/Abibahit";
import Janmadarta from "./pages/Sifarish Type/Janmadarta";
import Namsari from "./pages/Sifarish Type/Namsari";
import Dashboard from "./pages/User Part/Dashboard";
import Status from "./pages/User Part/Status";
import UserProfile from "./pages/User Part/UserProfile/UserProfile";
import ViewDetail from "./pages/User Part/ViewDetail/ViewDetail";
import TemplateJanmaDarta from "./pages/Sifarish Template/TemplateJanmaDarta";

import Room from "./pages/room/Room";
import ReceiveCall from "./pages/User Part/ReceiveCall/ReceiveCall";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/about", element: <About /> },
  { path: "/:userId/otp-confirmation", element: <Otp /> }, // /:userId/otp-confirmation
  { path: "/sifarishdemo/:bid", element: <TemplateJanmaDarta /> }, // /:userId/otp-confirmation
];

export const adminRoutes = [
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/admin-status", element: <AdminStatus /> },
];

export const privateRoutes = [
  { path: "/user-status", element: <Status /> },
  { path: "/user-home", element: <Dashboard /> },
  { path: "/user-profile", element: <UserProfile /> },
  { path: "/:bid/detail-Page", element: <ViewDetail /> },
  { path: "/abibahitSifarish", element: <Abibahit /> },
  { path: "/janmaDartaSifarish", element: <Janmadarta /> },
  { path: "/namsariSifarish", element: <Namsari /> },
  { path: "/room/:roomId", element: <Room /> },
  { path: "/receive-call", element: <ReceiveCall /> },
];