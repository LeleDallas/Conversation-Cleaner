function sendMessageToTab(tabId, message) {
  browser.tabs.sendMessage(tabId, message).catch((error) => {
    console.error(`Error sending message to tab ${tabId}:`, error);
  });
}

// when open a tab, if isHidden is true, apply the forceToggle action
browser.tabs.onCreated.addListener((tab) => {
  browser.storage.sync.get("isHidden").then((data) => {
    if (data.isHidden) {
      sendMessageToTab(tab.id, { action: "forceToggle" });
    } else {
      sendMessageToTab(tab.id, { action: "forceToggleOff" });
    }
  });
});

// when a tab is updated, if isHidden is true, apply the forceToggle action to all tabs
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    browser.storage.sync.get("isHidden").then((data) => {
      if (data.isHidden) {
        sendMessageToTab(tabId, { action: "forceToggle" });
      } else {
        sendMessageToTab(tabId, { action: "forceToggleOff" });
      }
    });
  }
});

browser.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.isHidden) {
    const isHidden = changes.isHidden.newValue;
    browser.tabs.query({}).then((tabs) => {
      tabs.forEach((tab) => {
        if (isHidden) {
          sendMessageToTab(tab.id, { action: "forceToggle" });
        } else {
          sendMessageToTab(tab.id, { action: "forceToggleOff" });
        }
      });
    });
  }
});