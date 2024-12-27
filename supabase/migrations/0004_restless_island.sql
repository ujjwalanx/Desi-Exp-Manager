/*
  # Add function to delete expenses by month and year

  1. New Functions
    - delete_expenses_by_month_year: Deletes all expenses for a specific month/year for the authenticated user
  
  2. Security
    - Function can only be executed by authenticated users
    - Users can only delete their own expenses
*/

CREATE OR REPLACE FUNCTION delete_expenses_by_month_year(month_param integer, year_param integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM expenses 
  WHERE month = month_param 
  AND year = year_param 
  AND user_id = auth.uid();
END;
$$;