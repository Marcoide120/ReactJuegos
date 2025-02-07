import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 w-full px-6 py-4">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <img
        src="/logo2.png"
        className="h-12 w-12 object-contain animate-pulse"
        alt="Logo"
      />
      <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Juegoteca
      </span>
    </div>

    <div className="flex-grow flex items-center justify-center space-x-12">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `relative px-4 py-2 text-xl font-medium transition-all duration-300 ease-in-out overflow-hidden ${
            isActive ? "text-green-400" : "text-gray-300 hover:text-green-400"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span className="relative z-10">Home</span>
            <span className="absolute inset-0 bg-green-400 opacity-10 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400 animate-pulse" />
            )}
          </>
        )}
      </NavLink>

      <NavLink
        to="/Games"
        className={({ isActive }) =>
          `relative px-4 py-2 text-xl font-medium transition-all duration-300 ease-in-out overflow-hidden ${
            isActive ? "text-green-400" : "text-gray-300 hover:text-green-400"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span className="relative z-10">Biblioteca</span>
            <span className="absolute inset-0 bg-green-400 opacity-10 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400 animate-pulse" />
            )}
          </>
        )}
      </NavLink>
    </div>

    <div className="w-12"></div> {/* Spacer to balance the layout */}
  </div>
</nav>

  );
};

export default Navbar;


