// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log('Mosaify extension installed');
});

// 右鍵選單
chrome.runtime.onInstalled.addListener(() => {
    console.log('Mosaify extension installed');

    chrome.contextMenus.create({
        id: 'mosaify',
        title: 'Enable Mosaify',
        contexts: ['all'],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'mosaify') {
        chrome.tabs.sendMessage(tab.id, { action: 'enableMosaify' });
    }
});

