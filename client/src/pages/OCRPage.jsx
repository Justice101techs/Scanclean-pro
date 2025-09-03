import React, { useState } from 'react';
import { FileText, Upload, Download, Copy } from 'lucide-react';

const OCRPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setProcessing(true);
      setTimeout(() => {
        setExtractedText('This is a demonstration of extracted text from your uploaded image. In a real implementation, this would use an OCR service like Tesseract.js or Google Cloud Vision API to extract actual text from the image.');
        setProcessing(false);
      }, 2000);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
  };

  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([extractedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'extracted-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            OCR Text Extraction
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Extract text from images and documents with high accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Upload Document
              </h2>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary-500 transition-colors duration-200">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="ocr-upload"
                />
                <label
                  htmlFor="ocr-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="h-12 w-12 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Click to upload image or PDF
                  </span>
                  <span className="text-xs text-gray-500">
                    Supports JPG, PNG, PDF files
                  </span>
                </label>
              </div>

              {uploadedFile && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200 font-medium">
                    File uploaded: {uploadedFile.name}
                  </p>
                </div>
              )}

              {processing && (
                <div className="flex items-center space-x-2 text-primary-600">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                  <span>Processing document...</span>
                </div>
              )}
            </div>
          </div>

          
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Extracted Text
              </h2>
              {extractedText && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={downloadText}
                    className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                    title="Download as text file"
                  >
                    <Download className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              )}
            </div>

            {extractedText ? (
              <div className="space-y-4">
                <textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="input-field h-64 resize-none"
                  placeholder="Extracted text will appear here..."
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Upload a document to extract text
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OCRPage;