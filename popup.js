async function fetchAndDisplayInterests() {
  try {
    const userInterests = await getUserInterests();
    const response = await fetch('http://localhost:3000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInterests }),
    });

    const data = await response.json();
    
    // Format the response text with HTML
    const formattedResponse = formatResponseText(data.response);

    // Set the formatted response to the 'interest-data' element
    document.getElementById('interest-data').innerHTML = formattedResponse;

    // Update the paragraph every 10 seconds
    setTimeout(fetchAndDisplayInterests, 10000);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function getUserInterests() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('userInterests', (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(result.userInterests);
    });
  });
}

// Function to format the response text
function formatResponseText(text) {
  // Sample formatting rules
  let formattedText = text;

  // Bold important sections
  formattedText = formattedText.replace(/(\*\*[^*]+\*\*)/g, '<b>$1</b>');
  
  // Italic for emphasis (using single asterisks, e.g., *italic* becomes <i>italic</i>)
  formattedText = formattedText.replace(/\*([^*]+)\*/g, '<i>$1</i>');
  
  // Replace numbered lists (1. item)
  formattedText = formattedText.replace(/(\d+\.\s)([^\n]+)/g, '<li><b>$1</b>$2</li>');
  
  // Wrap the list items in <ul>
  formattedText = formattedText.replace(/(<li>)/g, '<ul><li>').replace(/(<\/li>)/g, '</li></ul>');

  // Wrap the whole formatted text in a div for styling
  return `<div>${formattedText}</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('analyze-button').addEventListener('click', fetchAndDisplayInterests);
});
