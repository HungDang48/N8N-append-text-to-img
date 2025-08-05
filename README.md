# N8N Image URL Upload App

A modern React TypeScript application for submitting image URLs to an N8N webhook with email validation and real-time preview.

## 🚀 Features

- **Email Validation**: Real-time email format validation using react-hook-form
- **Image URL Input**: Enter direct links to images with validation
- **URL Validation**: Checks for valid image URLs (JPG, JPEG, PNG, GIF, WebP)
- **Image Preview**: Real-time preview of images from URLs
- **URL Accessibility Check**: Verifies if the image URL is accessible
- **Form Preview**: Live preview of form data before submission
- **API Integration**: Sends data to N8N webhook with image URLs
- **Responsive Design**: Works perfectly on mobile and desktop
- **Toast Notifications**: User-friendly success/error notifications
- **Loading States**: Visual feedback during processing

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **react-hook-form** for form validation
- **axios** for HTTP requests
- **react-hot-toast** for notifications

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd n8n-append-title-to-img
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🚀 Deployment to Vercel

### **Step 1: Prepare Environment Variables**

Create a `.env` file in the root directory:
```bash
# Copy the example file
cp env.example .env

# Edit the .env file with your actual webhook URL
VITE_WEBHOOK_URL=https://your-actual-n8n-domain.com/webhook/cm
```

### **Step 2: Deploy to Vercel**

1. **Install Vercel CLI** (optional):
```bash
npm i -g vercel
```

2. **Deploy using Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `VITE_WEBHOOK_URL`: Your N8N webhook URL
     - `VITE_API_TIMEOUT`: 30000 (optional)
     - `VITE_DEBUG`: false (optional)

3. **Deploy using CLI**:
```bash
vercel --prod
```

### **Step 3: Configure Environment Variables in Vercel**

In your Vercel dashboard, go to Project Settings > Environment Variables and add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_WEBHOOK_URL` | `https://your-n8n-domain.com/webhook/cm` | Production |
| `VITE_API_TIMEOUT` | `30000` | Production (optional) |
| `VITE_DEBUG` | `false` | Production (optional) |

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/
│   ├── EmailInput.tsx      # Email input with validation
│   ├── ImageUrlInput.tsx   # Image URL input with preview
│   ├── SubmitButton.tsx    # Submit button with loading state
│   └── ConnectionTest.tsx  # Connection test component
├── services/
│   └── api.ts             # API service for webhook calls
├── config/
│   └── api.ts             # API configuration and environment variables
├── types/
│   └── index.ts           # TypeScript type definitions
├── utils/
│   └── imageUtils.ts      # Image URL validation utilities
├── App.tsx                # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles with TailwindCSS
```

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

- `VITE_WEBHOOK_URL`: Your N8N webhook URL (required)
- `VITE_API_TIMEOUT`: API timeout in milliseconds (optional, default: 30000)
- `VITE_DEBUG`: Enable debug logging (optional, default: false)

### API Endpoint

Update the webhook URL in your environment variables:

```bash
VITE_WEBHOOK_URL=https://your-actual-n8n-domain.com/webhook/cm
```

### Supported Image Formats

The application supports the following image formats:
- JPG/JPEG
- PNG
- GIF
- WebP

## 📋 API Request Format

The application sends POST requests to the webhook with the following format:

```json
{
  "email": "user@example.com",
  "image_url": "https://example.com/image.jpg"
}
```

## 🎨 Customization

### Styling

The application uses TailwindCSS. You can customize the design by modifying:

- `src/index.css` - Global styles
- Component files - Individual component styling
- `tailwind.config.ts` - TailwindCSS configuration

### Form Validation

Email validation rules are in `src/components/EmailInput.tsx`:

```typescript
{
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Please enter a valid email address'
  }
}
```

URL validation rules are in `src/utils/imageUtils.ts`:

```typescript
export const validateImageUrl = (url: string): { isValid: boolean; error?: string } => {
  // URL validation logic
}
```

## 🚨 Error Handling

The application handles various error scenarios:

- Invalid email format
- Invalid image URLs
- Inaccessible image URLs
- Network errors
- API response errors
- CORS errors

## 📱 Responsive Design

The application is fully responsive and works on:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🔒 Security Features

- URL format validation
- Protocol validation (HTTP/HTTPS only)
- Image format validation
- Input sanitization
- CORS-compliant API calls

## 🚀 Performance Optimizations

- Code splitting with manual chunks
- Minified production build
- Optimized bundle size
- Lazy loading of components

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub. 