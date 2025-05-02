import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentNavbar from './components/StudentNavbar';
import StudentHome from './StudentHome';
import UploadContent from './UploadContent';
import ViewContent from './ViewContent';
import TakeQuiz from './TakeQuiz';
import StudentResults from './StudentResults';
import AITutorChat from '../../components/ai/AITutorChat';

const StudentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<StudentHome />} />
          <Route path="/upload" element={<UploadContent />} />
          <Route path="/content/:contentId" element={<ViewContent />} />
          <Route path="/quiz/:quizId" element={<TakeQuiz />} />
          <Route path="/results" element={<StudentResults />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
      <AITutorChat />
    </div>
  );
};

export default StudentDashboard;