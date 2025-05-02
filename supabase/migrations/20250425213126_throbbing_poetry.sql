/*
  # Create storage bucket for presentations

  1. New Storage Bucket
    - Create a new storage bucket called "presentations" for storing PowerPoint files
  
  2. Security
    - Enable RLS on the bucket
    - Add policy for authenticated users to upload their own files
    - Add policy for authenticated users to read their own files
*/

-- Create a new storage bucket for presentations
INSERT INTO storage.buckets (id, name)
VALUES ('presentations', 'presentations')
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to upload files
CREATE POLICY "Users can upload presentations"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'presentations' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to read their own files
CREATE POLICY "Users can read own presentations"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'presentations' AND
  auth.uid()::text = (storage.foldername(name))[1]
);