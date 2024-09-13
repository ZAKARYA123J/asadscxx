// content.js
chrome.runtime.sendMessage({type: 'FETCH_DATA'}, response => {
    if (chrome.runtime.lastError) {
      console.error('Error:', chrome.runtime.lastError);
    } else {
      console.log('Response:', response);
    }
  });
  