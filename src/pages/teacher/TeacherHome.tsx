import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, BarChart2, FileText, TrendingUp, TrendingDown, Filter, Search } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

// Mock data
interface Student {
  id: string;
  name: string;
  email: string;
  averageScore: number;
  quizzesTaken: number;
  lastActivity: string;
  weakAreas: string[];
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    averageScore: 85,
    quizzesTaken: 8,
    lastActivity: '2023-05-18T14:30:00Z',
    weakAreas: ['Neural Networks', 'Graph Theory']
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    averageScore: 92,
    quizzesTaken: 10,
    lastActivity: '2023-05-17T11:15:00Z',
    weakAreas: ['Data Structures']
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    averageScore: 68,
    quizzesTaken: 5,
    lastActivity: '2023-05-16T09:45:00Z',
    weakAreas: ['Algorithms', 'Database Design', 'Web Development']
  },
  {
    id: '4',
    name: 'Sophia Williams',
    email: 'sophia.williams@example.com',
    averageScore: 78,
    quizzesTaken: 7,
    lastActivity: '2023-05-15T16:20:00Z',
    weakAreas: ['Machine Learning', 'Statistics']
  }
];

// Mock performance data
const mockPerformanceData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Average Score',
      data: [75, 78, 82, 85]
    }
  ]
};

// Mock quiz analytics
const mockQuizAnalytics = [
  { title: 'Machine Learning Basics', averageScore: 82, completionRate: 90 },
  { title: 'Data Structures', averageScore: 75, completionRate: 85 },
  { title: 'Web Development', averageScore: 88, completionRate: 95 }
];

const TeacherHome: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate fetching data
  useEffect(() => {
    const fetchData = () => {
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setIsLoading(false);
    };
    
    setTimeout(fetchData, 1000);
  }, []);
  
  // Handle search and filtering
  useEffect(() => {
    if (!students.length) return;
    
    let results = [...students];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        student => 
          student.name.toLowerCase().includes(term) || 
          student.email.toLowerCase().includes(term)
      );
    }
    
    // Sort students
    if (sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'score') {
      results.sort((a, b) => b.averageScore - a.averageScore);
    } else if (sortBy === 'activity') {
      results.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
    }
    
    setFilteredStudents(results);
  }, [searchTerm, sortBy, students]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // Calculate class averages
  const classAverageScore = students.length
    ? students.reduce((acc, student) => acc + student.averageScore, 0) / students.length
    : 0;
    
  const totalQuizzesTaken = students.length
    ? students.reduce((acc, student) => acc + student.quizzesTaken, 0)
    : 0;
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Monitor student performance and access analytics.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="py-6">
            <h2 className="text-lg font-semibold">Class Average</h2>
            <div className="mt-2 flex items-center">
              <span className="text-3xl font-bold">{classAverageScore.toFixed(1)}%</span>
              <span className="ml-2 flex items-center text-blue-100">
                <TrendingUp className="h-5 w-5 mr-1" />
                +2.5%
              </span>
            </div>
            <p className="mt-1 text-sm text-blue-100">Based on all submitted quizzes</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="py-6">
            <h2 className="text-lg font-semibold">Total Students</h2>
            <div className="mt-2 flex items-center">
              <span className="text-3xl font-bold">{students.length}</span>
            </div>
            <p className="mt-1 text-sm text-purple-100">Active in your courses</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="py-6">
            <h2 className="text-lg font-semibold">Quizzes Taken</h2>
            <div className="mt-2 flex items-center">
              <span className="text-3xl font-bold">{totalQuizzesTaken}</span>
            </div>
            <p className="mt-1 text-sm text-green-100">Across all students</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Student Performance
              </h2>
            </div>
            
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Search students by name or email..."
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-gray-500" />
                  <Select
                    options={[
                      { value: 'name', label: 'Name (A-Z)' },
                      { value: 'score', label: 'Score (High-Low)' },
                      { value: 'activity', label: 'Recent Activity' }
                    ]}
                    value={sortBy}
                    onChange={setSortBy}
                    className="min-w-[180px]"
                  />
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="px-6 py-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-2 text-gray-500">Loading student data...</p>
              </div>
            ) : filteredStudents.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="px-6 py-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">{student.name}</h3>
                        <p className="mt-1 text-sm text-gray-600">{student.email}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {student.weakAreas.map((area, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:text-right">
                        <div className="flex items-center md:justify-end">
                          <span className={`text-lg font-bold ${getScoreColor(student.averageScore)}`}>
                            {student.averageScore}%
                          </span>
                          <span className="ml-2 text-sm text-gray-600">avg. score</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {student.quizzesTaken} quizzes taken
                        </p>
                        <p className="text-sm text-gray-500">
                          Last active: {formatDate(student.lastActivity)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Link to={`/teacher/student/${student.id}`}>
                        <Button 
                          variant="outline" 
                          size="sm"
                          leftIcon={<BarChart2 className="h-4 w-4" />}
                        >
                          View Analytics
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-8 text-center">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Class Trends
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
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Class Trend</span>
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+3.2% this month</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="text-sm font-medium text-gray-900">92%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Engagement</span>
                  <span className="text-sm font-medium text-gray-900">High</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Quiz Analytics
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockQuizAnalytics.map((quiz, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900">{quiz.title}</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-500">Average Score</p>
                        <p className={`text-sm font-medium ${getScoreColor(quiz.averageScore)}`}>
                          {quiz.averageScore}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Completion</p>
                        <p className="text-sm font-medium text-gray-900">
                          {quiz.completionRate}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Link to={`/teacher/content/${index + 1}`}>
                        <Button variant="ghost" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Link to="/teacher/materials">
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={<FileText className="h-4 w-4" />}
                  >
                    View All Materials
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;