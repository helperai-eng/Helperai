import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Film, CheckSquare, ArrowLeft, BookOpen, Download } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';
import { supabase } from '../../lib/supabase';

interface Content {
  id: string;
  title: string;
  status: 'processing' | 'ready' | 'error';
  video_url: string | null;
  quiz_data: {
    questions: Array<{
      id: number;
      type: string;
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  } | null;
  created_at: string;
}

const ViewContent: React.FC = () => {
  const { contentId } = useParams<{ contentId: string }>();
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    let ignore = false;

    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('content')
          .select('*')
          .eq('id', contentId)
          .single();

        if (error) throw error;

        if (!ignore) {
          setContent(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        showToast('Failed to load content', 'error');
        setIsLoading(false);
      }
    };

    fetchContent();

    // Poll for updates if content is processing
    let pollInterval: number | undefined;
    if (content?.status === 'processing') {
      pollInterval = window.setInterval(fetchContent, 5000); // Poll every 5 seconds
    }

    return () => {
      ignore = true;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [contentId, content?.status]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading content...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Content not found</p>
        <Link to="/student" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/student" className="inline-flex items-center text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{content.title}</h1>
                  <p className="mt-2 text-sm text-gray-600">
                    Uploaded on {formatDate(content.created_at)}
                  </p>
                </div>
                <div>
                  {content.status === 'processing' && (
                    <div className="flex items-center text-yellow-600">
                      <div className="animate-spin h-5 w-5 mr-2 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
                      Processing
                    </div>
                  )}
                  {content.status === 'ready' && (
                    <div className="flex items-center text-green-600">
                      <CheckSquare className="h-5 w-5 mr-1" />
                      Ready
                    </div>
                  )}
                  {content.status === 'error' && (
                    <div className="text-red-600">
                      Processing failed
                    </div>
                  )}
                </div>
              </div>
            </div>

            {content.status === 'processing' ? (
              <div className="p-12 text-center">
                <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-4 text-gray-600">Processing your content...</p>
                <p className="mt-2 text-sm text-gray-500">This may take a few minutes.</p>
              </div>
            ) : content.status === 'ready' ? (
              <div className="p-6">
                <div className="aspect-video bg-gray-100 rounded-lg mb-6">
                  {content.video_url ? (
                    <video
                      className="w-full h-full rounded-lg"
                      controls
                      src={content.video_url}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">Video not available</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {content.quiz_data && (
                    <Button
                      variant="primary"
                      leftIcon={<CheckSquare className="h-4 w-4" />}
                      onClick={() => navigate(`/student/quiz/${content.id}`)}
                    >
                      Take Quiz
                    </Button>
                  )}
                  {content.video_url && (
                    <Button
                      variant="outline"
                      leftIcon={<Download className="h-4 w-4" />}
                      as="a"
                      href={content.video_url}
                      download
                    >
                      Download Video
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-red-600">Failed to process content</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/3">
          {content.status === 'ready' && content.quiz_data && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <CheckSquare className="h-5 w-5 mr-2 text-blue-600" />
                  Quiz Preview
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.quiz_data.questions.map((question, index) => (
                    <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">
                        {index + 1}. {question.question}
                      </p>
                      <div className="mt-2 space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className="flex items-center space-x-2 text-sm text-gray-600"
                          >
                            <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => navigate(`/student/quiz/${content.id}`)}
                  >
                    Start Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewContent;