import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';
import Button from '../ui/Button';

interface QuestionInputProps {
  onAsk: (question: string) => Promise<void>;
  isLoading?: boolean;
  isRecording?: boolean;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  onAsk,
  isLoading = false,
  isRecording = false,
  onStartRecording,
  onStopRecording
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
    
    await onAsk(question);
    setQuestion('');
  };

  const handleRecordingClick = () => {
    if (isRecording) {
      onStopRecording?.();
    } else {
      onStartRecording?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4"
    >
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-grow">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about this lesson..."
            className="w-full min-h-[80px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isRecording}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            disabled={(!question.trim() && !isRecording) || isLoading}
            className="px-4 py-2"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
          <Button
            type="button"
            variant={isRecording ? 'danger' : 'outline'}
            onClick={handleRecordingClick}
            className="px-4 py-2"
          >
            {isRecording ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
        </div>
      </form>
      
      {isRecording && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 flex items-center justify-center text-sm text-red-600"
        >
          <span className="animate-pulse mr-2">●</span>
          Recording... Click the microphone icon to stop
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuestionInput;