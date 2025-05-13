document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const toggleText = document.getElementById("toggleText");
  const expandAll = document.getElementById("expandAll"); // New button

  // Initialize the button text based on stored value
  chrome.storage.local.get(["isHidden"], (result) => {
    const isHidden = result.isHidden ?? false;
    toggleText.textContent = isHidden ? "Show comments" : "Hide comments";
  });

  toggleButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.storage.local.get(["isHidden"], (result) => {
        const newState = !result.isHidden;
        chrome.storage.local.set({ isHidden: newState }, () => {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "toggleCSS", state: newState },
            (response) => {
              chrome.storage.sync.set({
                isHidden: response.isHidden,
              });
              toggleText.textContent = newState
                ? "Show comments"
                : "Hide comments";
            }
          );
        });
      });
    });
  });

  expandAll.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;

        // Start the recursive process of clicking "Load more…" until it's done
        clickLoadMoreUntilDone(tabId);
      }
    });
  });
});

function clickLoadMoreUntilDone(tabId) {
  console.log("Sending 'clickLoadMore' message to content script.");

  chrome.tabs.sendMessage(tabId, { action: "clickLoadMore" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error sending message:", chrome.runtime.lastError.message);
      return;
    }

    if (response?.hasMore) {
      console.log("More 'Load more…' buttons found. Clicking again...");
      // Wait for a short time before trying to click again, to ensure content has loaded
      setTimeout(() => {
        clickLoadMoreUntilDone(tabId);
      }, 2000); // 2 seconds to allow for content to load
    } else {
      console.log("No more 'Load more…' buttons found.");
    }
  });
}
