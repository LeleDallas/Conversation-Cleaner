// when open a tab, if isHidden is true, apply the forceToggle action
browser.tabs.onCreated.addListener((tab) => {
  browser.storage.sync.get("isHidden").then((data) => {
    if (data.isHidden) {
      browser.tabs.sendMessage(tab.id, { action: "forceToggle" });
    } else {
      browser.tabs.sendMessage(tab.id, { action: "forceToggleOff" });
    }
  });
});

// when a tab is updated, if isHidden is true, apply the forceToggle action to all tabs
browser.tabs.onUpdated.addListener(() => {
  browser.storage.sync.get("isHidden").then((data) => {
    if (data.isHidden) {
      browser.tabs.query({}).then((tabs) => {
        tabs.forEach((tab) => {
          browser.tabs.sendMessage(tab.id, { action: "forceToggle" });
        });
      });
    } else {
      browser.tabs.query({}).then((tabs) => {
        tabs.forEach((tab) => {
          browser.tabs.sendMessage(tab.id, { action: "forceToggleOff" });
        });
      });
    }
  });
});

browser.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.isHidden) {
    const isHidden = changes.isHidden.newValue;
    browser.tabs.query({}).then((tabs) => {
      tabs.forEach((tab) => {
        if (isHidden) {
          browser.tabs.sendMessage(tab.id, { action: "forceToggle" });
        } else {
          browser.tabs.sendMessage(tab.id, { action: "forceToggleOff" });
        }
      });
    });
  }
});