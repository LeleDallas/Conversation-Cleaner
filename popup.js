document.getElementById('toggleButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleCSS"}, (response) => {
            console.log(response.status);
        });
    });
});