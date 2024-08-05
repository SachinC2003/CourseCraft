import { FaHome, FaChalkboardTeacher, FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';

const adminMenu = [
    {
        name: "Home",
        path: "/courses",
        icon: <FaHome />
    },
    {
        name: "Teachers",
        path: "/teachers",
        icon: <FaChalkboardTeacher />
    },
    {
        name: "Approve-Teachers",
        path: "/applications",
        icon: <FaCheckCircle />
    },
    {
        name: "Logout",
        path: "/",
        icon: <FaSignOutAlt />
    }
];

export default adminMenu;
