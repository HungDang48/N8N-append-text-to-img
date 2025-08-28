# N8N Flow Setup Guide

## Flow Configuration

Dự án này đã được cấu hình để hoạt động với flow n8n của bạn. Dưới đây là các thông tin quan trọng:

### Webhook Configuration
- **Webhook URL**: `https://hungdang2.app.n8n.cloud/webhook/imgheadline`
- **Webhook ID**: `b7d8cb10-3b75-4b8c-b73d-b64cdefd4d70`
- **Method**: POST
- **Path**: `/imgheadline`

### Request Format
Frontend sẽ gửi request với format:
```json
{
  "email": "user@example.com",
  "keyword": "quốc tế thiếu nhi",
  "image_url": "https://res.cloudinary.com/dkccddiuv/image/upload/v1754530260/Yellow_and_Blue_qi6ydy.png"
}
```

### Environment Variables
Tạo file `.env` trong thư mục gốc với nội dung:
```env
# N8N Webhook URL
VITE_WEBHOOK_URL=https://hungdang2.app.n8n.cloud/webhook/imgheadline

# API timeout (milliseconds)
VITE_API_TIMEOUT=30000

# Debug mode
VITE_DEBUG=true
```

### Development vs Production

#### Development Mode
- Sử dụng proxy để tránh CORS issues
- Request sẽ được gửi đến `/api/webhook` (proxy)
- Proxy sẽ forward đến `https://hungdang2.app.n8n.cloud/webhook/imgheadline`

#### Production Mode
- Sử dụng trực tiếp webhook URL từ environment variable
- Không cần proxy

### Flow Steps
1. **Webhook Node**: Nhận request từ frontend
2. **Zenserp Google News**: Tìm kiếm tin tức với keyword
3. **Code Node**: Tạo signature và transformation cho Cloudinary
4. **Upload to Cloudinary**: Upload ảnh với text overlay
5. **Gmail Node**: Gửi email với ảnh đã tạo

### Testing
1. Chạy `npm run dev` để khởi động development server
2. Mở `http://localhost:5173`
3. Nhập email và keyword
4. Submit form
5. Kiểm tra email để nhận ảnh đã tạo

### Troubleshooting
- Nếu gặp CORS error, kiểm tra webhook URL có đúng không
- Nếu không nhận được email, kiểm tra Gmail credentials trong n8n
- Nếu ảnh không được tạo, kiểm tra Cloudinary API key và secret

### Notes
- Flow sử dụng font Arial cho text overlay
- Text sẽ được viết hoa và đặt ở phía trên ảnh
- Background text là màu trắng với viền đen
