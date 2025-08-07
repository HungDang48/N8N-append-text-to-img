# 📋 JSON Format - N8N Webhook

## 🎯 JSON được gửi khi nhấn "Generate Headline Image"

### **Format:**
```json
{
  "email": "hungdang040801@gmail.com",
  "keyword": "quốc tế thiếu nhi",
  "image_url": "https://res.cloudinary.com/dkccddiuv/image/upload/v1754530260/Yellow_and_Blue_qi6ydy.png"
}
```

## 🔍 **Chi tiết từng field:**

### **1. `email` (string)**
- **Mô tả:** Email người dùng
- **Ví dụ:** `"hungdang040801@gmail.com"`
- **Validation:** Phải là email hợp lệ
- **Required:** ✅ Yes

### **2. `keyword` (string)**
- **Mô tả:** Từ khóa để tạo headline image
- **Ví dụ:** `"quốc tế thiếu nhi"`
- **Validation:** 2-100 ký tự
- **Required:** ✅ Yes

### **3. `image_url` (string) - FIXED**
- **Mô tả:** URL ảnh cố định (không do user nhập)
- **Giá trị:** `"https://res.cloudinary.com/dkccddiuv/image/upload/v1754530260/Yellow_and_Blue_qi6ydy.png"`
- **Required:** ✅ Yes (tự động gửi)

## 🚀 **Request Details:**

### **HTTP Method:** `POST`
### **URL:** `https://hungdang1.app.n8n.cloud/webhook/imgheadline`
### **Headers:**
```http
Content-Type: application/json
Accept: application/json
```

### **Body:**
```json
{
  "email": "hungdang040801@gmail.com",
  "keyword": "quốc tế thiếu nhi",
  "image_url": "https://res.cloudinary.com/dkccddiuv/image/upload/v1754530260/Yellow_and_Blue_qi6ydy.png"
}
```

## 📝 **Ví dụ thực tế:**

### **Khi user nhập:**
- **Email:** `hungdang040801@gmail.com`
- **Keyword:** `quốc tế thiếu nhi`

### **JSON sẽ được gửi:**
```json
{
  "email": "hungdang040801@gmail.com",
  "keyword": "quốc tế thiếu nhi",
  "image_url": "https://res.cloudinary.com/dkccddiuv/image/upload/v1754530260/Yellow_and_Blue_qi6ydy.png"
}
```

## ✅ **Validation trước khi gửi:**

1. **Email validation:** Phải là email hợp lệ
2. **Keyword validation:** 2-100 ký tự
3. **Form validation:** Email và keyword phải có giá trị
4. **Connection test:** Kiểm tra kết nối trước khi submit

## 🔧 **Code thực hiện việc này:**

```typescript
// Trong src/services/api.ts
const FIXED_IMAGE_URL = 'https://res.cloudinary.com/dkccddiuv/image/upload/v1754530260/Yellow_and_Blue_qi6ydy.png';

export const uploadKeyword = async (email: string, keyword: string): Promise<ApiResponse> => {
  const response = await axios.post(getApiUrl(), {
    email,
    keyword,
    image_url: FIXED_IMAGE_URL // URL cố định
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    timeout: 30000,
  });
  // ...
};
```

## 🎯 **Form Fields trong UI:**

1. **Email Input:** Nhập email người dùng
2. **Keyword Input:** Nhập từ khóa + preview ảnh cố định
3. **Image URL:** Không có input - tự động gửi URL cố định

## 📊 **Test Data:**

### **Connection Test:**
```json
{
  "email": "test@example.com",
  "keyword": "test keyword",
  "image_url": "https://res.cloudinary.com/dkccddiuv/image/upload/v1754530260/Yellow_and_Blue_qi6ydy.png"
}
```

## 🎯 **Điểm khác biệt:**

- **Không có input cho Image URL** - URL được cố định trong code
- **User chỉ nhập email và keyword**
- **Image URL luôn được gửi với giá trị cố định**
- **Preview ảnh hiển thị URL cố định**

N8N webhook của bạn sẽ nhận được JSON với format này và có thể xử lý để tạo headline image với email, keyword và URL ảnh cố định!
