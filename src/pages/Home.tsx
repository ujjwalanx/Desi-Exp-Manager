import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';

const Home = () => {
  const [income, setIncome] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (income) {
      navigate('/expense', { state: { income: parseFloat(income) } });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.h1
          className="text-5xl font-bold text-white mb-6"
          whileHover={{ scale: 1.05 }}
        >
          Track Your Expenses in Desi Style
        </motion.h1>
        <motion.p
          className="text-xl text-white mb-12"
          whileHover={{ scale: 1.05 }}
        >
          Smart way to track expenses with Desi Option's For You
        </motion.p>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="number"
              step="0.01"
              min="0"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your income"
              className="pl-12 pr-4 py-3 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-purple-50 transition-colors"
            type="submit"
          >
            Start Tracking
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Home;