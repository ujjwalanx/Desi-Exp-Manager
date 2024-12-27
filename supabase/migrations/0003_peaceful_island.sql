/*
  # Update expenses table schema

  1. Changes
    - Add category column
    - Remove description column
    - Update RLS policies

  2. Security
    - Maintain existing RLS policies
    - Ensure data integrity during migration
*/

-- Add category column if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'expenses' AND column_name = 'category'
  ) THEN
    ALTER TABLE expenses ADD COLUMN category text NOT NULL DEFAULT 'other';
  END IF;
END $$;

-- Remove description column if it exists
DO $$ 
BEGIN 
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'expenses' AND column_name = 'description'
  ) THEN
    ALTER TABLE expenses DROP COLUMN description;
  END IF;
END $$;

-- Ensure RLS policies are up to date
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Recreate policies to ensure they work with the new schema
DROP POLICY IF EXISTS "Users can insert their own expenses" ON expenses;
DROP POLICY IF EXISTS "Users can view their own expenses" ON expenses;
DROP POLICY IF EXISTS "Users can update their own expenses" ON expenses;
DROP POLICY IF EXISTS "Users can delete their own expenses" ON expenses;

CREATE POLICY "Users can insert their own expenses"
  ON expenses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own expenses"
  ON expenses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses"
  ON expenses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses"
  ON expenses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);