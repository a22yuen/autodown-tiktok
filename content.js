var intervalId;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("request.start: " + request.start);
  if (request.start === "start") {
    intervalId = setInterval(() => {
      console.log("checking");
      const element = document.getElementsByClassName(
        "tiktok-o2z5xv-DivSeekBarTimeContainer"
      )[0];
      const time = element.innerText;
      const times = time.split("/");
      console.log("time " + time);
      console.log("times " + times);
      const firstTime = Date.parse("1970-01-01T00:" + times[0] + "Z");
      const secondTime = Date.parse("1970-01-01T00:" + times[1] + "Z");
      console.log("firstTime " + firstTime);
      console.log("secondTime " + secondTime);
      const timeDiff = secondTime - firstTime;
      console.log("timeDiff " + timeDiff);
      if (timeDiff <= 1000) {
        console.log("pressing down key");
        setTimeout(() => {
          document
            .getElementsByClassName(
              "tiktok-4urj30-ButtonBasicButtonContainer-StyledVideoSwitch e11s2kul14"
            )[0]
            .click();
        }, 700);
      }
    }, 1000);
  } else if (request.start === "stop") {
    console.log("stopping interval");
    clearInterval(intervalId);
  }
});
