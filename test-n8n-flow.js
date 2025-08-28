// Test script for N8N Flow
// Run with: node test-n8n-flow.js

const axios = require('axios');

const WEBHOOK_URL = 'https://hungdang2.app.n8n.cloud/webhook/imgheadline';

const testData = {
  email: 'test@example.com',
  keyword: 'quốc tế thiếu nhi',
  image_url: 'https://res.cloudinary.com/dkccddiuv/image/upload/v1754530260/Yellow_and_Blue_qi6ydy.png'
};

async function testN8NFlow() {
  console.log('🧪 Testing N8N Flow...');
  console.log('📤 Sending request to:', WEBHOOK_URL);
  console.log('📋 Data:', JSON.stringify(testData, null, 2));
  
  try {
    const response = await axios.post(WEBHOOK_URL, testData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000
    });
    
    console.log('✅ Success!');
    console.log('📊 Status:', response.status);
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.log('❌ Error occurred:');
    
    if (error.response) {
      console.log('📊 Status:', error.response.status);
      console.log('📄 Response:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.log('🌐 Network Error:', error.message);
    } else {
      console.log('💥 Error:', error.message);
    }
  }
}

// Run test
testN8NFlow();
