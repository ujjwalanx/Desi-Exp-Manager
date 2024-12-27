import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, PiggyBank, TrendingUp } from 'lucide-react';

const About = () => {
  const cards = [
    {
      icon: <IndianRupee className="w-12 h-12" />,
      title: "Track Expenses",
      description: "Keep track of every rupee you spend with our intuitive interface"
    },
    {
      icon: <PiggyBank className="w-12 h-12" />,
      title: "Save Money",
      description: "Understand your spending patterns and save more effectively"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Grow Wealth",
      description: "Make informed decisions about your finances and grow your wealth"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          We track expense but in desi style
        </h1>
        <p className="text-xl text-white">
          Managing money shouldn't be boring. We make it fun and effective! Ujjwal Anand ;-]
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg p-6 shadow-lg"
          >
            <div className="text-purple-600 mb-4">{card.icon}</div>
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;