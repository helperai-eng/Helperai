import React, { useState } from 'react';
import { FileUp, X, Check, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
  helperText?: string;
  onChange: (file: File | null) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = '.pptx',
  maxSize = 10, // Default 10MB
  label = 'Upload File',
  helperText,
  onChange,
  error
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const validateFile = (file: File): boolean => {
    if (!file.name.endsWith('.pptx')) {
      setFileError('Only PowerPoint (.pptx) files are allowed');
      return false;
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      setFileError(`File size must be less than ${maxSize}MB`);
      return false;
    }
    
    setFileError(null);
    return true;
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        onChange(droppedFile);
      } else {
        onChange(null);
      }
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onChange(selectedFile);
      } else {
        onChange(null);
      }
    }
  };
  
  const removeFile = () => {
    setFile(null);
    setFileError(null);
    onChange(null);
  };
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${error || fileError ? 'border-red-500 bg-red-50' : ''}
            cursor-pointer transition-colors duration-200
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <FileUp className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-900">
            Drag and drop your file here or click to browse
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Only PowerPoint (.pptx) files up to {maxSize}MB
          </p>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-md">
              <Check className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)}MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeFile}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      
      {(error || fileError) && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{error || fileError}</span>
        </div>
      )}
      
      {helperText && !error && !fileError && (
        <p className="mt-2 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default FileUpload;