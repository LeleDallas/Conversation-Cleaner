document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const toggleText = document.getElementById("toggleText");

  // Function to update the toggle text based on the current state
  const updateToggleText = (isHidden) => {
    toggleText.textContent = isHidden ? "Show comments" : "Hide comments";
  };

  // Initialize the button text based on stored value
  browser.storage.sync.get(["isHidden"]).then((result) => {
    const isHidden = result.isHidden ?? false;
    updateToggleText(isHidden);
  });

  // Listen for storage changes and update the toggle text accordingly
  browser.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.isHidden) {
      updateToggleText(changes.isHidden.newValue);
    }
  });

  toggleButton.addEventListener("click", () => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browser.storage.sync.get(["isHidden"]).then((result) => {
        const newState = !result.isHidden;
        browser.storage.sync.set({ isHidden: newState }).then(() => {
          browser.tabs
            .sendMessage(tabs[0].id, { action: "toggleCSS", state: newState })
            .then((response) => {
              if (response) {
                browser.storage.sync.set({
                  isHidden: response.isHidden,
                });
                updateToggleText(newState);
              }
            })
            .catch((error) => {
              console.error("Error sending message to content script:", error);
            });
        });
      });
    });
  });
});
