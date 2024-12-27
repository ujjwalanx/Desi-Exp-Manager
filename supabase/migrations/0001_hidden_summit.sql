/*
  # Create expenses table

  1. New Tables
    - `expenses`
      - `id` (uuid, primary key)
      - `description` (text)
      - `amount` (decimal)
      - `month` (integer)
      - `year` (integer)
      - `created_at` (timestamp with time zone)
      
  2. Security
    - Enable RLS on `expenses` table
    - Add policies for authenticated users to manage their expenses
*/

CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text NOT NULL,
  amount decimal NOT NULL CHECK (amount >= 0),
  month integer NOT NULL CHECK (month >= 1 AND month <= 12),
  year integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own expenses"
  ON expenses
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);