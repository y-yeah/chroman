"use strict";

let check = document.getElementById("check");
let text = document.getElementById("text");
let url = document.getElementById("url");
let netType = document.getElementById("type");
let size = document.getElementById("size");
let speed = document.getElementById("speed");
let loadTimeDOM = document.getElementById("loadTime");

chrome.storage.sync.get("color", data => {
  check.style.backgroundColor = data.color;
  check.setAttribute("value", data.color);
});

check.onclick = async e => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    const link = document.createElement("a");
    link.setAttribute("href", tabs[0].url);
    link.innerText = tabs[0].url;
    const boldUrl = document.createElement("b");
    url.innerText = "";
    boldUrl.innerText = "URL: ";
    url.appendChild(boldUrl);
    url.appendChild(link);

    const netTypeKey = document.createElement("b");
    const netTypeVal = document.createElement("p");
    netType.innerText = "";
    netTypeKey.innerText = "Network type: ";
    netTypeVal.innerText = navigator.connection.effectiveType.toUpperCase();
    netType.appendChild(netTypeKey);
    netType.appendChild(netTypeVal);

    const conSpeedKey = document.createElement("b");
    const conSpeedVal = document.createElement("p");
    speed.innerText = "";
    conSpeedKey.innerText = "Connection speed when you loaded this page: ";
    conSpeedVal.innerText = navigator.connection.downlink + "mbps";
    speed.appendChild(conSpeedKey);
    speed.appendChild(conSpeedVal);

    let start = Date.now();
    let end;
    fetch(tabs[0].url).then(res => {
      console.log(res.body);
      end = Date.now();
      let sec = (end - start) / 1000;
      confirm(sec);
      loadTimeDOM.innerText = "";
      const loadTimeKey = document.createElement("b");
      const loadTimeVal = document.createElement("p");
      loadTimeKey.innerText = "Loading time: ";
      loadTimeVal.innerText = sec.toString() + "sec(s)";
      loadTimeDOM.appendChild(loadTimeKey);
      loadTimeDOM.appendChild(loadTimeVal);

      const sizeKey = document.createElement("b");
      const sizeVal = document.createElement("p");
      size.innerText = "";
      sizeKey.innerText = "Total page size: ";
      sizeVal.innerText =
        (sec * Number(navigator.connection.downlink)) / 8 + "Byte(s)";
      size.appendChild(sizeKey);
      size.appendChild(sizeVal);

      chrome.tts.speak("Here is the result!", {
        lang: "en-US",
        rate: 1.5
      });

      chrome.storage.sync.set({ isClicked: true });
    });

    // let loadTime = performance.getEntriesByType("navigation");
    // let miliSec = loadTime[0].toJSON().duration;
    // let sec = Number(miliSec) / 1000;
    // const loadTimeKey = document.createElement("b");
    // const loadTimeVal = document.createElement("p");
    // loadTimeDOM.innerText = "";
    // loadTimeKey.innerText = "Loading time: ";
    // loadTimeVal.innerText = sec.toString() + "sec(s)";
    // loadTimeDOM.appendChild(loadTimeKey);
    // loadTimeDOM.appendChild(loadTimeVal);

    // const sizeKey = document.createElement("b");
    // const sizeVal = document.createElement("p");
    // size.innerText = "";
    // sizeKey.innerText = "Total page size: ";
    // sizeVal.innerText =
    //   (sec * Number(navigator.connection.downlink)) / 8 + "Byte(s)";
    // size.appendChild(sizeKey);
    // size.appendChild(sizeVal);

    // chrome.tts.speak("Here is the result!", {
    //   lang: "en-US",
    //   rate: 1.5
    // });

    // chrome.storage.sync.set({ isClicked: true });
  });
};
