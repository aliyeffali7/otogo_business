// // App.tsx
// import { Route, Routes } from "react-router-dom";
// import { ROUTER } from "./constants/router";
// import Login from "./pages/login";
// import Profile from "./pages/profile";
// import AppLayout from "./layout";
// import Catalogue from "./pages/catalogue";
// import Services from "./pages/servicesPages";
// import Ratings from "./pages/ratings";
// import Payments from "./pages/payments";
// import Inbox from "./pages/inbox";
// import RequireAuth from "./routes/RequireAuth";

// function App() {
//   return (
//     <Routes>
//       <Route path={ROUTER.LOGIN} element={<Login />} />
//       <Route element={<AppLayout />}>
//         <Route path={ROUTER.PROFILE} element={<Profile />} />
//         <Route path={ROUTER.CATALOGUE} element={<RequireAuth><Catalogue /></RequireAuth>} />
//         <Route path={ROUTER.SERVICES} element={<RequireAuth><Services /></RequireAuth>} />
//         <Route path={ROUTER.RATING} element={<RequireAuth><Ratings /></RequireAuth>} />
//         <Route path={ROUTER.PAYMENTS} element={<RequireAuth><Payments /></RequireAuth>} />
//         <Route path={ROUTER.INBOX} element={<RequireAuth><Inbox /></RequireAuth>} />
//         <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;
// App.tsx
// src/App.tsx
import { Route, Routes } from "react-router-dom";
import { ROUTER } from "./constants/router";
import Login from "./pages/login";
import Profile from "./pages/profile";
import AppLayout from "./layout";
import Catalogue from "./pages/catalogue";
import Services from "./pages/servicesPages";
import Ratings from "./pages/ratings";
import Payments from "./pages/payments";
import Inbox from "./pages/inbox";
import Settings from "./pages/settings";
import RequireAuth from "./routes/RequireAuth";
import './index.css';
function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path={ROUTER.LOGIN} element={<Login />} />

      {/* Protected parent */}
      <Route element={<RequireAuth><AppLayout /></RequireAuth>}>
        <Route path="profile" element={<Profile />} />
        <Route path="catalogue" element={<Catalogue />} />
        <Route path="services" element={<Services />} />
        <Route path="rating" element={<Ratings />} />
        <Route path="payment" element={<Payments />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
