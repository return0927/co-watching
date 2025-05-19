const title = document.getElementById('title');
const time = document.getElementById('time');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { type } = request;

  switch (type) {
    case 'info': {
      const { title: newTitle, time: newTime, platform } = request.data;
      title.textContent = newTitle + " (" + platform + ")";
      time.textContent = newTime;
      break;
    }
  }
});
