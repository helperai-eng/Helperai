import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Clock, Users } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../ui/Card';

interface QuizAnalyticsProps {
  title: string;
  averageScore: number;
  completionRate: number;
  totalStudents: number;
  averageTime: string;
}

const QuizAnalyticsCard: React.FC<QuizAnalyticsProps> = ({
  title,
  averageScore,
  completionRate,
  totalStudents,
  averageTime,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center text-blue-600 mb-1">
                <BarChart2 className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Average Score</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{averageScore}%</div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center text-green-600 mb-1">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Completion</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{completionRate}%</div>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center text-purple-600 mb-1">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Students</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalStudents}</div>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center text-yellow-600 mb-1">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Avg. Time</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{averageTime}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizAnalyticsCard;