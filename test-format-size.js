// Simple test script for formatSize function
// This is just for testing and will not be part of the final codebase

function formatSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Test cases
const testCases = [
  0,                  // 0 Bytes
  500,                // 500 Bytes
  1023,               // 1023 Bytes
  1024,               // 1 KB
  1536,               // 1.5 KB
  1048576,            // 1 MB
  1572864,            // 1.5 MB
  1073741824,         // 1 GB
  20 * 1024 * 1024    // 20 MB
];

// Run tests
console.log("Testing formatSize function:");
testCases.forEach(bytes => {
  console.log(`${bytes} bytes = ${formatSize(bytes)}`);
});