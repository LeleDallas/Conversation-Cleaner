document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const offLabel = document.getElementById('offLabel');
    const onLabel = document.getElementById('onLabel');

    // Initialize the labels based on the switch state
    updateLabels(toggleSwitch.checked);

    toggleSwitch.addEventListener('change', (event) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "toggleCSS"}, (response) => {
                console.log(response.status);
                updateLabels(event.target.checked);
            });
        });
    });

    function updateLabels(isChecked) {
        if (isChecked) {
            offLabel.style.color = '#ccc';
            onLabel.style.color = '#000';
        } else {
            offLabel.style.color = '#000';
            onLabel.style.color = '#ccc';
        }
    }
});