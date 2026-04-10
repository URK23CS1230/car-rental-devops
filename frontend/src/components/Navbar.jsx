import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Fleet', path: '/cars' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center transition-all duration-300">
      <Link to="/">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter"
        >
          LUXE<span className="text-primary">RIDE</span>
        </motion.div>
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }} 
        animate={{ opacity: 1, x: 0 }}
        className="space-x-8 text-sm font-medium hidden md:flex items-center"
      >
        {links.map((link) => (
          <Link 
            key={link.name} 
            to={link.path} 
            className={`transition ${location.pathname === link.path ? 'text-primary' : 'hover:text-primary relative group'}`}
          >
            {link.name}
            {location.pathname !== link.path && (
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            )}
          </Link>
        ))}
        
        <Link to="/auth">
          <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2 rounded-full transition">
            Sign In
          </button>
        </Link>
        <Link to="/cars">
          <button className="bg-primary hover:bg-blue-600 shadow-lg shadow-primary/30 px-6 py-2 rounded-full transition transform hover:scale-105 active:scale-95">
            Book Now
          </button>
        </Link>
      </motion.div>
    </nav>
  );
};

export default Navbar;
