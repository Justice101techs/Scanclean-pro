import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { QrCode, FileText, Sparkles, ArrowRight } from 'lucide-react';
import FeatureCard from '../components/FeatureCard.jsx';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: QrCode,
      title: 'QR Scanner',
      description: 'Generate and scan QR codes instantly with our advanced scanning technology.',
      isLocked: !isAuthenticated,
      path: '/qr'
    },
    {
      icon: FileText,
      title: 'OCR Scanner',
      description: 'Extract text from images and documents with high accuracy OCR technology.',
      isLocked: !isAuthenticated,
      path: '/ocr'
    },
    {
      icon: Sparkles,
      title: 'Image Enhancer',
      description: 'Enhance and clean up your images with AI-powered processing tools.',
      isLocked: false,
      path: '/image-enhancer'
    }
  ];

  const handleFeatureClick = (feature) => {
    if (feature.isLocked) {
      navigate('/auth');
    } else {
      navigate(feature.path);
    }
  };

  return (
    <div className="min-h-screen">
    
      <div className="relative overflow-hidden">
        
        <div className="absolute inset-0 animated-bg opacity-10"></div>
        
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
              Welcome to{' '}
              <span className="text-primary-600 dark:text-primary-400">
                ScanClean
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Transform your documents with our powerful suite of scanning, OCR, and enhancement tools. 
              Clean, enhance, and digitize with professional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              )}
              <Link
                to="/image-enhancer"
                className="btn-secondary text-lg px-8 py-4"
              >
                Try Image Enhancer
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our suite of tools designed to streamline your document processing workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  isLocked={feature.isLocked}
                  onClick={() => handleFeatureClick(feature)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who trust ScanClean for their document processing needs.
          </p>
          {!isAuthenticated && (
            <Link
              to="/auth"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <span>Start Free Today</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;