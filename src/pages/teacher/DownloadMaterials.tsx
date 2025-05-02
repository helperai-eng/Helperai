import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, User, Filter, Search, Clock, CheckCircle } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useToast } from '../../contexts/ToastContext';

// Mock data
interface Material {
  id: string;
  title: string;
  student: string;
  studentId: string;
  contentTitle: string;
  contentId: string;
  date: string;
  type: 'review' | 'quiz' | 'summary';
  status: 'new' | 'downloaded';
  fileSize: string;
}

const mockMaterials: Material[] = [
  {
    id: '1',
    title: 'Neural Networks Review',
    student: 'John Smith',
    studentId: '1',
    contentTitle: 'Machine Learning Basics',
    contentId: '1',
    date: '2023-05-18T14:30:00Z',
    type: 'review',
    status: 'new',
    fileSize: '2.4 MB'
  },
  {
    id: '2',
    title: 'Data Structures Reinforcement',
    student: 'Emily Johnson',
    studentId: '2',
    contentTitle: 'Advanced Data Structures',
    contentId: '2',
    date: '2023-05-17T11:15:00Z',
    type: 'review',
    status: 'downloaded',
    fileSize: '1.8 MB'
  },
  {
    id: '3',
    title: 'Algorithms Quiz Solutions',
    student: 'Michael Brown',
    studentId: '3',
    contentTitle: 'Algorithm Design',
    contentId: '3',
    date: '2023-05-16T09:45:00Z',
    type: 'quiz',
    status: 'new',
    fileSize: '3.2 MB'
  },
  {
    id: '4',
    title: 'Web Development Summary',
    student: 'Sophia Williams',
    studentId: '4',
    contentTitle: 'Web Development Fundamentals',
    contentId: '4',
    date: '2023-05-15T16:20:00Z',
    type: 'summary',
    status: 'downloaded',
    fileSize: '1.5 MB'
  }
];

const DownloadMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  
  // Simulate fetching data
  useEffect(() => {
    const fetchData = () => {
      setMaterials(mockMaterials);
      setFilteredMaterials(mockMaterials);
      setIsLoading(false);
    };
    
    setTimeout(fetchData, 1000);
  }, []);
  
  // Apply filters
  useEffect(() => {
    if (!materials.length) return;
    
    let results = [...materials];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        material => 
          material.title.toLowerCase().includes(term) || 
          material.student.toLowerCase().includes(term) ||
          material.contentTitle.toLowerCase().includes(term)
      );
    }
    
    // Apply type filter
    if (filterType !== 'all') {
      results = results.filter(material => material.type === filterType);
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      results = results.filter(material => material.status === filterStatus);
    }
    
    setFilteredMaterials(results);
  }, [searchTerm, filterType, filterStatus, materials]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleDownload = (materialId: string) => {
    // In a real app, this would trigger a file download
    showToast('Downloading material...', 'info');
    
    // Update status to 'downloaded'
    const updatedMaterials = materials.map(material => {
      if (material.id === materialId) {
        return { ...material, status: 'downloaded' };
      }
      return material;
    });
    
    setTimeout(() => {
      setMaterials(updatedMaterials);
      showToast('Material downloaded successfully', 'success');
    }, 1500);
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Review Materials</h1>
        <p className="mt-1 text-gray-600">
          Download AI-generated review materials for your students.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search by title, student name, or content..."
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Select
                options={[
                  { value: 'all', label: 'All Types' },
                  { value: 'review', label: 'Review Materials' },
                  { value: 'quiz', label: 'Quiz Solutions' },
                  { value: 'summary', label: 'Content Summaries' }
                ]}
                value={filterType}
                onChange={setFilterType}
                className="min-w-[180px]"
              />
              
              <Select
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'new', label: 'New' },
                  { value: 'downloaded', label: 'Downloaded' }
                ]}
                value={filterStatus}
                onChange={setFilterStatus}
                className="min-w-[150px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading materials...</p>
        </div>
      ) : filteredMaterials.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Available Materials</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredMaterials.map((material) => (
              <div key={material.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-grow">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className={`h-10 w-10 rounded-md flex items-center justify-center 
                          ${material.type === 'review' ? 'bg-blue-100' : 
                            material.type === 'quiz' ? 'bg-purple-100' : 'bg-green-100'}`}
                        >
                          <FileText className={`h-5 w-5 
                            ${material.type === 'review' ? 'text-blue-600' : 
                              material.type === 'quiz' ? 'text-purple-600' : 'text-green-600'}`} 
                          />
                        </div>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                          {material.title}
                          {material.status === 'new' && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                        </h3>
                        <div className="mt-1 text-sm text-gray-600">
                          Content: <Link to={`/teacher/content/${material.contentId}`} className="text-blue-600 hover:text-blue-700">{material.contentTitle}</Link>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <User className="h-4 w-4 mr-1" />
                          <Link to={`/teacher/student/${material.studentId}`} className="hover:text-gray-700">
                            {material.student}
                          </Link>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatDate(material.date)}</span>
                          <span className="mx-2">•</span>
                          <span>{material.fileSize}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 lg:mt-0 lg:ml-4">
                    <Button
                      leftIcon={material.status === 'downloaded' ? <CheckCircle className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                      variant={material.status === 'downloaded' ? 'outline' : 'primary'}
                      onClick={() => handleDownload(material.id)}
                    >
                      {material.status === 'downloaded' ? 'Download Again' : 'Download'}
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className={`p-3 rounded-md 
                    ${material.type === 'review' ? 'bg-blue-50' : 
                      material.type === 'quiz' ? 'bg-purple-50' : 'bg-green-50'}`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center 
                          ${material.type === 'review' ? 'bg-blue-100' : 
                            material.type === 'quiz' ? 'bg-purple-100' : 'bg-green-100'}`}
                        >
                          <FileText className={`h-3 w-3 
                            ${material.type === 'review' ? 'text-blue-600' : 
                              material.type === 'quiz' ? 'text-purple-600' : 'text-green-600'}`} 
                          />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">
                          {material.type === 'review' && 'This material contains personalized review content focusing on areas where the student needs improvement.'}
                          {material.type === 'quiz' && 'This material contains detailed solutions and explanations for quiz questions.'}
                          {material.type === 'summary' && 'This material provides a comprehensive summary of the learning content.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-xl font-medium text-gray-900">No materials found</h2>
          <p className="mt-1 text-gray-600">
            Try adjusting your search criteria or check back later for new materials.
          </p>
        </div>
      )}
    </div>
  );
};

export default DownloadMaterials;