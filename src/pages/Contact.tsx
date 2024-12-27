import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-8">Let's Connect!</h1>
        
        <motion.a
          href="https://www.linkedin.com/in/ujjwal-anand-912a89181/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-purple-50 transition-colors"
        >
          <Linkedin className="w-6 h-6" />
          <span>Connect on LinkedIn</span>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Contact;