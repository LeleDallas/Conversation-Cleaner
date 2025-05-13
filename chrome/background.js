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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "clickLoadMore") {
    // Select all buttons with the class 'ajax-pagination-btn'
    const loadMoreButtons = document.querySelectorAll(
      "button.ajax-pagination-btn"
    );

    // Filter buttons with the text "Load more…"
    const loadMoreButtonsFiltered = Array.from(loadMoreButtons).filter(
      (button) => button.textContent.trim() === "Load more…"
    );

    // Click each "Load more…" button
    loadMoreButtonsFiltered.forEach((button) => button.click());

    // Respond with whether there are more buttons to click
    sendResponse({ hasMore: loadMoreButtonsFiltered.length > 0 });
  }
});
