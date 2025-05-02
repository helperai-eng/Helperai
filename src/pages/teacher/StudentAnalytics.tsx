import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, BarChart2, Download, FileText, CheckSquare, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';

// Mock student data
const mockStudentData = {
  id: '1',
  name: 'John Smith',
  email: 'john.smith@example.com',
  avatarUrl: null,
  averageScore: 85,
  quizzesTaken: 8,
  lastActivity: '2023-05-18T14:30:00Z',
  strengths: ['Data Analysis', 'Algorithm Design', 'Web Development'],
  weakAreas: ['Neural Networks', 'Graph Theory'],
  quizzes: [
    {
      id: '101',
      title: 'Machine Learning Basics',
      date: '2023-05-15T14:30:00Z',
      score: 78,
      totalQuestions: 10,
      correctAnswers: 8,
      completionTime: '12:45'
    },
    {
      id: '102',
      title: 'Data Structures and Algorithms',
      date: '2023-05-10T09:15:00Z',
      score: 92,
      totalQuestions: 15,
      correctAnswers: 14,
      completionTime: '18:30'
    },
    {
      id: '103',
      title: 'Web Development Fundamentals',
      date: '2023-05-05T11:45:00Z',
      score: 85,
      totalQuestions: 12,
      correctAnswers: 10,
      completionTime: '15:20'
    }
  ],
  performanceTrend: [
    { week: 'Week 1', score: 75 },
    { week: 'Week 2', score: 82 },
    { week: 'Week 3', score: 79 },
    { week: 'Week 4', score: 85 }
  ]
};

const StudentAnalytics: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [studentData, setStudentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { showToast } = useToast();
  
  // Simulate fetching data
  useEffect(() => {
    const fetchData = () => {
      // In a real app, we would fetch the specific student
      setStudentData(mockStudentData);
      setIsLoading(false);
    };
    
    setTimeout(fetchData, 1000);
  }, [studentId]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const handleGenerateMaterials = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      showToast('Personalized review materials generated successfully', 'success');
    }, 2000);
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading student data...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/teacher" className="inline-flex items-center text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
              <User className="h-10 w-10 text-blue-600" />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{studentData.name}</h1>
              <p className="text-gray-600">{studentData.email}</p>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-0 flex flex-col sm:items-end">
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${getScoreColor(studentData.averageScore)}`}>
                {studentData.averageScore}%
              </span>
              <span className="ml-2 text-sm text-gray-600">Average Score</span>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Last active: {formatDate(studentData.lastActivity)}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              leftIcon={<FileText className="h-4 w-4" />}
              isLoading={isGenerating}
              onClick={handleGenerateMaterials}
            >
              Generate Review Materials
            </Button>
            <Button
              variant="outline"
              leftIcon={<Download className="h-4 w-4" />}
              disabled={isGenerating}
            >
              Download Performance Report
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <CheckSquare className="h-5 w-5 mr-2 text-blue-600" />
                Quiz Performance
              </h2>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-200">
                {studentData.quizzes.map((quiz: any) => (
                  <div key={quiz.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">{quiz.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Taken on {formatDate(quiz.date)}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:text-right">
                        <div className={`text-xl font-bold ${getScoreColor(quiz.score)}`}>
                          {quiz.score}%
                        </div>
                        <p className="text-sm text-gray-600">
                          {quiz.correctAnswers} of {quiz.totalQuestions} correct
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-md p-3">
                        <div className="text-xs text-gray-500">Score</div>
                        <div className={`text-sm font-medium ${getScoreColor(quiz.score)}`}>
                          {quiz.score}%
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-md p-3">
                        <div className="text-xs text-gray-500">Questions</div>
                        <div className="text-sm font-medium text-gray-900">
                          {quiz.totalQuestions}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-md p-3">
                        <div className="text-xs text-gray-500">Correct</div>
                        <div className="text-sm font-medium text-green-600">
                          {quiz.correctAnswers}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-md p-3">
                        <div className="text-xs text-gray-500">Time</div>
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {quiz.completionTime}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-purple-600" />
                Performance Trend
              </h2>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <BarChart2 className="h-10 w-10 text-gray-400 mx-auto" />
                  <p className="mt-2 text-sm text-gray-600">Performance Chart</p>
                  <p className="text-xs text-gray-500">
                    In a production app, a real chart would render here.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mt-4">
                {studentData.performanceTrend.map((item: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-500">{item.week}</div>
                    <div className={`text-sm font-medium ${getScoreColor(item.score)}`}>
                      {item.score}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Learning Insights</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    Strengths
                  </h3>
                  <div className="space-y-2">
                    {studentData.strengths.map((strength: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></span>
                        <span className="text-sm text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                    <TrendingDown className="h-4 w-4 mr-1 text-yellow-500" />
                    Areas for Improvement
                  </h3>
                  <div className="space-y-2">
                    {studentData.weakAreas.map((area: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-600 mr-2"></span>
                        <span className="text-sm text-gray-700">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Recommendations</h3>
                  <p className="text-sm text-gray-700">
                    Based on performance analysis, this student would benefit from additional materials focused on Neural Networks and Graph Theory concepts.
                  </p>
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      leftIcon={<FileText className="h-4 w-4" />}
                      onClick={handleGenerateMaterials}
                      isLoading={isGenerating}
                    >
                      Generate Materials
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Activity Summary</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Quizzes Taken</span>
                  <span className="text-sm font-medium text-gray-900">{studentData.quizzesTaken}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="text-sm font-medium text-gray-900">100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Engagement Level</span>
                  <span className="text-sm font-medium text-green-600">High</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Time per Quiz</span>
                  <span className="text-sm font-medium text-gray-900">15:32</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;