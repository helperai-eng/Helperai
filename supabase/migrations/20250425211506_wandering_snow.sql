/*
  # Create content management tables

  1. New Tables
    - `content`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `title` (text)
      - `file_path` (text)
      - `difficulty_level` (text)
      - `status` (text)
      - `video_url` (text)
      - `quiz_data` (jsonb)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on content table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  file_path text NOT NULL,
  difficulty_level text NOT NULL,
  status text NOT NULL,
  video_url text,
  quiz_data jsonb,
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own content
CREATE POLICY "Users can read own content"
  ON content
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own content
CREATE POLICY "Users can insert own content"
  ON content
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);