import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { QrCode, FileText, Sparkles, Upload, BarChart3 } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Files Processed', value: '24', icon: Upload },
    { label: 'QR Codes Scanned', value: '12', icon: QrCode },
    { label: 'OCR Operations', value: '8', icon: FileText },
    { label: 'Images Enhanced', value: '16', icon: Sparkles },
  ];

  const quickActions = [
    {
      title: 'QR Scanner',
      description: 'Generate and scan QR codes',
      icon: QrCode,
      path: '/qr',
      color: 'bg-primary-600',
    },
    {
      title: 'OCR Scanner',
      description: 'Extract text from images',
      icon: FileText,
      path: '/ocr',
      color: 'bg-secondary-600',
    },
    {
      title: 'Image Enhancer',
      description: 'Enhance image quality',
      icon: Sparkles,
      path: '/image-enhancer',
      color: 'bg-accent-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's your activity overview and quick access to all tools.
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="card p-6 hover:scale-105 transform transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`p-3 ${action.color} rounded-lg w-fit mb-4`}>
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

       
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="p-2 bg-success-100 dark:bg-success-900/20 rounded-lg">
                <Sparkles className="h-5 w-5 text-success-600 dark:text-success-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  Enhanced document.jpg
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <QrCode className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  Generated QR code for website
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Yesterday
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;