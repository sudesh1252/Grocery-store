// Load Testing Script for Shree Grocery Store
// Tests API endpoints with concurrent requests

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
const TEST_USER = {
  email: 'admin@shreegrocery.com',
  password: 'admin123'
};

let authToken = '';
let testResults = {
  passed: 0,
  failed: 0,
  totalTime: 0,
  tests: []
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Helper function to log with colors
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Helper function to measure time
function measureTime(startTime) {
  return Date.now() - startTime;
}

// Test 1: Login Performance
async function testLogin(iterations = 10) {
  log('\n=== Testing Login Performance ===', 'cyan');
  const results = [];
  
  for (let i = 0; i < iterations; i++) {
    const startTime = Date.now();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, TEST_USER);
      const duration = measureTime(startTime);
      
      if (response.data.success && response.data.token) {
        authToken = response.data.token;
        results.push({ success: true, duration });
        log(`✓ Login ${i + 1}: ${duration}ms`, 'green');
      } else {
        results.push({ success: false, duration });
        log(`✗ Login ${i + 1}: Failed`, 'red');
      }
    } catch (error) {
      const duration = measureTime(startTime);
      results.push({ success: false, duration, error: error.message });
      log(`✗ Login ${i + 1}: ${error.message}`, 'red');
    }
  }
  
  const avgTime = results.reduce((sum, r) => sum + r.duration, 0) / results.length;
  const successRate = (results.filter(r => r.success).length / results.length) * 100;
  
  log(`\nAverage Response Time: ${avgTime.toFixed(2)}ms`, 'yellow');
  log(`Success Rate: ${successRate.toFixed(2)}%`, successRate === 100 ? 'green' : 'red');
  
  testResults.tests.push({
    name: 'Login Performance',
    avgTime,
    successRate,
    iterations
  });
  
  return successRate === 100;
}

// Test 2: Concurrent Requests
async function testConcurrentRequests(endpoint, count = 50) {
  log(`\n=== Testing Concurrent Requests (${count} requests) ===`, 'cyan');
  log(`Endpoint: GET ${endpoint}`, 'blue');
  
  const startTime = Date.now();
  const promises = [];
  
  for (let i = 0; i < count; i++) {
    promises.push(
      axios.get(`${API_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      }).catch(err => ({ error: err.message }))
    );
  }
  
  const results = await Promise.all(promises);
  const totalTime = measureTime(startTime);
  
  const successful = results.filter(r => !r.error).length;
  const failed = results.filter(r => r.error).length;
  const successRate = (successful / count) * 100;
  
  log(`\nTotal Time: ${totalTime}ms`, 'yellow');
  log(`Successful: ${successful}/${count}`, 'green');
  log(`Failed: ${failed}/${count}`, failed > 0 ? 'red' : 'green');
  log(`Success Rate: ${successRate.toFixed(2)}%`, successRate === 100 ? 'green' : 'red');
  log(`Requests per second: ${(count / (totalTime / 1000)).toFixed(2)}`, 'yellow');
  
  testResults.tests.push({
    name: `Concurrent ${endpoint}`,
    totalTime,
    successful,
    failed,
    successRate,
    rps: count / (totalTime / 1000)
  });
  
  return successRate >= 95;
}

// Main test runner
async function runAllTests() {
  log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
  log('║     SHREE GROCERY STORE - LOAD & STRESS TESTING      ║', 'cyan');
  log('╚════════════════════════════════════════════════════════╝', 'cyan');
  
  const overallStartTime = Date.now();
  
  try {
    const loginTest = await testLogin(10);
    testResults.passed += loginTest ? 1 : 0;
    testResults.failed += loginTest ? 0 : 1;
    
    const concurrentTest1 = await testConcurrentRequests('/inventory', 50);
    testResults.passed += concurrentTest1 ? 1 : 0;
    testResults.failed += concurrentTest1 ? 0 : 1;
    
    const concurrentTest2 = await testConcurrentRequests('/invoices', 50);
    testResults.passed += concurrentTest2 ? 1 : 0;
    testResults.failed += concurrentTest2 ? 0 : 1;
    
  } catch (error) {
    log(`\n✗ Fatal Error: ${error.message}`, 'red');
  }
  
  testResults.totalTime = measureTime(overallStartTime);
  
  log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
  log('║                    TEST SUMMARY                        ║', 'cyan');
  log('╚════════════════════════════════════════════════════════╝', 'cyan');
  
  log(`\nTotal Tests: ${testResults.passed + testResults.failed}`, 'blue');
  log(`Passed: ${testResults.passed}`, 'green');
  log(`Failed: ${testResults.failed}`, testResults.failed === 0 ? 'green' : 'red');
  log(`Total Time: ${(testResults.totalTime / 1000).toFixed(2)} seconds`, 'yellow');
  
  const overallSuccess = testResults.failed === 0;
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(overallSuccess ? '✓ ALL TESTS PASSED!' : '✗ SOME TESTS FAILED', overallSuccess ? 'green' : 'red');
  log('='.repeat(60), 'cyan');
}

runAllTests().catch(error => {
  log(`\n✗ Test Suite Failed: ${error.message}`, 'red');
  process.exit(1);
});
