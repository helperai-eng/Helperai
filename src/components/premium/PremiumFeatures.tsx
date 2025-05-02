import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Download, MessageSquare, Brain, Zap, Shield } from 'lucide-react';
import Button from '../ui/Button';
import { usePremium } from '../../contexts/PremiumContext';

const PremiumFeatures: React.FC = () => {
  const { isPremium, upgradeToPremium } = usePremium();

  const features = [
    {
      icon: Download,
      title: 'Offline Access',
      description: 'Download quizzes and videos for offline study'
    },
    {
      icon: MessageSquare,
      title: 'Advanced AI Tutoring',
      description: 'Get detailed explanations and step-by-step guidance'
    },
    {
      icon: Brain,
      title: 'Adaptive Learning',
      description: 'Personalized learning paths based on your performance'
    },
    {
      icon: Zap,
      title: 'Priority Processing',
      description: 'Faster content generation and quiz creation'
    },
    {
      icon: Shield,
      title: 'Plagiarism Checker',
      description: 'Verify the originality of assignments and essays'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center">
          <Crown className="h-8 w-8 text-yellow-400" />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">Premium Features</h2>
            <p className="mt-1 text-blue-100">
              Unlock advanced learning tools and features
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                isPremium ? 'border-green-200 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${
                  isPremium ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!isPremium && (
          <div className="mt-8 text-center">
            <p className="text-2xl font-bold text-gray-900">£4.99/month</p>
            <p className="mt-2 text-gray-600">Cancel anytime</p>
            <Button
              variant="primary"
              size="lg"
              className="mt-4"
              onClick={upgradeToPremium}
              leftIcon={<Crown className="h-5 w-5" />}
            >
              Upgrade to Premium
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumFeatures;