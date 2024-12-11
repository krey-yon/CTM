import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { logout } from "../api";
import { toast } from "react-toastify";
const icons = [
  {
    id: 1,
    icon: <IoHomeOutline size={24} />,
    title: "Home",
    onClick: () => console.log("Home"),
  },
  {
    id: 2,
    icon: <FaXTwitter size={24} />,
    title: "Twitter",
    onClick: () => (window.location.href = "https://x.com/Krey_yon"),
  },
  {
    id: 3,
    icon: <FiGithub size={24} />,
    title: "Github",
    onClick: () => (window.location.href = "https://github.com/krey-yon"),
  },
  {
    id: 4,
    icon: <FaRegUser size={24} />,
    title: "Copy User ID",
    onClick: () => toast("Copy User ID"),
  },
  {
    id: 5,
    icon: <MdOutlineDarkMode size={24} />,
    title: "Dark Mode",
    onClick: () => console.log("Dark Mode"),
  },
  {
    id: 6,
    icon: <FiLogOut size={24} />,
    title: "Logout",
    onClick: () => handleLogout(),
  },
];

const handleLogout = async () => {
  try {
    await logout();
  } catch (err) {
    console.error("Logout failed", err);
  }
};

function FloatingDeck() {
  return (
    <div className=" mt-96 ">
      <div className="mb-5">
        <div className="flex space-x-4 p-4 relative border border-black rounded">
          {icons.map(({ id, icon, title, onClick }) => (
            <div key={id} className="relative group" onClick={onClick}>
              {/* Circle */}
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-150 transition-transform duration-200">
                {icon}
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FloatingDeck;