import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Film, FileText, BarChart2, Brain, MessageSquare, Globe2, Clock, Mail, GitBranch as BrandTiktok } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Transform Learning with AI
              </h1>
              <p className="mt-4 text-lg md:text-xl opacity-90">
                Upload your PowerPoint slides and instantly get AI-generated videos, quizzes, and personalized learning materials.
              </p>
              <div className="mt-8">
                {currentUser ? (
                  <Link to={currentUser.role === 'student' ? '/student' : '/teacher'}>
                    <Button size="lg">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link to="/register">
                      <Button size="lg">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="bg-white/10 border-white/30 hover:bg-white/20">
                        Login
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Placeholder for an illustration */}
            <div className="hidden md:block md:w-1/2 mt-8 md:mt-0">
              <div className="bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-sm">
                <div className="aspect-video rounded-lg bg-white/5 flex items-center justify-center">
                  <Film className="h-16 w-16 text-white/60" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="rounded bg-white/5 h-12 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white/60" />
                  </div>
                  <div className="rounded bg-white/5 h-12 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white/60" />
                  </div>
                  <div className="rounded bg-white/5 h-12 flex items-center justify-center">
                    <BarChart2 className="h-6 w-6 text-white/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to enhance learning and teaching
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Smart Tutoring */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg text-blue-600">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Smart Tutoring</h3>
              <p className="mt-2 text-gray-600">
                Get instant answers and step-by-step explanations across various subjects.
              </p>
            </div>
            
            {/* Homework Assistance */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-lg text-purple-600">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Homework Assistance</h3>
              <p className="mt-2 text-gray-600">
                Solve problems and understand concepts more effectively with AI guidance.
              </p>
            </div>
            
            {/* Lesson Plan Generator */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-lg text-green-600">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Lesson Plan Generator</h3>
              <p className="mt-2 text-gray-600">
                Create structured, curriculum-aligned lesson plans tailored to different learning styles.
              </p>
            </div>
            
            {/* Auto Quiz Builder */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
              <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-lg text-yellow-600">
                <BarChart2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Auto Quiz Builder</h3>
              <p className="mt-2 text-gray-600">
                Generate custom quizzes based on topics or difficulty levels for effective review.
              </p>
            </div>
            
            {/* Multilingual Support */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
              <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-lg text-red-600">
                <Globe2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Multilingual Support</h3>
              <p className="mt-2 text-gray-600">
                Break down language barriers with real-time translation and localized explanations.
              </p>
            </div>
            
            {/* 24/7 Learning Companion */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-lg text-indigo-600">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">24/7 Learning Companion</h3>
              <p className="mt-2 text-gray-600">
                Always available to support students outside classroom hours.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-gray-50" id="contact">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
              <p className="mt-4 text-lg text-gray-600">
                Get in touch with us through our social media or email
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-8">
                <div className="flex items-center text-gray-700">
                  <Mail className="h-6 w-6 mr-2" />
                  <a href="mailto:helperai25@gmail.com" className="hover:text-blue-600">
                    helperai25@gmail.com
                  </a>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <a href="https://tiktok.com/@helperai25" className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                    @helperai25
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to transform learning?</h2>
          <p className="mt-4 text-xl text-gray-600">
            Join thousands of students and teachers already using our platform.
          </p>
          <div className="mt-8">
            {currentUser ? (
              <Link to={currentUser.role === 'student' ? '/student' : '/teacher'}>
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg">Get Started for Free</Button>
              </Link>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-bold text-gray-900">Helper.AI</span>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-600">
              &copy; {new Date().getFullYear()} Helper.AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;