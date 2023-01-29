chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

let intervalId;
// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  console.log("hello " + tab.id);
  // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === "ON" ? "OFF" : "ON";
  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (nextState === "ON") {
    console.log("starting interval");
    // Send a message to the content script to start the interval
    console.log("querying tabs");
    const response = await chrome.tabs.sendMessage(tab.id, {
      start: "start",
    });
    console.log("response: " + response);
  } else if (nextState === "OFF") {
    console.log("stopping interval");
    // Send a message to the content script to stop the interval
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { start: "stop" });
    });
  }
});
