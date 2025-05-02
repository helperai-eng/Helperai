import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Play, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../../contexts/ToastContext';

const LiveDemo: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();

  const handleUpload = () => {
    setIsProcessing(true);
    showToast('Processing demo content...', 'info');
    
    setTimeout(() => {
      setStep(2);
      setIsProcessing(false);
      showToast('Content processed successfully!', 'success');
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h2 className="text-2xl font-bold">Try Helper.AI Now</h2>
        <p className="mt-2 text-blue-100">
          See how quickly you can create engaging learning materials
        </p>
      </div>

      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                <Upload className="h-4 w-4" />
              </div>
              <span className="ml-2">Upload</span>
            </div>
            <div className={`w-16 h-0.5 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
              <span className="ml-2">Process</span>
            </div>
            <div className={`w-16 h-0.5 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                <Play className="h-4 w-4" />
              </div>
              <span className="ml-2">Preview</span>
            </div>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handleUpload}
                isLoading={isProcessing}
                leftIcon={<Upload className="h-5 w-5" />}
              >
                Upload Demo Content
              </Button>
              <p className="mt-4 text-sm text-gray-500">
                No sign-up required for this demo
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-green-50 rounded-lg p-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-green-700">Content processed successfully!</span>
              </div>
              
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <Play className="h-12 w-12 text-gray-400" />
              </div>

              <div className="text-center mt-6">
                <Button
                  variant="primary"
                  onClick={() => setStep(3)}
                  leftIcon={<Play className="h-5 w-5" />}
                >
                  Preview Results
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium text-gray-900">Generated Video</h3>
                <div className="aspect-video bg-gray-100 rounded mt-2 flex items-center justify-center">
                  <Play className="h-12 w-12 text-gray-400" />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium text-gray-900">Generated Quiz</h3>
                <div className="mt-2 space-y-2">
                  {[1, 2, 3].map((q) => (
                    <div key={q} className="p-3 bg-gray-50 rounded">
                      <p className="text-gray-700">Sample Question {q}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Ready to create your own learning materials?
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.location.href = '/register'}
                >
                  Get Started Now
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;