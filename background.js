let isRunning = false;
let currentTabId = null;

chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create('clickButton', { periodInMinutes: 1/6 }); // Every 10 seconds
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'clickButton' && isRunning && currentTabId) {
        chrome.scripting.executeScript({
            target: { tabId: currentTabId },
            function: clickStartReview
        });
    }
});

function clickStartReview() {
    const startButton_new = document.querySelector('button[data-test="app-card-qna-qc-primary-cta"]');
    const startButton_old = document.querySelector('button[data-test="start-qna-qc-button"]');
    const startReview = document.querySelector('button[data-test="start-review"]');
    const startTrainingButton = document.querySelector('div[id="walkme-visual-design-e6c3f43f6902cda56471b1d7ac5c4b42"]');
    if (startButton_old) {
        startButton_old.click();
        if(startReview) {
            startReview.click();
        }
    } else if(startButton_new) {
        startButton_new.click();
    }
    else {
        if (startTrainingButton) {
            location.reload();
        } else {
            chrome.runtime.sendMessage({ type: 'notify' });
        }
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Automation starts
    if (message.type === 'start') {
        isRunning = true;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            currentTabId = tabs[0].id;
        });
    }
    // Automation stops 
    else if (message.type === 'stop') {
        isRunning = false;
        currentTabId = null;
    } 
    // Notification
    else if (message.type === 'notify') {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'notification.gif',
            title: 'Time for work!!',
            message: 'A new question is available!'
        });
    }
});