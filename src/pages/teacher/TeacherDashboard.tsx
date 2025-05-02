import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TeacherNavbar from './components/TeacherNavbar';
import TeacherHome from './TeacherHome';
import StudentAnalytics from './StudentAnalytics';
import ContentAnalytics from './ContentAnalytics';
import DownloadMaterials from './DownloadMaterials';

const TeacherDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<TeacherHome />} />
          <Route path="/student/:studentId" element={<StudentAnalytics />} />
          <Route path="/content/:contentId" element={<ContentAnalytics />} />
          <Route path="/materials" element={<DownloadMaterials />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default TeacherDashboard;