export type ExpenseCategory = {
  id: string;
  name: string;
  icon: string;
};

export type Expense = {
  id: string;
  category: string;
  amount: number;
  month: number;
  year: number;
  user_id: string;
  created_at: string;
};