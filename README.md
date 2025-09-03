
# ScanClean - Smart Document Processing Platform

A modern full-stack web application for document scanning, OCR text extraction, QR code generation/scanning, and AI-powered image enhancement.

## 🚀 Features

### For Everyone
- **Image Enhancer**: AI-powered image enhancement with adjustable settings
- Modern, responsive design with dark/light mode toggle
- Professional UI with smooth animations and micro-interactions

### For Registered Users
- **QR Scanner**: Generate and scan QR codes instantly
- **OCR Scanner**: Extract text from images and documents
- **File Management**: Secure cloud storage with Cloudinary
- **Dashboard**: Track usage statistics and manage files
- **Authentication**: Secure login with JWT and optional Google Sign-In

## 🛠 Tech Stack

### Frontend (/client)
- **React 18** with Vite for fast development
- **React Router** for client-side routing
- **Tailwind CSS** for modern, responsive styling
- **Lucide React** for beautiful icons
- **Axios** for API communication

### Backend (/server)
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for secure authentication
- **Cloudinary** for file storage and management
- **Helmet** & **CORS** for security
- **Rate limiting** for API protection

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB account or local MongoDB installation
- Cloudinary account for file uploads

### 1. Clone and Install Dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `/server` directory with your configuration:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000
```

### 3. Running the Application

#### Development Mode

**Start the backend server:**
```bash
cd server
npm run dev
```
Server will run on http://localhost:5000

**Start the frontend client:**
```bash
cd client
npm run dev
```
Client will run on http://localhost:3000

#### Production Mode

**Build the client:**
```bash
cd client
npm run build
```

**Start the server:**
```bash
cd server
npm start
```

## 🚀 Deployment

### Frontend (Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `dist` folder to Netlify
3. Update environment variables in Netlify dashboard

### Backend (Render/Railway/Heroku)
1. Push your code to a Git repository
2. Connect your repository to your hosting platform
3. Set environment variables in the hosting dashboard
4. Deploy the server from the `/server` directory

## 📁 Project Structure

```
scanclean/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   ├── package.json
│   └── vite.config.js
├── server/                  # Node.js backend
│   ├── config/             # Database & external service configs
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── package.json
│   └── server.js
├── .env.example            # Environment variables template
└── README.md
```

## 🔐 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcryptjs
- **Rate Limiting** to prevent API abuse
- **Input Validation** using express-validator
- **CORS Configuration** for secure cross-origin requests
- **Helmet** for security headers

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### File Management
- `POST /api/files/upload` - Upload file
- `GET /api/files/list` - Get user files
- `DELETE /api/files/delete/:id` - Delete file
- `POST /api/files/process/:id` - Process file (OCR, QR, etc.)

## 🎨 Design System

The application uses a comprehensive design system with:
- **6 color ramps** (primary, secondary, accent, success, warning, error)
- **Consistent 8px spacing** system
- **Typography scale** with proper line heights
- **Component library** with reusable patterns
- **Dark/light mode** support throughout

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please check the troubleshooting section or open an issue in the repository.

---

Made with ❤️ by the ScanClean team