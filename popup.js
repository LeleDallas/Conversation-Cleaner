document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const toggleText = document.getElementById("toggleText");

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
});
