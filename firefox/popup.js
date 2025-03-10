document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const toggleText = document.getElementById("toggleText");

  // Initialize the button text based on stored value
  browser.storage.local.get(["isHidden"]).then((result) => {
    const isHidden = result.isHidden ?? false;
    toggleText.textContent = isHidden ? "Show comments" : "Hide comments";
  });

  toggleButton.addEventListener("click", () => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browser.storage.local.get(["isHidden"]).then((result) => {
        const newState = !result.isHidden;
        browser.storage.local.set({ isHidden: newState }).then(() => {
          browser.tabs
            .sendMessage(tabs[0].id, { action: "toggleCSS", state: newState })
            .then((response) => {
              browser.storage.sync.set({
                isHidden: response.isHidden,
              });
              toggleText.textContent = newState
                ? "Show comments"
                : "Hide comments";
            });
        });
      });
    });
  });
});
