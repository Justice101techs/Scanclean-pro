import React, { useState } from 'react';
import { QrCode, Download, Upload, Scan } from 'lucide-react';

const QRPage = () => {
  const [qrText, setQrText] = useState('');
  const [generatedQR, setGeneratedQR] = useState('');
  const [scannedFile, setScannedFile] = useState(null);

  const generateQR = () => {
    if (qrText.trim()) {
      
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrText)}`;
      setGeneratedQR(qrUrl);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScannedFile(file);
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            QR Code Generator & Scanner
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Generate QR codes from text or scan existing QR codes from images
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <QrCode className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generate QR Code
              </h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Text or URL
                </label>
                <textarea
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  className="input-field h-24 resize-none"
                  placeholder="Enter text or URL to generate QR code..."
                />
              </div>
              
              <button
                onClick={generateQR}
                className="btn-primary w-full"
                disabled={!qrText.trim()}
              >
                Generate QR Code
              </button>

              {generatedQR && (
                <div className="mt-6 text-center">
                  <img
                    src={generatedQR}
                    alt="Generated QR Code"
                    className="mx-auto rounded-lg shadow-lg"
                  />
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = generatedQR;
                      link.download = 'qrcode.png';
                      link.click();
                    }}
                    className="btn-secondary mt-4 inline-flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Scan className="h-6 w-6 text-secondary-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Scan QR Code
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload QR Code Image
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-secondary-500 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="qr-upload"
                  />
                  <label
                    htmlFor="qr-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Click to upload QR code image
                    </span>
                  </label>
                </div>
              </div>

              {scannedFile && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Uploaded: {scannedFile.name}
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-green-800 dark:text-green-200">
                      QR scanning functionality would be implemented here with a QR code reading library.
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

export default QRPage;