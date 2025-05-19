const title = document.getElementById('title');
const time = document.getElementById('time');
const group = document.getElementById('group');

const params = new URLSearchParams(window.location.search);
const groupId = params.get('groupId');
const mode = params.get('mode');

if (!groupId) {
  alert("올바르지 않은 접근입니다. 다시 시도해주세요.");
  location.href = "/pages/index.html";
} else {
  group.textContent = "그룹 ID: " + groupId;

  if (mode === "host") {
    group.textContent += " (호스트)";
  } else if (mode === "guest") {
    group.textContent += " (게스트)";
  }
}

if (mode === "host") {
  const accessKey = localStorage.getItem("accessKey");

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { type } = request;

    switch (type) {
      case 'info': {
        const { title: newTitle, timeLabel: newTime, platform } = request.data;
        title.textContent = newTitle + " (" + platform + ")";
        time.textContent = newTime;

        window.API.signalGroup(groupId, accessKey, request.data).then();
        break;
      }
    }
  });
} else if (mode === "guest") {
  const es = new EventSource(`${window.API.baseUrl}/group/${groupId}/join`);

  es.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const {
      isPlaying,
      title: newTitle,
      timeLabel: newTime,
      time: videoTime,
      platform
    } = data;
    title.textContent = newTitle + " (" + platform + ")";
    time.textContent = newTime;

    console.log(data);
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab) {
          chrome.tabs.sendMessage(tab.id, {
            type: 'playback',
            data: data,
          }, () => {});
        }
      });
    });
  };
} else {
  alert("올바르지 않은 접근입니다. 다시 시도해주세요.");
  location.href = "/pages/index.html";
}
