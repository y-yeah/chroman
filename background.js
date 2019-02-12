"use strict";
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.create({ url: "https://" + tab.url });
  });
});
