
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2 } from 'lucide-react';
import ExpenseCategoryDropdown from '../components/ExpenseCategoryDropdown';
import { expenseCategories } from '../data/expenseCategories';
import type { Expense } from '../types/expense';

const ExpensePage = () => {
  const location = useLocation();
  const income = location.state?.income;
  const { user } = useAuth();
  
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState(expenseCategories[0].id);
  const [amount, setAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [selectedMonth, selectedYear, user]);

  //

  //
  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', user.id)
      .eq('month', selectedMonth)
      .eq('year', selectedYear);

    if (error) {
      console.error('Error fetching expenses:', error);
    } else {
      setExpenses(data || []);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newExpense = {
      category,
      amount: parseFloat(amount),
      month: selectedMonth,
      year: selectedYear,
      user_id: user.id,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('expenses')
      .insert([newExpense]);

    if (error) {
      console.error('Error adding expense:', error);
    } else {
      setCategory(expenseCategories[0].id);
      setAmount('');
      fetchExpenses();
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to delete all expenses for this month? This action cannot be undone.')) {
      const { error } = await supabase
        .rpc('delete_expenses_by_month_year', {
          month_param: selectedMonth,
          year_param: selectedYear
        });

      if (error) {
        console.error('Error resetting expenses:', error);
      } else {
        fetchExpenses();
      }
    }
  };

  if (!income) {
    return <Navigate to="/" replace />;
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBalance = income - totalExpenses;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 shadow-lg mb-8"
        >
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <h3 className="text-gray-600">Income</h3>
              <p className="text-2xl font-bold text-green-600">₹{income}</p>
            </div>
            <div className="text-center">
              <h3 className="text-gray-600">Expenses</h3>
              <p className="text-2xl font-bold text-red-600">₹{totalExpenses}</p>
            </div>
            <div className="text-center">
              <h3 className="text-gray-600">Balance</h3>
              <p className="text-2xl font-bold text-blue-600">₹{remainingBalance}</p>
            </div>
          </div>

          <form onSubmit={handleAddExpense} className="flex gap-4 mb-6">
            <div className="flex-1">
              <ExpenseCategoryDropdown
                selectedCategory={category}
                onSelect={setCategory}
              />
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-32 p-2 border rounded"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2"
              type="submit"
            >
              <Plus className="w-4 h-4" />
              Add
            </motion.button>
          </form>

          <div className="flex gap-4 mb-6 items-center">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="p-2 border rounded"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2000, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="p-2 border rounded"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 ml-auto"
            >
              <Trash2 className="w-4 h-4" />
              Reset Month
            </motion.button>
          </div>

          <div className="space-y-4">
            {expenses.map((expense) => {
              const expenseCategory = expenseCategories.find(cat => cat.id === expense.category);
              return (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded"
                >
                  <span className="flex items-center gap-2">
                    <span>{expenseCategory?.icon}</span>
                    <span>{expenseCategory?.name}</span>
                  </span>
                  <span className="font-semibold">₹{expense.amount}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExpensePage;