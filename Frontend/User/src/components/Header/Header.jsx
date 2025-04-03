import React, { useState } from 'react';
import { Logo, LogoutButton,CurruncySelect } from '../index.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FiMenu } from 'react-icons/fi';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: authStatus },
    { name: 'Categories', slug: '/catagories', active: authStatus },
    { name: 'Products', slug: '/products', active: authStatus },
    { name: 'Orders', slug: '/orders', active: authStatus },
    { name: 'User', slug: '/user', active: authStatus },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus }
  ];

  return (
    <header className="bg-sky-400 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
            <Logo />
        </div>
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            item.active && (
              <div key={item.name} className="relative group">
                <button className="text-black font-semibold hover:text-gray-700 flex items-center" onClick={()=>navigate(item.slug)}>
                  {item.name} {item.dropdown && <span className="ml-1">▼</span>}
                </button>
                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md hidden group-hover:block">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 1</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 2</a>
                  </div>
                )}
              </div>
            )
          ))}
          <CurruncySelect />
          {/* Logout Button */}
          {authStatus && <LogoutButton /> }
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          <FiMenu />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-sky-500 p-4">
          {navItems.map((item) => (
            item.active && (
              <div key={item.name} className="py-2">
                <button className="w-full text-left font-semibold" onClick={() => navigate(item.slug)}>{item.name}</button>
              </div>
            )
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
