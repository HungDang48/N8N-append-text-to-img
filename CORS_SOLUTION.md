# 🔧 Giải pháp cho vấn đề CORS

## 🚨 Vấn đề CORS là gì?

CORS (Cross-Origin Resource Sharing) là chính sách bảo mật của trình duyệt ngăn chặn các request từ domain khác. Khi bạn chạy ứng dụng React ở `localhost:5173` và cố gắng gửi request đến `https://your-n8n-domain.com`, trình duyệt sẽ chặn request này.

## ✅ Các giải pháp đã được triển khai:

### 1. **Proxy Development Server**
- Đã cấu hình Vite proxy trong `vite.config.ts`
- Trong development, request sẽ đi qua `/api/webhook` thay vì trực tiếp
- Proxy sẽ forward request đến N8N webhook

### 2. **Cấu hình API linh hoạt**
- File `src/config/api.ts` quản lý URL theo môi trường
- Development: sử dụng proxy
- Production: sử dụng URL trực tiếp

### 3. **Error Handling nâng cao**
- Xử lý lỗi CORS cụ thể
- Hiển thị thông báo lỗi rõ ràng
- Component test kết nối để debug

## 🛠️ Cách sử dụng:

### **Bước 1: Kiểm tra kết nối**
1. Mở ứng dụng tại `http://localhost:5173`
2. Cuộn xuống phần "Connection Test"
3. Nhấn "Test Connection" để kiểm tra

### **Bước 2: Cập nhật URL webhook**
Chỉnh sửa file `src/config/api.ts`:
```typescript
PRODUCTION_WEBHOOK_URL: 'https://your-actual-n8n-domain.com/webhook/cm',
```

### **Bước 3: Cập nhật proxy target**
Chỉnh sửa file `vite.config.ts`:
```typescript
target: 'https://your-actual-n8n-domain.com',
```

## 🔍 Debug thông tin:

### **Console Logs**
Mở Developer Tools (F12) và xem tab Console để thấy:
- URL đang được gọi
- Response từ server
- Lỗi chi tiết nếu có

### **Network Tab**
Trong Developer Tools > Network tab:
- Xem request được gửi
- Kiểm tra headers
- Xem response status

## 🚀 Các bước tiếp theo:

### **Nếu vẫn gặp lỗi CORS:**

1. **Kiểm tra N8N webhook:**
   - Đảm bảo webhook URL đúng
   - Kiểm tra N8N có đang chạy không
   - Test webhook bằng Postman hoặc curl

2. **Cấu hình CORS trên N8N (nếu có thể):**
   ```javascript
   // Trong N8N webhook node
   const response = {
     statusCode: 200,
     headers: {
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': 'POST, OPTIONS',
       'Access-Control-Allow-Headers': 'Content-Type'
     },
     body: JSON.stringify(data)
   };
   ```

3. **Sử dụng CORS proxy (tạm thời):**
   ```typescript
   // Trong src/config/api.ts
   PRODUCTION_WEBHOOK_URL: 'https://cors-anywhere.herokuapp.com/https://your-n8n-domain.com/webhook/cm',
   ```

## 📋 Test Cases:

### **Test 1: Connection Test**
- Nhấn "Test Connection" button
- Xem kết quả hiển thị

### **Test 2: Form Submission**
- Nhập email hợp lệ
- Nhập URL ảnh hợp lệ
- Submit form
- Xem response

### **Test 3: Error Handling**
- Thử với URL không hợp lệ
- Thử với email không hợp lệ
- Xem thông báo lỗi

## 🔧 Troubleshooting:

### **Lỗi "Network Error"**
- Kiểm tra internet connection
- Kiểm tra N8N server có online không
- Kiểm tra URL webhook có đúng không

### **Lỗi "CORS Error"**
- Sử dụng proxy (đã cấu hình)
- Kiểm tra N8N CORS settings
- Test với Postman trước

### **Lỗi "404 Not Found"**
- Kiểm tra webhook URL có đúng không
- Kiểm tra N8N workflow có active không
- Test webhook trực tiếp

## 📞 Hỗ trợ:

Nếu vẫn gặp vấn đề, hãy:
1. Chụp màn hình lỗi
2. Copy console logs
3. Kiểm tra Network tab
4. Cung cấp thông tin chi tiết 