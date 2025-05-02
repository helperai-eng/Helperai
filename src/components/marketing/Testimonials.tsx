import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'High School Teacher',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    content: 'Helper.AI has revolutionized my teaching process. I save hours on lesson planning and quiz creation, and my students are more engaged than ever!',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Math Professor',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    content: 'The AI-generated quizzes are incredibly accurate and help identify learning gaps. This tool has transformed how I assess student understanding.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Elementary Teacher',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    content: 'My students love the interactive features and gamification elements. It makes learning fun and keeps them motivated!',
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Loved by Educators
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            See what teachers are saying about Helper.AI
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="mt-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <blockquote className="mt-4">
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;