import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userMenu } from '../constants'; // Ensure this import is correct

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const menuToBeRendered = userMenu;

  return (
    <div className="h-screen grid grid-cols-12">
      {/* Sidebar */}
      <div className={`transition-all duration-300 bg-gray-800 text-white h-screen overflow-y-auto col-span-2`}>
        <div className="p-4">
          <h1 className="text-xl font-bold">Udimi</h1>
        </div>
        <div className="menu">
          {menuToBeRendered.map((menu, index) => (
            <div key={index} className="px-4 py-3 flex items-center">
              <i className={menu.icon}></i>
              <Link to={menu.path} className="ml-2 text-white hover:text-gray-400">
                {menu.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="content bg-gray-100 h-screen col-span-10 overflow-y-auto">
        {/* Header */}
        <div className="header flex items-center justify-between p-4 bg-white shadow ">
          {collapsed && (
            <i
              className="ri-menu-fill text-xl cursor-pointer"
              onClick={() => setCollapsed(false)}
            ></i>
          )}
          <div className="flex items-center space-x-4 bg-slate-400">
            <Link to="/notifications" className="relative text-gray-700 hover:text-gray-900">
              <i className="ri-notification-3-fill text-xl"></i>
            </Link>
            <p className="username text-gray-700">Username</p>
          </div>
        </div>

        {/* Body */}
        <div className="body p-6 rounded-lg pr-2 bg-slate-400 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
