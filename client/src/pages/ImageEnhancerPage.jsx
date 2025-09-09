import React, { useState } from 'react';
import { Sparkles, Upload, Download, Sliders, RotateCcw } from 'lucide-react';

const ImageEnhancerPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [settings, setSettings] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sharpness: 100,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setEnhancedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const enhanceImage = () => {
    if (uploadedImage) {
      setProcessing(true);
      setTimeout(() => {
        setEnhancedImage(uploadedImage);
        setProcessing(false);
      }, 2000);
    }
  };

  const resetSettings = () => {
    setSettings({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sharpness: 100,
    });
  };

  const downloadImage = () => {
    if (enhancedImage) {
      const link = document.createElement('a');
      link.href = enhancedImage;
      link.download = 'enhanced-image.jpg';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            AI Image Enhancer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Enhance your images with professional-grade AI processing tools
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Upload className="h-6 w-6 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Upload Image
                </h2>
              </div>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 transition-colors duration-200">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Sparkles className="h-8 w-8 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Click to upload image
                  </span>
                </label>
              </div>

              {uploadedImage && (
                <button
                  onClick={enhanceImage}
                  disabled={processing}
                  className="btn-primary w-full mt-4 disabled:opacity-50"
                >
                  {processing ? 'Processing...' : 'Enhance Image'}
                </button>
              )}
            </div>


            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Sliders className="h-6 w-6 text-accent-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Settings
                  </h2>
                </div>
                <button
                  onClick={resetSettings}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  title="Reset settings"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(settings).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                      {key}: {value}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={value}
                      onChange={(e) =>
                        setSettings(prev => ({ ...prev, [key]: parseInt(e.target.value) }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="lg:col-span-2">
            <div className="card p-6 h-full">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Preview
              </h2>

              {uploadedImage ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Original
                    </h3>
                    <img
                      src={uploadedImage}
                      alt="Original"
                      className="w-full h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                  </div>


                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Enhanced
                      </h3>
                      {enhancedImage && (
                        <button
                          onClick={downloadImage}
                          className="btn-secondary text-sm inline-flex items-center space-x-1"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                      )}
                    </div>
                    {processing ? (
                      <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                          <p className="text-gray-600 dark:text-gray-400">Processing...</p>
                        </div>
                      </div>
                    ) : enhancedImage ? (
                      <img
                        src={enhancedImage}
                        alt="Enhanced"
                        className="w-full h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                        style={{
                          filter: `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%)`,
                        }}
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400">Enhanced image will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      Upload an image to start enhancing
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEnhancerPage;