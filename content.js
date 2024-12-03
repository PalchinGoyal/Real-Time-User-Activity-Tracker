let userInterests = {};

function extractKeywords(element) {
  let textContent = element.textContent || "";
  let keywords = textContent.match(/\b(\w+)\b/g);
  if (keywords) {
    keywords = keywords.map(keyword => keyword.toLowerCase());
  }
  return keywords ? keywords.slice(0, 10) : [];
}

function updateUserInterests(keywords) {
  keywords.forEach(keyword => {
    if (userInterests[keyword]) {
      userInterests[keyword] += 1;
    } else {
      userInterests[keyword] = 1;
    }
  });
  console.log('Updated Interests:', userInterests);
}

document.addEventListener('click', (event) => {
  let keywords = extractKeywords(event.target);
  console.log('Click Keywords:', keywords);
  updateUserInterests(keywords);
  chrome.storage.local.set({ userInterests });
});

document.addEventListener('mouseover', (event) => {
  let keywords = extractKeywords(event.target);
  console.log('Hover Keywords:', keywords);
  updateUserInterests(keywords);
  chrome.storage.local.set({ userInterests });
});

document.addEventListener('scroll', () => {
  let keywords = extractKeywords(document.body);
  console.log('Scroll Keywords:', keywords);
  updateUserInterests(keywords);
  chrome.storage.local.set({ userInterests });
});

document.addEventListener('input', (event) => {
  let keywords = extractKeywords(event.target.value || "");
  console.log('Input Keywords:', keywords);
  updateUserInterests(keywords);
  chrome.storage.local.set({ userInterests });
});

document.addEventListener('keydown', (event) => {
  let target = event.target;
  if (target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'textarea') {
    let keywords = extractKeywords(target.value || "");
    console.log('Keydown Keywords:', keywords);
    updateUserInterests(keywords);
    chrome.storage.local.set({ userInterests });
  }
});

setInterval(() => {
  chrome.storage.local.set({ userInterests }, () => {
    console.log('Interests Data Updated:', userInterests);
    console.log(userInterests);
  });
}, 10000);


// setInterval(() => {
//   chrome.storage.local.set({ userInterests });
//   console.log('Interests Data Updated:', userInterests);
//   console.log(userInterests);
// }, 10000);