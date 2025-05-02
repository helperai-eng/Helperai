import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
  avatar?: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, currentUserId }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-600 text-white">
        <h2 className="text-lg font-semibold">Class Leaderboard</h2>
        <p className="text-sm text-blue-100">Top performers this week</p>
      </div>

      <div className="divide-y divide-gray-200">
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
            className={`p-4 flex items-center ${entry.id === currentUserId ? 'bg-blue-50' : ''}`}
          >
            <div className="flex-shrink-0 w-8 text-center">
              {getRankIcon(entry.rank) || <span className="text-gray-500">{entry.rank}</span>}
            </div>

            <div className="ml-4 flex-grow">
              <div className="flex items-center">
                {entry.avatar ? (
                  <img
                    src={entry.avatar}
                    alt={entry.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">
                      {entry.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className={`ml-3 font-medium ${entry.id === currentUserId ? 'text-blue-600' : 'text-gray-900'}`}>
                  {entry.name}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0 text-right">
              <span className="font-bold text-gray-900">{entry.score}</span>
              <span className="text-sm text-gray-500 ml-1">pts</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;