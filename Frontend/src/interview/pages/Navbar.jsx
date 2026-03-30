import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

    const handleLogout = () => {
      
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        navigate('/login');
        window.location.reload();
    };

  return (
    <nav className="sticky top-0 z-[100] bg-slate-900 text-white px-4 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tighter">Analytica</div>

        {/* Hamburger Menu (Mobile Only) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`
          absolute lg:static top-16 left-0 w-full lg:w-auto 
          bg-slate-900 lg:bg-transparent p-4 lg:p-0
          flex flex-col lg:flex-row items-center gap-4
          transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:opacity-100 lg:visible'}
        `}>
          <a href="#home" className="w-full lg:w-auto text-center py-2 hover:text-indigo-400">Home</a>
          <a href="#report" className="w-full lg:w-auto text-center py-2 px-6 bg-slate-800 rounded-lg hover:bg-slate-700">Report</a>
          <button onClick={handleLogout} className="w-full cursor-pointer lg:w-auto py-2 px-6 bg-red-600 rounded-lg font-bold">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;