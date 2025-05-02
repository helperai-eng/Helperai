import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../ui/Card';

interface StudentProgressProps {
  name: string;
  score: number;
  trend: number;
  lastActive: string;
}

const StudentProgressCard: React.FC<StudentProgressProps> = ({
  name,
  score,
  trend,
  lastActive,
}) => {
  const isPositiveTrend = trend >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500">Last active: {lastActive}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{score}%</div>
              <div className={`flex items-center ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`}>
                {isPositiveTrend ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm">{Math.abs(trend)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentProgressCard;