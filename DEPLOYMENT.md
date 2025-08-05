# 🚀 Hướng dẫn Deploy lên Vercel

## ✅ Kiểm tra trước khi deploy

### **1. Build Test**
```bash
npm run build
```
✅ Build thành công - tất cả files đã sẵn sàng

### **2. Files quan trọng đã được tạo:**
- ✅ `vercel.json` - Cấu hình Vercel
- ✅ `env.example` - Template environment variables
- ✅ `src/types/vite-env.d.ts` - TypeScript declarations
- ✅ `src/config/api.ts` - API configuration
- ✅ `src/services/api.ts` - API service với error handling

## 🚀 Deploy lên Vercel

### **Bước 1: Chuẩn bị Repository**

1. **Push code lên GitHub:**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. **Đảm bảo repository public hoặc Vercel có access**

### **Bước 2: Deploy qua Vercel Dashboard**

1. **Truy cập [vercel.com](https://vercel.com)**
2. **Sign in với GitHub account**
3. **Click "New Project"**
4. **Import repository từ GitHub**
5. **Cấu hình project:**
   - Framework Preset: `Vite`
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)

### **Bước 3: Cấu hình Environment Variables**

Trong Vercel Dashboard > Project Settings > Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_WEBHOOK_URL` | `https://your-actual-n8n-domain.com/webhook/cm` | Production |
| `VITE_API_TIMEOUT` | `30000` | Production (optional) |
| `VITE_DEBUG` | `false` | Production (optional) |

### **Bước 4: Deploy**

1. **Click "Deploy"**
2. **Chờ build hoàn thành (2-3 phút)**
3. **Kiểm tra deployment URL**

## 🔧 Deploy qua Vercel CLI

### **Bước 1: Cài đặt Vercel CLI**
```bash
npm i -g vercel
```

### **Bước 2: Login và Deploy**
```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### **Bước 3: Cấu hình Environment Variables**
```bash
# Set environment variables
vercel env add VITE_WEBHOOK_URL production
vercel env add VITE_API_TIMEOUT production
vercel env add VITE_DEBUG production
```

## 🧪 Test sau khi Deploy

### **1. Kiểm tra ứng dụng hoạt động**
- Mở URL deployment
- Kiểm tra form load thành công
- Test email validation

### **2. Test kết nối API**
- Nhập email hợp lệ
- Nhập URL ảnh hợp lệ
- Click "Test Connection"
- Kiểm tra response

### **3. Test form submission**
- Submit form với dữ liệu hợp lệ
- Kiểm tra toast notifications
- Xem response data

## 🔍 Troubleshooting

### **Lỗi Build Failed**
```bash
# Kiểm tra locally
npm run build

# Kiểm tra TypeScript
npx tsc --noEmit
```

### **Lỗi Environment Variables**
- Kiểm tra variables trong Vercel Dashboard
- Đảm bảo `VITE_WEBHOOK_URL` được set
- Redeploy sau khi thay đổi variables

### **Lỗi CORS trong Production**
- Kiểm tra N8N webhook có CORS headers không
- Test webhook trực tiếp với Postman
- Cấu hình CORS trên N8N nếu cần

### **Lỗi API Connection**
- Kiểm tra webhook URL đúng
- Test với curl:
```bash
curl -X POST https://your-n8n-domain.com/webhook/cm \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","image_url":"https://example.com/image.jpg"}'
```

## 📊 Performance Monitoring

### **Vercel Analytics**
- Enable Vercel Analytics trong dashboard
- Monitor performance metrics
- Track user interactions

### **Error Tracking**
- Monitor build logs
- Check function logs
- Set up error alerts

## 🔄 Continuous Deployment

### **Automatic Deploys**
- Mỗi push lên `main` branch sẽ trigger deploy
- Preview deployments cho pull requests
- Automatic rollback nếu có lỗi

### **Environment Management**
- Production: `main` branch
- Preview: `develop` branch (optional)
- Staging: custom branch (optional)

## 📱 Domain Configuration

### **Custom Domain**
1. Vercel Dashboard > Domains
2. Add custom domain
3. Configure DNS records
4. Enable HTTPS

### **Subdomain Setup**
- `app.yourdomain.com`
- `api.yourdomain.com` (nếu cần)

## 🔒 Security Checklist

- ✅ HTTPS enabled
- ✅ Environment variables secured
- ✅ CORS properly configured
- ✅ Input validation working
- ✅ Error handling implemented

## 📞 Support

### **Vercel Support**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### **Project Issues**
- Check deployment logs
- Review build output
- Test locally first

## 🎉 Deployment Complete!

Sau khi deploy thành công:
1. ✅ Test tất cả functionality
2. ✅ Monitor performance
3. ✅ Set up monitoring
4. ✅ Share URL với team 