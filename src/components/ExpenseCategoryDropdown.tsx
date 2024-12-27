import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { expenseCategories } from '../data/expenseCategories';
import { ExpenseCategory } from '../types/expense';

interface ExpenseCategoryDropdownProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const ExpenseCategoryDropdown: React.FC<ExpenseCategoryDropdownProps> = ({
  selectedCategory,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selected = expenseCategories.find(cat => cat.id === selectedCategory) || expenseCategories[0];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border rounded bg-white flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          <span>{selected.icon}</span>
          <span>{selected.name}</span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {expenseCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => {
                  onSelect(category.id);
                  setIsOpen(false);
                }}
                className="w-full p-2 flex items-center gap-2 text-left hover:bg-gray-50"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseCategoryDropdown;