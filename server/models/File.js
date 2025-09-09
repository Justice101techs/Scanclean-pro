import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  cloudinaryUrl: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['qr', 'ocr', 'image-enhancement'],
    required: true,
  },
  processedData: {
    type: mongoose.Schema.Types.Mixed, 
    default: {},
  },
  isProcessed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

fileSchema.index({ userId: 1, category: 1 });
fileSchema.index({ createdAt: -1 });

export default mongoose.model('File', fileSchema);