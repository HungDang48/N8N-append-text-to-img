# N8N Headline Image Generator

A modern React TypeScript application for generating headline images using N8N workflow with Cloudinary integration. The app allows users to input keywords and receive generated images with text overlays via email.

## 🚀 Features

- **Email Validation**: Real-time email format validation using react-hook-form
- **Keyword Input**: Enter keywords to search for news headlines
- **News Integration**: Uses Zenserp API to fetch Google News headlines
- **Image Generation**: Creates headline images with text overlays using Cloudinary
- **Email Delivery**: Sends generated images directly to user's email
- **Responsive Design**: Works perfectly on mobile and desktop
- **Toast Notifications**: User-friendly success/error notifications
- **Loading States**: Visual feedback during processing
- **N8N Workflow Integration**: Seamless integration with N8N automation platform

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

## 🔧 N8N Workflow Setup

This application is designed to work with a specific N8N workflow that:

1. **Receives webhook data** (email, keyword, image_url)
2. **Fetches news headlines** using Zenserp Google News API
3. **Generates image transformations** with text overlays using Cloudinary
4. **Uploads processed images** to Cloudinary
5. **Sends results via email** using Gmail integration

### **Webhook Configuration**
- **URL**: `https://hungdang3.app.n8n.cloud/webhook/Creating Headline Image`
- **Method**: POST
- **Path**: `/imgheadline`

### **Request Format**
```json
{
  "email": "user@example.com",
  "keyword": "quốc tế thiếu nhi",
  "image_url": "https://res.cloudinary.com/dkccddiuv/image/upload/v1754530260/Yellow_and_Blue_qi6ydy.png"
}
```

For detailed N8N flow setup instructions, see [N8N_FLOW_SETUP.md](./N8N_FLOW_SETUP.md).

## 🚀 Deployment to Vercel

### **Step 1: Prepare Environment Variables**

Create a `.env` file in the root directory:
```bash
# Copy the example file
cp env.example .env

# Edit the .env file with your actual webhook URL
VITE_WEBHOOK_URL=https://hungdang3.app.n8n.cloud/webhook/Creating Headline Image
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

## 🧪 Testing

### **Test N8N Flow**
You can test the N8N workflow directly using the provided test script:

```bash
# Install axios if not already installed
npm install axios

# Run the test script
node test-n8n-flow.js
```

This will send a test request to your N8N webhook and display the response.

### **Manual Testing**
1. Start the development server: `npm run dev`
2. Open `http://localhost:5173`
3. Enter a valid email and keyword
4. Submit the form
5. Check your email for the generated image

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