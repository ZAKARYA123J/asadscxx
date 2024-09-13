// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'FETCH_DATA') {
      // Example async operation
      fetch('https://a6b0-196-115-75-116.ngrok-free.app/api/posts')
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => {
          console.error('Fetch error:', error);
          sendResponse({ error: 'Failed to fetch data' });
        });
  
      // Return true to indicate sendResponse will be called asynchronously
      return true;
    }
  });
  