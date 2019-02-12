let contentPort = chrome.runtime.connect({
  name: "background-content"
});

chrome.runtime.sendMessage(
  {
    loadTime: performance.getEntriesByType("navigation")[0].toJSON().duration
  },
  res => {
    console.log(res);
  }
);
