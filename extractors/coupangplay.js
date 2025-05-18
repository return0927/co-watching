const PLATFORM = "쿠팡플레이";

const Selectors = Object.freeze({
  selectTitle: () => {
    const element = document.querySelector("#playerPage .title");
    return element ? element.parentElement.innerText : null;
  },
  selectTime: () => {
    const element = document.querySelector(`div[class*='TimerText_seekToLiveButton'`);
    return element ? element.innerText : null;
  },
});

let isFirstHeartbeat = true;

setInterval(() => {
  const title = Selectors.selectTitle();
  const time = Selectors.selectTime();

  if (title && time) {
    chrome.runtime.sendMessage({ type: 'info', data: { title, time, platform: PLATFORM } }, (response) => {});
  }
}, 250);


chrome.runtime.sendMessage({ type: 'tab', data: { platform: PLATFORM } }, (response) => {});
