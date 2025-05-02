import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';

interface AnswerDisplayProps {
  question: string;
  answer: string;
  relatedResources?: Array<{ title: string; url: string }>;
  onFeedback: (helpful: boolean) => void;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({
  question,
  answer,
  relatedResources,
  onFeedback,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <User className="h-6 w-6 text-gray-600" />
          </div>
          <p className="text-gray-800">{question}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Bot className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-grow">
            <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
            
            {relatedResources && relatedResources.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Related Resources:</h4>
                <ul className="space-y-2">
                  {relatedResources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600 mr-2">Was this helpful?</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFeedback(true)}
                className="text-green-600 hover:bg-green-50"
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFeedback(false)}
                className="text-red-600 hover:bg-red-50"
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnswerDisplay;