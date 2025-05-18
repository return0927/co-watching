chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { type } = request;

  switch (type) {
    case 'tab': {
      chrome.windows.create({
          focused: true,
          url: 'indicator.html',
          type: 'popup',
          width: 600,
          height: 300,
      });
      break;
    }
  }
});
