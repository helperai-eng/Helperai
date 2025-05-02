import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Target, BookOpen } from 'lucide-react';

interface AchievementBadgeProps {
  type: 'quiz-master' | 'fast-learner' | 'consistent' | 'helper' | 'expert';
  level: 1 | 2 | 3;
  unlocked: boolean;
  progress?: number;
}

const badges = {
  'quiz-master': {
    icon: Trophy,
    color: 'text-yellow-500',
    bg: 'bg-yellow-100',
    title: 'Quiz Master',
    description: 'Complete quizzes with high scores'
  },
  'fast-learner': {
    icon: Target,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
    title: 'Fast Learner',
    description: 'Complete lessons quickly and efficiently'
  },
  'consistent': {
    icon: Award,
    color: 'text-purple-500',
    bg: 'bg-purple-100',
    title: 'Consistent Learner',
    description: 'Study regularly'
  },
  'helper': {
    icon: Star,
    color: 'text-green-500',
    bg: 'bg-green-100',
    title: 'Helpful Student',
    description: 'Help other students learn'
  },
  'expert': {
    icon: BookOpen,
    color: 'text-red-500',
    bg: 'bg-red-100',
    title: 'Subject Expert',
    description: 'Master specific subjects'
  }
};

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  type,
  level,
  unlocked,
  progress = 0
}) => {
  const badge = badges[type];
  const Icon = badge.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative p-4 rounded-lg ${unlocked ? badge.bg : 'bg-gray-100'}`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${unlocked ? badge.bg : 'bg-gray-200'}`}>
          <Icon className={`h-6 w-6 ${unlocked ? badge.color : 'text-gray-400'}`} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{badge.title}</h3>
          <p className="text-sm text-gray-500">{badge.description}</p>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-700">Level {level}</span>
          <span className="text-xs text-gray-500">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${unlocked ? 'bg-green-500' : 'bg-gray-300'}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {!unlocked && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-lg flex items-center justify-center">
          <div className="bg-white rounded-full p-2">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H8" />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AchievementBadge;