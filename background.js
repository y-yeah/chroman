"use strict";

// chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
//   chrome.storage.local.get("cache", data => {
//     if (!data.cache) data.cache = {};
//     data.cache["tab" + sender.tab.id] = req.timing;
//     chrome.storage.local.set(data);
//   });
//   chrome.browserAction.setBadgeText({ text: req.time, tabId: sender.tab.id });
//   chrome.browserAction.setPopup({ tabId: sender.tab.id, popup: "popup.html" });
// });

// let contentPort;
// chrome.runtime.onConnect.addListener(portFrom => {
//   console.log(portFrom);
//   if (portFrom.name === "background-content") {
//     portFrom.onMessage.addListener(message => {
//       confirm(message);
//     });
//   }
// });

// chrome.tabs.sendMessage(1, { action: "GET_DIMENSION" });
chrome.runtime.onMessage.addListener(req => {
  chrome.runtime.sendMessage({ loadTime: "bingo" }, res => {});
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: "#3aa757" }, () => {
    console.log("Extention should work now");
  });
  chrome.storage.sync.set({ isClicked: false }, () => {
    console.log("isClicked is false");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    console.log("THIS IS CHROME STORAGE ", chrome.storage);
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: ["https://*/"] }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
