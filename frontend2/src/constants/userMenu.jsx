import { FaHome, FaChalkboardTeacher, FaBookOpen, FaSignOutAlt} from "react-icons/fa";
const userMenu =[
    {
        name : "Home",
        path : "/courses",
        icon: <FaHome />
    },
    {
        name : "My-Courses",
        path : "/mycourses",
        icon:<FaBookOpen />
    },
    {
        name : "Applay Classes",
        path : "/applay",
        icon:<FaChalkboardTeacher />
    },
    {
        name : "Logout",
        path : "/",
        icon:<FaSignOutAlt />
    }
]

export default userMenu;