import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, BookOpen, CheckSquare, Pointer as FilePowerpoint, AlertTriangle } from 'lucide-react';
import Card, { CardHeader, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const UploadContent: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [difficultyLevel, setDifficultyLevel] = useState('medium');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { showToast } = useToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) {
      return;
    }

    // Validate file type
    if (!selectedFile.name.toLowerCase().endsWith('.pptx')) {
      showToast('Please upload a PowerPoint (.pptx) file', 'error');
      return;
    }

    // Validate file size (20MB max)
    const maxSize = 20 * 1024 * 1024; // 20MB in bytes
    if (selectedFile.size > maxSize) {
      showToast('File size must be less than 20MB', 'error');
      return;
    }

    setFile(selectedFile);
    showToast('File selected successfully!', 'success');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileSelect(selectedFile);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !currentUser) {
      showToast('Please select a file and ensure you are logged in', 'error');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload file to Supabase Storage
      const fileName = `${currentUser.id}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('presentations')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percentage = (progress.loaded / progress.total) * 100;
            setUploadProgress(Math.round(percentage));
          },
        });

      if (uploadError) {
        throw new Error('Failed to upload file');
      }

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('presentations')
        .getPublicUrl(fileName);

      // Insert content record
      const { data: contentData, error: contentError } = await supabase
        .from('content')
        .insert({
          title: file.name.replace('.pptx', ''),
          file_path: fileName,
          difficulty_level: difficultyLevel,
          status: 'processing',
          user_id: currentUser.id,
        })
        .select()
        .single();

      if (contentError) {
        throw new Error('Failed to create content record');
      }

      // Trigger processing via Edge Function
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-slides`;
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentId: contentData.id,
          fileUrl: publicUrl,
          difficultyLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process file');
      }

      showToast('File uploaded successfully! Processing will begin shortly.', 'success');
      navigate(`/student/content/${contentData.id}`);
    } catch (error) {
      console.error('Upload error:', error);
      showToast('Failed to upload and process file', 'error');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Upload Content</h1>
        <p className="mt-1 text-gray-600">
          Upload your PowerPoint slides to generate learning materials.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Upload PowerPoint</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`
                      border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                      transition-colors duration-200
                      ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
                    `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleUploadClick}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pptx"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    
                    <AnimatePresence mode="wait">
                      {file ? (
                        <motion.div
                          key="file-selected"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex items-center justify-center"
                        >
                          <FilePowerpoint className="h-8 w-8 text-blue-500" />
                          <div className="ml-3 text-left">
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="upload-prompt"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm font-medium text-gray-900">
                            Drag and drop your PowerPoint file here or click to browse
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Only PowerPoint (.pptx) files up to 20MB
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
                
                <Select
                  label="Quiz Difficulty Level"
                  options={[
                    { value: 'easy', label: 'Easy' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'hard', label: 'Hard' }
                  ]}
                  value={difficultyLevel}
                  onChange={setDifficultyLevel}
                />
                
                {isUploading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </motion.div>
                )}
                
                <div className="mt-6">
                  <Button
                    type="submit"
                    isLoading={isUploading}
                    disabled={!file || isUploading}
                    leftIcon={<Upload className="h-4 w-4" />}
                    fullWidth
                  >
                    {isUploading ? 'Processing...' : 'Upload and Process'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-gray-50 border border-gray-200">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">What Happens Next?</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex"
                >
                  <div className="flex-shrink-0">
                    <FilePowerpoint className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">PowerPoint Upload</h3>
                    <p className="text-sm text-gray-500">
                      Your slides are securely uploaded to our platform.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex"
                >
                  <div className="flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">AI Video Creation</h3>
                    <p className="text-sm text-gray-500">
                      Our AI extracts key concepts and converts them into an engaging educational video.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex"
                >
                  <div className="flex-shrink-0">
                    <CheckSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Quiz Generation</h3>
                    <p className="text-sm text-gray-500">
                      A personalized quiz at your selected difficulty level is generated.
                    </p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
            <CardFooter className="bg-yellow-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    For demonstration purposes, file processing is simulated. In a real application, content would be analyzed by AI.
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadContent;