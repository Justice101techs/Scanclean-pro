import File from '../models/File.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Upload file
// @route   POST /api/files/upload
// @access  Private
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const { category = 'image-enhancement' } = req.body;

    // Create file record in database
    const file = await File.create({
      userId: req.user.id,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      cloudinaryUrl: req.file.path,
      cloudinaryId: req.file.filename,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      category,
    });

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: file._id,
        originalName: file.originalName,
        url: file.cloudinaryUrl,
        size: file.fileSize,
        type: file.fileType,
        category: file.category,
        uploadedAt: file.createdAt,
      },
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
    });
  }
};

// @desc    Get user files
// @route   GET /api/files/list
// @access  Private
export const getFiles = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    
    const query = { userId: req.user.id };
    if (category) {
      query.category = category;
    }

    const files = await File.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalFiles = await File.countDocuments(query);

    res.json({
      success: true,
      files: files.map(file => ({
        id: file._id,
        originalName: file.originalName,
        url: file.cloudinaryUrl,
        size: file.fileSize,
        type: file.fileType,
        category: file.category,
        isProcessed: file.isProcessed,
        processedData: file.processedData,
        uploadedAt: file.createdAt,
      })),
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalFiles / limit),
        totalFiles,
        hasNext: page * limit < totalFiles,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching files',
    });
  }
};

// @desc    Delete file
// @route   DELETE /api/files/delete/:id
// @access  Private
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(file.cloudinaryId);
    } catch (cloudinaryError) {
      console.error('Error deleting from Cloudinary:', cloudinaryError);
      // Continue with database deletion even if Cloudinary fails
    }

    // Delete from database
    await File.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting file',
    });
  }
};

// @desc    Process file (OCR, QR scanning, etc.)
// @route   POST /api/files/process/:id
// @access  Private
export const processFile = async (req, res) => {
  try {
    const { processingType, options = {} } = req.body;
    
    const file = await File.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Simulate processing based on type
    let processedData = {};
    
    switch (processingType) {
      case 'ocr':
        processedData = {
          extractedText: 'This is simulated OCR text extraction. In production, this would use a real OCR service.',
          confidence: 0.95,
          language: 'en',
        };
        break;
      case 'qr':
        processedData = {
          qrData: 'https://example.com',
          format: 'URL',
          valid: true,
        };
        break;
      case 'enhance':
        processedData = {
          enhanced: true,
          improvements: ['brightness', 'contrast', 'sharpness'],
          enhancedUrl: file.cloudinaryUrl,
        };
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid processing type',
        });
    }

    // Update file with processed data
    file.processedData = processedData;
    file.isProcessed = true;
    await file.save();

    res.json({
      success: true,
      message: 'File processed successfully',
      processedData,
    });
  } catch (error) {
    console.error('Process file error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing file',
    });
  }
};