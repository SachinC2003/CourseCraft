/*import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userMenu, teacherMenu, adminMenu } from '../constants/index';
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/userAtom";
import { CgMenuLeftAlt, CgMenuRightAlt} from "react-icons/cg";
import { FaBell } from "react-icons/fa";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const menuToBeRendered = user.role === 'admin' ? adminMenu
                         : user.role === 'teacher' ? teacherMenu
                         : userMenu;

  const handleLogout = (e) => {
    e.preventDefault();
      localStorage.removeItem("token");
      navigate('/')
      console.log('User logged out');
  };

  const notificationCount = 5;

  return (
    <div className="h-screen flex">
      {/* Sidebar }
      <div className={`transition-all duration-300 bg-indigo-800 text-white h-screen ${collapsed ? 'w-0' : 'w-64'} md:w-64`}>
        <div className="p-4 border-b border-indigo-700 flex items-center">
          {!collapsed && <h1 className="text-2xl font-bold">Udimi</h1>}
        </div>
        {!collapsed && (
          <div className="menu mt-8">
            {menuToBeRendered.map((menu, index) => (
              <Link 
                key={index} 
                to={menu.path} 
                className="block px-4 py-3 mb-4 hover:bg-indigo-700 transition duration-150 ease-in-out"
                onClick={menu.name === 'Logout' ? handleLogout : undefined}
              >
                <div className="flex items-center">
                  <div className="text-2xl">{menu.icon}</div>
                  <span className="ml-4 text-lg font-bold">{menu.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Main Content }
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header }
        <div className="header flex items-center justify-between p-4 bg-white shadow-md">
          <button
            className="text-2xl cursor-pointer text-indigo-800 hover:text-indigo-600 transition-colors duration-150 md:hidden"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <CgMenuRightAlt /> : <CgMenuLeftAlt />}
          </button>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaBell className="text-2xl cursor-pointer text-indigo-800 hover:text-indigo-600 transition-colors duration-150" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {notificationCount}
                </span>
              )}
            </div>
            <p className="username text-indigo-800 font-medium text-lg">{user.role || 'Username'}</p>
          </div>
        </div>

        {/* Body }
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;*/
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userMenu, teacherMenu, adminMenu } from '../constants/index';
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/userAtom";
import { CgMenuLeftAlt, CgMenuRightAlt } from "react-icons/cg";
import { FaBell, FaUser } from "react-icons/fa";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const menuToBeRendered = user.role === 'admin' ? adminMenu
                         : user.role === 'teacher' ? teacherMenu
                         : userMenu;

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate('/');
    console.log('User logged out');
  };

  const notificationCount = 5; // Replace with actual notification count from your state

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className={`transition-all duration-300 bg-indigo-800 text-white h-screen ${collapsed ? 'w-0' : 'w-64'} md:w-64`}>
        <div className="p-4 border-b border-indigo-700 flex items-center">
          {!collapsed && <h1 className="text-2xl font-bold">CourseCraft</h1>}
        </div>
        {!collapsed && (
          <div className="menu mt-8">
            {menuToBeRendered.map((menu, index) => (
              <Link 
                key={index} 
                to={menu.path} 
                className="block px-4 py-3 mb-4 hover:bg-indigo-700 transition duration-150 ease-in-out"
                onClick={()=>{menu.name === 'Logout' ? handleLogout : undefined
                     setCollapsed(true)
                }}
              >
                <div className="flex items-center">
                  <div className="text-2xl">{menu.icon}</div>
                  <span className="ml-4 text-lg font-bold">{menu.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-md border-b border-gray-200 w-full">
          <button
            className="text-2xl cursor-pointer text-indigo-800 hover:text-indigo-600 transition-colors duration-150 md:hidden"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <CgMenuRightAlt /> : <CgMenuLeftAlt />}
          </button>
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Notification Icon */}
            <div className="relative flex items-center order-last md:order-first">
              <FaBell className="text-2xl cursor-pointer text-indigo-800 hover:text-indigo-600 transition-colors duration-150" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {notificationCount}
                </span>
              )}
            </div>
            {/* User Icon and Name */}
            <div className="flex items-center">
              <div className="w-7 h-7 bg-indigo-200 text-indigo-800 rounded-full flex items-center justify-center mr-2">
                <FaUser className="text-sm" />
              </div>
              <p className="username text-indigo-800 font-medium text-lg">
                {user.role || 'Username'}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="h-screen flex flex-col">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
            {children}
          </div>

          {/* Footer */}
          <footer className="bg-amber-400 text-black text-center p-4">
            © {new Date().getFullYear()} CourseCraft. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
