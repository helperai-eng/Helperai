import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, CheckCircle, XCircle, Clock, HelpCircle } from 'lucide-react';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';

// Mock quiz data
const mockQuiz = {
  id: '1',
  title: 'Introduction to Machine Learning Quiz',
  contentTitle: 'Introduction to Machine Learning',
  questions: [
    {
      id: 1,
      type: 'multiple',
      question: 'What is the main goal of supervised learning?',
      options: [
        'To cluster similar data points together',
        'To learn from labeled data and make predictions',
        'To find hidden patterns in data without labels',
        'To learn through trial and error'
      ],
      correctAnswer: 1 // Index of correct answer
    },
    {
      id: 2,
      type: 'multiple',
      question: 'Which of the following is NOT a type of machine learning?',
      options: [
        'Supervised learning',
        'Unsupervised learning',
        'Reinforcement learning',
        'Prescriptive learning'
      ],
      correctAnswer: 3
    },
    {
      id: 3,
      type: 'multiple',
      question: 'Which algorithm is commonly used for classification tasks?',
      options: [
        'K-means',
        'Linear regression',
        'Random forest',
        'Principal Component Analysis'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      type: 'text',
      question: 'What does the acronym "CNN" stand for in deep learning?',
      correctAnswer: 'Convolutional Neural Network'
    },
    {
      id: 5,
      type: 'multiple',
      question: 'What is overfitting in machine learning?',
      options: [
        'When a model performs well on training data but poorly on new data',
        'When a model is too simple to capture patterns in the data',
        'When the training process takes too long',
        'When the model has too many features'
      ],
      correctAnswer: 0
    }
  ]
};

interface Answer {
  questionId: number;
  answer: string | number;
  correct?: boolean;
}

const TakeQuiz: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  // Simulate fetching quiz
  useEffect(() => {
    const fetchQuiz = () => {
      setQuiz(mockQuiz);
      setIsLoading(false);
    };
    
    setTimeout(fetchQuiz, 1000);
  }, [quizId]);
  
  // Timer countdown
  useEffect(() => {
    if (quizSubmitted || isLoading) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizSubmitted, isLoading]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };
  
  const handleTextAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextAnswer(e.target.value);
  };
  
  const handleNextQuestion = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    
    // Save answer
    if (currentQuestion.type === 'multiple' && selectedOption !== null) {
      setAnswers([
        ...answers,
        {
          questionId: currentQuestion.id,
          answer: selectedOption,
          correct: selectedOption === currentQuestion.correctAnswer
        }
      ]);
      setSelectedOption(null);
    } else if (currentQuestion.type === 'text' && textAnswer.trim() !== '') {
      // Simple exact match check - in a real app, you might want something more sophisticated
      const isCorrect = textAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
      setAnswers([
        ...answers,
        {
          questionId: currentQuestion.id,
          answer: textAnswer,
          correct: isCorrect
        }
      ]);
      setTextAnswer('');
    } else {
      showToast('Please select an answer', 'warning');
      return;
    }
    
    // Move to next question or submit quiz
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };
  
  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    
    // Calculate score
    const correctAnswers = answers.filter(answer => answer.correct).length;
    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    showToast(`Quiz submitted! Your score: ${score}%`, 'success');
    
    // In a real app, you would send this data to the server
    console.log('Quiz results:', { quizId, answers, score });
  };
  
  const handleViewResults = () => {
    navigate('/student/results');
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading quiz...</p>
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  // Results screen
  if (quizSubmitted) {
    const correctAnswers = answers.filter(answer => answer.correct).length;
    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    return (
      <div>
        <div className="mb-6">
          <Link to="/student" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>
        
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <div className={`
                inline-flex items-center justify-center h-24 w-24 rounded-full 
                ${score >= 70 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}
              `}>
                <span className="text-3xl font-bold">{score}%</span>
              </div>
              
              <h1 className="mt-6 text-2xl font-bold text-gray-900">Quiz Completed!</h1>
              <p className="mt-2 text-gray-600">
                You got {correctAnswers} out of {totalQuestions} questions correct.
              </p>
              
              <div className="mt-8 flex flex-col items-center space-y-3">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Correct Answers: {correctAnswers}</span>
                </div>
                <div className="flex items-center text-sm">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span>Incorrect Answers: {totalQuestions - correctAnswers}</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Button onClick={handleViewResults}>View Detailed Results</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Question Review</h2>
              
              <div className="space-y-6">
                {quiz.questions.map((question: any, index: number) => {
                  const userAnswer = answers.find(a => a.questionId === question.id);
                  const isCorrect = userAnswer?.correct;
                  
                  return (
                    <div key={question.id} className={`p-4 rounded-lg ${
                      isCorrect ? 'bg-green-50 border border-green-100' : 
                      'bg-red-50 border border-red-100'
                    }`}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {index + 1}. {question.question}
                          </p>
                          
                          {question.type === 'multiple' && (
                            <div className="mt-2 space-y-1">
                              {question.options.map((option: string, optIndex: number) => (
                                <div key={optIndex} className={`text-sm ${
                                  optIndex === question.correctAnswer ? 'text-green-700 font-medium' : 
                                  optIndex === userAnswer?.answer && !isCorrect ? 'text-red-700 font-medium' : 
                                  'text-gray-600'
                                }`}>
                                  {option}
                                  {optIndex === question.correctAnswer && ' ✓'}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {question.type === 'text' && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Your answer: <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>{userAnswer?.answer as string}</span></p>
                              {!isCorrect && (
                                <p className="text-sm text-green-700 mt-1">Correct answer: {question.correctAnswer}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
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
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="mt-1 text-sm text-gray-600">
              Based on: {quiz.contentTitle}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span className={`font-medium ${timeRemaining < 60 ? 'text-red-600' : ''}`}>
              Time remaining: {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-600">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
            <span className="text-blue-600 font-medium">
              {Math.round((currentQuestionIndex / quiz.questions.length) * 100)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
            <div 
              className="bg-blue-600 h-1.5 rounded-full" 
              style={{ width: `${(currentQuestionIndex / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {currentQuestion.question}
            </h2>
            
            {currentQuestion.type === 'multiple' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option: string, index: number) => (
                  <div 
                    key={index}
                    className={`
                      p-4 border rounded-lg cursor-pointer transition-colors
                      ${selectedOption === index 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'}
                    `}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-center">
                      <div className={`
                        w-5 h-5 rounded-full border flex items-center justify-center mr-3
                        ${selectedOption === index ? 'border-blue-500' : 'border-gray-300'}
                      `}>
                        {selectedOption === index && (
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {currentQuestion.type === 'text' && (
              <div>
                <input
                  type="text"
                  value={textAnswer}
                  onChange={handleTextAnswerChange}
                  placeholder="Type your answer here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <HelpCircle className="h-4 w-4 mr-1" />
              <span>
                {currentQuestion.type === 'multiple' 
                  ? 'Select the best answer' 
                  : 'Type your answer as precisely as possible'}
              </span>
            </div>
            
            <Button
              onClick={handleNextQuestion}
              rightIcon={<ChevronRight className="h-4 w-4" />}
              disabled={
                (currentQuestion.type === 'multiple' && selectedOption === null) ||
                (currentQuestion.type === 'text' && textAnswer.trim() === '')
              }
            >
              {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;