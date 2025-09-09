import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'scanclean',
    format: async (req, file) => {
     
      const allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
      const fileExtension = file.originalname.split('.').pop().toLowerCase();
      return allowedFormats.includes(fileExtension) ? fileExtension : 'jpg';
    },
    public_id: (req, file) => {

      const timestamp = Date.now();
      const originalName = file.originalname.split('.')[0];
      return `${originalName}-${timestamp}`;
    },
  },
});


const fileFilter = (req, file, cb) => {
  
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, 
  },
});

export default upload;