document.getElementById('start-button').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'start' });
    document.getElementById('start-button').textContent = "Searching...";
    document.getElementById('start-button').disabled = true;
});