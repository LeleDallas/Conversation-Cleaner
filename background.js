chrome.runtime.onInstalled.addListener(function () {
  alert("Conversation Cleaner extension installed.");
  chrome.tabs.create({
    url: "https://google.com",
    active: true,
  });
  return false;
});
