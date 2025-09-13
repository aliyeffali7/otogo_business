// Sidebar.tsx

import ProfileIcon from "../../../assets/icons/profile.svg";
import LogoutIcon from "../../../assets/icons/logout.svg";
import CatalougeIcon from "../../../assets/icons/catalouge.svg";
import InboxIcon from "../../../assets/icons/inbox.svg";
import SettingIcon from "../../../assets/icons/settings.svg";
import ServicesIcon from "../../../assets/icons/services.svg";
import RatingIcon from "../../../assets/icons/rating.svg";
import PaymentIcon from "../../../assets/icons/payment.svg";
import { ROUTER } from "../../../constants/router";
import { useLocation, useNavigate } from "react-router";
// import { logoutRequest, clearAuth } from "../../../services/auth";
// hər yerdə istifadə edilə bilən
import { logout } from "../../../services/auth";

<button onClick={() => logout()}>Logout</button>



interface MenuItem {
  icon: string;
  label: string;
  path?: string;
}
const menuItems = [
  { icon: ProfileIcon, label: "Business Profile", path: ROUTER.PROFILE },
  { icon: CatalougeIcon, label: "Product Catalogue", path: ROUTER.CATALOGUE },
  {
    icon: ServicesIcon,
    label: "Professionals & Services",
    path: ROUTER.SERVICES,
  },
  { icon: RatingIcon, label: "Reviews & Rating", path: ROUTER.RATING },
  { icon: InboxIcon, label: "Inbox", path: ROUTER.INBOX },
  { icon: PaymentIcon, label: "Payments", path: ROUTER.PAYMENTS },
  { icon: SettingIcon, label: "Settings", path: ROUTER.SETTINGS },
  { icon: LogoutIcon, label: "Logout" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

   const handleLogout = async () => {
    try {
      // serverə demək üçün cəhd edirik; alınmasa da local-ı təmizləyəcəyik
      await logout().catch(() => {});
    } finally {
      clearAuth();
      navigate(ROUTER.LOGIN, { replace: true });
      // alternativ: window.location.href = ROUTER.LOGIN;
    }
  };

  const handleClick = (item: MenuItem) => {
    if (item.label === "Logout") {
      void handleLogout();
      return;
    }
    if (item.path) navigate(item.path);
  };

  return (
    <div className="bg-[#14151b] w-58 min-h-screen justify-start" >
      {/* Logo */}
      <div className="flex flex-col leading-[0.9] m-[50px]">
        <span className="text-white text-[29px] font-medium">OTOGO</span>
        <span className="text-white text-[29px] font-medium">BUSINESS</span>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-4 ml-[35px] mb-4">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={idx}
              onClick={() => handleClick(item)}
              className={`group flex items-center gap-[20px] cursor-pointer p-2 rounded transition-colors duration-200
                ${isActive ? "bg-white text-black" : "hover:bg-white"}
              `}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`w-6 h-6 transition-all duration-200 ${
                  isActive ? "invert" : "group-hover:invert"
                }`}
              />
              <span
                className={`text-[16px] transition-colors duration-200 ${
                  isActive ? "text-black" : "text-white group-hover:text-black"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
function clearAuth() {
  throw new Error("Function not implemented.");
}

