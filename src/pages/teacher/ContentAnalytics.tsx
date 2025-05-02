import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, BarChart2, Users, Download, CheckSquare, AlertTriangle } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Mock data
const mockContentData = {
  id: '1',
  title: 'Machine Learning Basics',
  description: 'Introduction to machine learning concepts and algorithms',
  date: '2023-05-01T10:00:00Z',
  author: 'Prof. Johnson',
  totalStudents: 15,
  completionRate: 85,
  averageScore: 82,
  studentsCompleted: 12,
  questionAnalytics: [
    {
      id: 1,
      question: 'What is the main goal of supervised learning?',
      correctRate: 90,
      averageTime: 45
    },
    {
      id: 2,
      question: 'Which of the following is NOT a type of machine learning?',
      correctRate: 75,
      averageTime: 60
    },
    {
      id: 3,
      question: 'Which algorithm is commonly used for classification tasks?',
      correctRate: 85,
      averageTime: 50
    },
    {
      id: 4,
      question: 'What does the acronym "CNN" stand for in deep learning?',
      correctRate: 65,
      averageTime: 75
    },
    {
      id: 5,
      question: 'What is overfitting in machine learning?',
      correctRate: 80,
      averageTime: 55
    }
  ],
  conceptAnalytics: [
    { topic: 'Supervised Learning', mastery: 85 },
    { topic: 'Unsupervised Learning', mastery: 75 },
    { topic: 'Reinforcement Learning', mastery: 68 },
    { topic: 'Neural Networks', mastery: 62 },
    { topic: 'Model Evaluation', mastery: 80 }
  ]
};

const ContentAnalytics: React.FC = () => {
  const { contentId } = useParams<{ contentId: string }>();
  const [contentData, setContentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate fetching data
  useEffect(() => {
    const fetchData = () => {
      // In a real app, we would fetch specific content
      setContentData(mockContentData);
      setIsLoading(false);
    };
    
    setTimeout(fetchData, 1000);
  }, [contentId]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
        <p className="mt-4 text-gray-600">Loading content analytics...</p>
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
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">{contentData.title}</h1>
          <p className="mt-1 text-gray-600">{contentData.description}</p>
          <div className="mt-2 text-sm text-gray-500">
            Created on {formatDate(contentData.date)} by {contentData.author}
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              leftIcon={<Download className="h-4 w-4" />}
            >
              Download Analytics Report
            </Button>
            <Button
              variant="outline"
              leftIcon={<FileText className="h-4 w-4" />}
            >
              View Original Content
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="py-6">
            <h2 className="text-lg font-semibold">Average Score</h2>
            <div className="mt-2">
              <span className="text-3xl font-bold">{contentData.averageScore}%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="py-6">
            <h2 className="text-lg font-semibold">Completion Rate</h2>
            <div className="mt-2">
              <span className="text-3xl font-bold">{contentData.completionRate}%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="py-6">
            <h2 className="text-lg font-semibold">Students Completed</h2>
            <div className="mt-2">
              <span className="text-3xl font-bold">{contentData.studentsCompleted}/{contentData.totalStudents}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardContent className="py-6">
            <h2 className="text-lg font-semibold">Concept Mastery</h2>
            <div className="mt-2">
              <span className="text-3xl font-bold">74%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <CheckSquare className="h-5 w-5 mr-2 text-blue-600" />
                Question Analytics
              </h2>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-200">
                {contentData.questionAnalytics.map((question: any) => (
                  <div key={question.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-grow">
                        <h3 className="text-base font-medium text-gray-900">
                          {question.id}. {question.question}
                        </h3>
                      </div>
                      <div className="mt-2 md:mt-0 md:ml-4 md:flex md:items-center">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-800">
                          <span className={`font-medium ${getScoreColor(question.correctRate)}`}>
                            {question.correctRate}%
                          </span>
                          <span className="ml-1 text-xs text-gray-500">correct</span>
                        </div>
                        <div className="mt-1 md:mt-0 md:ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-800">
                          <span className="font-medium">{question.averageTime}s</span>
                          <span className="ml-1 text-xs text-gray-500">avg. time</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          question.correctRate >= 80 ? 'bg-green-500' : 
                          question.correctRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${question.correctRate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                Student Performance Distribution
              </h2>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <BarChart2 className="h-10 w-10 text-gray-400 mx-auto" />
                  <p className="mt-2 text-sm text-gray-600">Student Performance Chart</p>
                  <p className="text-xs text-gray-500">
                    In a production app, a real chart would render here.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-2 text-center">
                <div>
                  <div className="text-xs text-gray-500">0-20%</div>
                  <div className="text-sm font-medium text-gray-900">0</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">21-40%</div>
                  <div className="text-sm font-medium text-gray-900">1</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">41-60%</div>
                  <div className="text-sm font-medium text-gray-900">2</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">61-80%</div>
                  <div className="text-sm font-medium text-gray-900">5</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">81-100%</div>
                  <div className="text-sm font-medium text-gray-900">7</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Concept Mastery</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentData.conceptAnalytics.map((concept: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-700">{concept.topic}</span>
                      <span className={`text-sm font-medium ${getScoreColor(concept.mastery)}`}>
                        {concept.mastery}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          concept.mastery >= 80 ? 'bg-green-500' : 
                          concept.mastery >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${concept.mastery}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                Areas for Improvement
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900">Neural Networks</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Students struggle with understanding the architecture and training process of neural networks.
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Generate Supplementary Material
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900">Reinforcement Learning</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Concept mastery is below average. Students need additional examples and practice.
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Generate Supplementary Material
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Recommendations</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Enhance Neural Networks Content</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Add more visual explanations and interactive examples.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckSquare className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Revise Question 4</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      The question about CNNs has a low correct rate. Consider rephrasing or providing more context.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Group Review Session</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Schedule a focused review on reinforcement learning concepts.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentAnalytics;