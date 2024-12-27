import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IndianRupee } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <IndianRupee className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">Desi Expense</span>
        </Link>
        <div className="flex space-x-6">
          {['Home', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="relative"
            >
              <motion.span
                className="text-white text-lg font-medium hover:text-purple-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.span>
              {location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                  layoutId="underline"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;