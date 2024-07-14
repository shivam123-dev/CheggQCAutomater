document.getElementById('start-button').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'start' });
    document.getElementById('start-button').textContent = "Searching Question...";
    document.getElementById('start-button').disabled = true;
});