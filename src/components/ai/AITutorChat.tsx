import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Mic, MicOff } from 'lucide-react';
import QuestionInput from './QuestionInput';
import AnswerDisplay from './AnswerDisplay';
import Button from '../ui/Button';
import { useToast } from '../../contexts/ToastContext';

interface ChatMessage {
  question: string;
  answer: string;
  relatedResources?: Array<{ title: string; url: string }>;
  language?: string;
}

const AITutorChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { showToast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        await handleSpeechToText(audioBlob);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      showToast('Recording started', 'info');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      showToast('Failed to access microphone', 'error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      showToast('Recording stopped', 'info');
    }
  };

  const handleSpeechToText = async (audioBlob: Blob) => {
    // In a real app, send the audio to a speech-to-text service
    // For demo, we'll simulate the conversion
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockTranscription = "What is the difference between supervised and unsupervised learning?";
      await handleAskQuestion(mockTranscription);
    } catch (error) {
      showToast('Failed to convert speech to text', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskQuestion = async (question: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to your AI service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAnswer = {
        answer: "Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data. For example, in supervised learning, you might train a model to classify emails as spam or not spam using pre-labeled examples. In unsupervised learning, you might group similar customers together based on their behavior without predefined categories.",
        relatedResources: [
          {
            title: "Introduction to Machine Learning",
            url: "https://example.com/ml-intro"
          }
        ],
        language: selectedLanguage
      };
      
      setMessages(prev => [...prev, {
        question,
        answer: mockAnswer.answer,
        relatedResources: mockAnswer.relatedResources,
        language: mockAnswer.language
      }]);
      
      showToast('Answer generated successfully', 'success');
    } catch (error) {
      console.error('Failed to get answer:', error);
      showToast('Failed to generate answer', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (messageIndex: number, helpful: boolean) => {
    // In a real app, this would send feedback to your backend
    showToast(helpful ? 'Thank you for your feedback!' : 'Thanks for letting us know', 'success');
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    showToast(`Language changed to ${language}`, 'info');
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 shadow-lg"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageSquare className="h-6 w-6" />
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden z-50"
          >
            <div className="p-4 bg-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">AI Tutor</h2>
                  <p className="text-sm text-blue-100">Ask any question about your lessons</p>
                </div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-blue-500 text-white border border-blue-400 rounded px-2 py-1 text-sm"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </div>
            
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <AnswerDisplay
                  key={index}
                  question={message.question}
                  answer={message.answer}
                  relatedResources={message.relatedResources}
                  onFeedback={(helpful) => handleFeedback(index, helpful)}
                />
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <QuestionInput
                onAsk={handleAskQuestion}
                isLoading={isLoading}
                isRecording={isRecording}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AITutorChat;