import React from 'react';
import { Lock } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, isLocked, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`card p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
        isLocked ? 'opacity-60' : ''
      }`}
    >
      <div className="relative">
        {isLocked && (
          <div className="absolute top-0 right-0 p-2">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <div className={`p-3 rounded-lg w-fit mb-4 ${
          isLocked 
            ? 'bg-gray-100 dark:bg-gray-700' 
            : 'bg-primary-100 dark:bg-primary-900/20'
        }`}>
          <Icon className={`h-8 w-8 ${
            isLocked 
              ? 'text-gray-400' 
              : 'text-primary-600 dark:text-primary-400'
          }`} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
        {isLocked && (
          <p className="text-sm text-primary-600 dark:text-primary-400 mt-3 font-medium">
            Sign in to unlock this feature
          </p>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;