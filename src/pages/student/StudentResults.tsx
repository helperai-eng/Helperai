import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, FileText, ChevronRight, Download, TrendingUp, TrendingDown } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';

// Mock data
interface QuizResult {
  id: string;
  title: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  contentTitle: string;
  weakAreas: string[];
}

const mockResults: QuizResult[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning Quiz',
    date: '2023-05-15T14:30:00Z',
    score: 80,
    totalQuestions: 5,
    correctAnswers: 4,
    contentTitle: 'Introduction to Machine Learning',
    weakAreas: ['Neural Networks', 'Unsupervised Learning']
  },
  {
    id: '2',
    title: 'Advanced Data Structures Quiz',
    date: '2023-05-10T09:15:00Z',
    score: 70,
    totalQuestions: 10,
    correctAnswers: 7,
    contentTitle: 'Advanced Data Structures',
    weakAreas: ['Graph Algorithms', 'AVL Trees', 'Red-Black Trees']
  }
];

// Mock performance data for chart
const mockPerformanceData = [
  { subject: 'Machine Learning', score: 80 },
  { subject: 'Data Structures', score: 70 },
  { subject: 'Algorithms', score: 85 },
  { subject: 'Web Development', score: 90 },
  { subject: 'Databases', score: 75 }
];

const StudentResults: React.FC = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  
  // Simulate fetching results
  useEffect(() => {
    const fetchResults = () => {
      setResults(mockResults);
      setIsLoading(false);
    };
    
    setTimeout(fetchResults, 1000);
  }, []);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleGenerateReview = (resultId: string) => {
    showToast('Generating personalized review materials...', 'info');
    // In a real app, this would trigger an API call to generate the materials
    setTimeout(() => {
      showToast('Review materials generated successfully!', 'success');
    }, 2000);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading your results...</p>
      </div>
    );
  }
  
  const averageScore = results.length 
    ? results.reduce((acc, result) => acc + result.score, 0) / results.length 
    : 0;
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Results</h1>
        <p className="mt-1 text-gray-600">
          View your quiz performance and get personalized learning recommendations.
        </p>
      </div>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quiz History</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {results.map((result) => (
                  <div key={result.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{result.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {formatDate(result.date)} • {result.contentTitle}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <div className={`text-xl font-bold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </div>
                        <p className="text-sm text-gray-600">
                          {result.correctAnswers} of {result.totalQuestions} correct
                        </p>
                      </div>
                    </div>
                    
                    {result.weakAreas.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Areas for Improvement:</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {result.weakAreas.map((area, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        leftIcon={<FileText className="h-4 w-4" />}
                        onClick={() => handleGenerateReview(result.id)}
                      >
                        Generate Review Materials
                      </Button>
                      <Link to={`/student/quiz/${result.id}`}>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          rightIcon={<ChevronRight className="h-4 w-4" />}
                        >
                          Review Quiz
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
                  Performance Summary
                </h2>
              </CardHeader>
              <CardContent>
                <div className="py-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Average Score</span>
                    <span className={`font-bold ${getScoreColor(averageScore)}`}>{averageScore.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        averageScore >= 80 ? 'bg-green-600' : 
                        averageScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${averageScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-6 mt-4">
                  <div className="p-4 rounded-lg bg-blue-50">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Overall Progress</h3>
                    <div className="flex items-center text-blue-700">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      <span>Your scores are consistently improving!</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Subject Performance</h3>
                    {mockPerformanceData.map((item, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-600">{item.subject}</span>
                          <span className="text-xs font-medium text-gray-900">{item.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${
                              item.score >= 80 ? 'bg-green-500' : 
                              item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Learning Recommendations</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <TrendingDown className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Review Weak Areas</h3>
                      <p className="text-sm text-gray-600">
                        Focus on strengthening your understanding of neural networks and graph algorithms.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Download className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Get Personalized Materials</h3>
                      <p className="text-sm text-gray-600">
                        Download AI-generated review materials tailored to your learning needs.
                      </p>
                      <div className="mt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          leftIcon={<Download className="h-4 w-4" />}
                        >
                          Download Materials
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-xl font-medium text-gray-900">No results yet</h2>
          <p className="mt-1 text-gray-600">
            Complete quizzes to see your performance data here.
          </p>
          <div className="mt-6">
            <Link to="/student/upload">
              <Button>Upload Content & Take a Quiz</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentResults;