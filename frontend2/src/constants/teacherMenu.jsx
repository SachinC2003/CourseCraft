import { FaHome, FaBookOpen, FaUpload, FaSignOutAlt } from 'react-icons/fa';

const teacherMenu = [
    {
        name: "Home",
        path: "/courses",
        icon: <FaHome />
    },
    {
        name: "Aploded-Courses",
        path: "/mycourses",
        icon: <FaBookOpen />
    },
    {
        name: "Aplode-course",
        path: "/aplodecourse",
        icon: <FaUpload />
    },
    {
        name: "Logout",
        path: "/",
        icon: <FaSignOutAlt />
    }
];

export default teacherMenu;
