import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Film, CheckSquare, Clock, ExternalLink } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Mock data
interface ContentItem {
  id: string;
  title: string;
  date: string;
  status: 'processing' | 'ready' | 'completed';
  hasVideo: boolean;
  hasQuiz: boolean;
}

const StudentHome: React.FC = () => {
  const [recentContent, setRecentContent] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    const fetchData = () => {
      // Mock data
      const mockData: ContentItem[] = [
        {
          id: '1',
          title: 'Introduction to Machine Learning',
          date: '2023-05-15',
          status: 'ready',
          hasVideo: true,
          hasQuiz: true
        },
        {
          id: '2',
          title: 'Advanced Data Structures',
          date: '2023-05-10',
          status: 'completed',
          hasVideo: true,
          hasQuiz: true
        },
        {
          id: '3',
          title: 'Web Development Fundamentals',
          date: '2023-05-02',
          status: 'processing',
          hasVideo: false,
          hasQuiz: false
        }
      ];
      
      setRecentContent(mockData);
      setIsLoading(false);
    };
    
    setTimeout(fetchData, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'processing') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          Processing
        </span>
      );
    } else if (status === 'ready') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Ready
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckSquare className="w-3 h-3 mr-1" />
          Completed
        </span>
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Welcome to your personalized learning space.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/student/upload">
            <Button leftIcon={<FileText className="h-4 w-4" />}>
              Upload New Content
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="py-6">
            <h2 className="text-lg font-semibold">Quick Upload</h2>
            <p className="mt-1 text-blue-100">
              Upload your PowerPoint slides and get AI-generated learning materials instantly.
            </p>
            <div className="mt-4">
              <Link to="/student/upload">
                <Button variant="outline" className="bg-white/10 border-white/30 hover:bg-white/20">
                  Start Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="py-6">
            <h2 className="text-lg font-semibold">Latest Quizzes</h2>
            <p className="mt-1 text-purple-100">
              Take AI-generated quizzes to test your understanding and reinforce learning.
            </p>
            <div className="mt-4">
              <Link to="/student/quiz/latest">
                <Button variant="outline" className="bg-white/10 border-white/30 hover:bg-white/20">
                  Take Quiz
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="py-6">
            <h2 className="text-lg font-semibold">Performance</h2>
            <p className="mt-1 text-green-100">
              View your results and get personalized recommendations for improvement.
            </p>
            <div className="mt-4">
              <Link to="/student/results">
                <Button variant="outline" className="bg-white/10 border-white/30 hover:bg-white/20">
                  View Results
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Content</h2>
          <Link to="/student/content" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
            View All
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="px-6 py-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-500">Loading your content...</p>
          </div>
        ) : recentContent.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {recentContent.map((item) => (
              <div key={item.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
                    {getStatusBadge(item.status)}
                    {item.hasVideo && (
                      <span className="inline-flex items-center text-xs text-gray-500">
                        <Film className="h-3 w-3 mr-1" />
                        Video
                      </span>
                    )}
                    {item.hasQuiz && (
                      <span className="inline-flex items-center text-xs text-gray-500">
                        <CheckSquare className="h-3 w-3 mr-1" />
                        Quiz
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-2">
                  {item.status !== 'processing' && (
                    <>
                      {item.hasVideo && (
                        <Link to={`/student/content/${item.id}`}>
                          <Button size="sm" variant="outline">Watch</Button>
                        </Link>
                      )}
                      {item.hasQuiz && (
                        <Link to={`/student/quiz/${item.id}`}>
                          <Button size="sm" variant={item.status === 'completed' ? 'outline' : 'primary'}>
                            {item.status === 'completed' ? 'Review Quiz' : 'Take Quiz'}
                          </Button>
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No content yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by uploading your first PowerPoint file.
            </p>
            <div className="mt-6">
              <Link to="/student/upload">
                <Button>Upload Content</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHome;