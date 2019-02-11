"use strict";

let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", function(data) {
  console.log("CHANGECOLOR IS ", changeColor);
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value", data.color);
});

changeColor.onclick = function(element) {
  console.log("CLICKED");
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.body.style.backgroundColor = "' + color + '";'
    });
  });
};
