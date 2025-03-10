// when open a tab, if isHidden is true, apply the forceToggle action
chrome.tabs.onCreated.addListener((tab) => {
  chrome.storage.sync.get("isHidden", (data) => {
    if (data.isHidden) {
      chrome.tabs.sendMessage(tab.id, { action: "forceToggle" });
    } else {
      chrome.tabs.sendMessage(tab.id, { action: "forceToggleOff" });
    }
  });
});

// when a tab is updated, if isHidden is true, apply the forceToggle action to all tabs
chrome.tabs.onUpdated.addListener(() => {
  chrome.storage.sync.get("isHidden", (data) => {
    if (data.isHidden) {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, { action: "forceToggle" });
        });
      });
    } else {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, { action: "forceToggleOff" });
        });
      });
    }
  });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.isHidden) {
    const isHidden = changes.isHidden.newValue;
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (isHidden) {
          chrome.tabs.sendMessage(tab.id, { action: "forceToggle" });
        } else {
          chrome.tabs.sendMessage(tab.id, { action: "forceToggleOff" });
        }
      });
    });
  }
});
