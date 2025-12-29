// test-iyzico.js - iyzico sandbox test script
const http = require('http');

console.log('🧪 iyzico Sandbox Test Başlıyor...\n');

const initData = JSON.stringify({
  email: 'test@biletcepte.com',
  amount: 150,
  biletData: { id: 'test-1', nereden: 'Bursa', nereye: 'Istanbul', firma: 'Metro' },
  userName: 'Ahmet Yilmaz',
  userPhone: '05351234567'
});

const initReq = http.request({
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/payment/initiate',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const init = JSON.parse(data);
    console.log('✅ STEP 1: Payment Initiated');
    console.log('   PaymentId:', init.paymentId);
    console.log('   OrderId:', init.orderId);
    console.log('   Amount:', init.amount, 'TL\n');
    
    // Step 2: Process with iyzico test card
    const processData = JSON.stringify({
      paymentId: init.paymentId,
      cardNumber: '5528790000000008', // iyzico sandbox test card
      cardHolder: 'AHMET YILMAZ',
      expiryDate: '12/30',
      cvv: '123'
    });
    
    console.log('💳 STEP 2: Processing with iyzico...');
    console.log('   Test Card: 5528 7900 0000 0008 (Mastercard)\n');
    
    const processReq = http.request({
      hostname: '127.0.0.1',
      port: 5000,
      path: '/api/payment/process',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res2) => {
      let data2 = '';
      res2.on('data', chunk => data2 += chunk);
      res2.on('end', () => {
        const result = JSON.parse(data2);
        console.log('📋 RESULT:');
        if (result.success) {
          console.log('   ✅ SUCCESS!');
          console.log('   TransactionId:', result.transactionId);
          console.log('   OrderId:', result.orderId);
          console.log('   Amount:', result.amount, 'TL');
          console.log('   Card Last4:', result.cardLast4);
          console.log('   Message:', result.message);
        } else {
          console.log('   ❌ FAILED!');
          console.log('   Error:', result.error);
          console.log('   ErrorCode:', result.errorCode);
        }
        console.log('\n🎉 Test tamamlandı!');
        process.exit(0);
      });
    });
    
    processReq.on('error', e => {
      console.error('❌ Process Error:', e.message);
      process.exit(1);
    });
    
    processReq.write(processData);
    processReq.end();
  });
});

initReq.on('error', e => {
  console.error('❌ Initiate Error:', e.message);
  console.error('   Backend sunucusu çalışıyor mu? (npm run server)');
  process.exit(1);
});

initReq.write(initData);
initReq.end();
