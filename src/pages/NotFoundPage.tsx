import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="bg-blue-100 rounded-full p-4">
            <Search className="h-10 w-10 text-blue-600" />
          </div>
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-2 text-gray-600 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. The page might have been removed or the URL might be incorrect.
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button>
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;