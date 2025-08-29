# 🔧 Cập nhật Vercel Deployment

## ✅ Đã cập nhật với URL thực tế

### **URL N8N thực tế:**
```
https://hungdang3.app.n8n.cloud/webhook/Creating Headline Image
```

## 🚀 Cách cập nhật Vercel

### **Bước 1: Cập nhật Environment Variables**

1. **Truy cập Vercel Dashboard:**
   - Mở [vercel.com](https://vercel.com)
   - Chọn project của bạn

2. **Vào Settings → Environment Variables:**
   - Click "Add New"
   - Variable Name: `VITE_WEBHOOK_URL`
   - Value: `https://hungdang3.app.n8n.cloud/webhook/Creating Headline Image`
   - Environment: Production
   - Click "Save"

### **Bước 2: Redeploy**

1. **Tự động redeploy:**
   - Push code mới lên GitHub
   - Vercel sẽ tự động redeploy

2. **Manual redeploy:**
   - Vercel Dashboard → Deployments
   - Click "Redeploy" trên deployment mới nhất

### **Bước 3: Test sau khi cập nhật**

1. **Kiểm tra WebhookConfig component:**
   - Mở ứng dụng đã deploy
   - Xem phần "Webhook Configuration"
   - Đảm bảo hiển thị "✅ Set" cho Environment Variable

2. **Test Connection:**
   - Click "Test Connection"
   - Đảm bảo kết nối thành công

## 🔍 Debug nếu vẫn có lỗi

### **Kiểm tra Environment Variables:**
```bash
# Trong Vercel Dashboard
Settings → Environment Variables
```

Đảm bảo có:
- `VITE_WEBHOOK_URL` = `https://hungdang3.app.n8n.cloud/webhook/Creating Headline Image`

### **Test N8N Webhook trực tiếp:**
```bash
curl -X POST https://hungdang3.app.n8n.cloud/webhook/Creating Headline Image \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","keyword":"test keyword"}'
```

### **Kiểm tra N8N Workflow:**
1. Mở N8N dashboard
2. Kiểm tra workflow có active không
3. Test webhook node trực tiếp

## 📊 Monitoring

### **Vercel Logs:**
- Vercel Dashboard → Functions
- Xem logs của deployment

### **Browser Console:**
- F12 → Console
- Xem network requests
- Kiểm tra CORS errors

## 🎯 Expected Results

### **Sau khi cập nhật thành công:**
- ✅ WebhookConfig hiển thị "✅ Set"
- ✅ Test Connection thành công
- ✅ Form submission hoạt động
- ✅ Toast notifications hiển thị

### **URL sẽ được sử dụng:**
- Development: `/api/webhook` (proxy)
- Production: `https://hungdang3.app.n8n.cloud/webhook/Creating Headline Image`

## 🚨 Troubleshooting

### **Nếu vẫn "❌ Not Set":**
1. Kiểm tra environment variable đã được set chưa
2. Redeploy project
3. Clear browser cache

### **Nếu "Network Error":**
1. Kiểm tra N8N server có online không
2. Test webhook URL trực tiếp
3. Kiểm tra CORS settings

### **Nếu "CORS Error":**
1. N8N webhook cần có CORS headers
2. Hoặc sử dụng proxy (đã cấu hình)

## 📞 Support

Nếu vẫn gặp vấn đề:
1. Chụp màn hình WebhookConfig component
2. Copy console logs
3. Kiểm tra Vercel deployment logs
4. Test N8N webhook trực tiếp 