"use strict";

// let loadTime = new Date(window.performance.timeOrigin);
// confirm("Loading time was " + loadTime);

console.log("THIS IS CHROME STORAGE ", chrome.storage);

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    console.log("INSIDE DECLARATIVE");
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: "chrome://extensions/" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
