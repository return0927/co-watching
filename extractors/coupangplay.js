const PLATFORM = "COUPANGPLAY";

const Selectors = Object.freeze({
  selectTitle: () => {
    const element = document.querySelector("#playerPage .title");
    return element ? element.parentElement.innerText : null;
  },
  selectTime: () => {
    const element = document.querySelector(`div[class*='TimerText_seekToLiveButton'`);
    return element ? element.innerText : null;
  },
  selectVideo: () => {
    return document.querySelector(`video.vjs-tech`);
  },
});

const params = new URLSearchParams(window.location.search);
const isGuest = !!params.get('cowatchguest');

if (!isGuest) {
  let isFirstHeartbeat = true;
  let needPaused = false;
  let isPaused = false;

  const sendSignal = () => {
    const title = Selectors.selectTitle();
    const time = Selectors.selectTime();
    const video = Selectors.selectVideo();

    if (!title || !time || !video) return;

    chrome.runtime.sendMessage({ type: 'info', data: {
      title,
      timeLabel: time,
      time: video.currentTime,
      platform: PLATFORM,
      isPlaying: !video.paused,
      url: location.protocol + "//" + location.host + location.pathname,
    }});

    if (isFirstHeartbeat && video) {
      console.log('video', video);
      isFirstHeartbeat = false;
      
      video.onpause = () => {
        console.log('video paused');
        needPaused = true;
        isPaused = false;
      }
      video.onplay = () => {
        console.log('video resumed');
        isPaused = false;
        needPaused = false;
      }
    }
  };

  setInterval(() => {
    if (needPaused) {
      sendSignal();
      needPaused = false;
      isPaused = true;
    } else if (!isPaused) {
      sendSignal();
    }
  }, 250);

  chrome.runtime.sendMessage({ type: 'tab', data: { platform: PLATFORM } }, (response) => {});
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { type } = request;
  console.log(request);

  switch (type) {
    case 'playback': {
      const { isPlaying, time, url } = request.data;
      if (location.protocol + "//" + location.host + location.pathname !== url) {
        location.href = url + "?cowatchguest=true";
        return;
      }

      const video = Selectors.selectVideo();

      if (video) {
        if (isPlaying) {
          const delta = video.currentTime - time;
          if (Math.abs(delta) > 5) {
            video.currentTime = time;
          }
          video.play();
        } else {
          video.pause();
        }
      }
      break;
    }
  }
});
