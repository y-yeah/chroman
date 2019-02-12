"use strict";

let check = document.getElementById("check");
let text = document.getElementById("text");
let url = document.getElementById("url");
let type = document.getElementById("type");
let efType = document.getElementById("efType");
let size = document.getElementById("size");
let speed = document.getElementById("speed");
let loadTimeDOM = document.getElementById("loadTime");
const calculating = document.getElementById("calculating");
calculating.innerText = "CALCULATING...";
calculating.style.color = "red";
calculating.style.fontSize = "20px";
calculating.style.fontWeight = "bold italic";

chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
  const link = document.createElement("a");
  link.setAttribute("href", tabs[0].url);
  link.innerText = tabs[0].url;
  const boldUrl = document.createElement("b");
  url.innerText = "";
  boldUrl.innerText = "URL: ";
  url.appendChild(boldUrl);
  url.appendChild(link);

  if (navigator.connection.type !== undefined) {
    const typeKey = document.createElement("b");
    const typeVal = document.createElement("p");
    type.innerText = "";
    typeKey.innerText = "Network type: ";
    typeVal.innerText =
      navigator.connection.type[0].toUpperCase() +
      navigator.connection.type.slice(1);
    type.appendChild(typeKey);
    type.appendChild(typeVal);

    const efTypeKey = document.createElement("b");
    const efTypeVal = document.createElement("p");
    efType.innerText = "";
    efTypeKey.innerText = "Network type: ";
    efTypeVal.innerText = navigator.connection.effectiveType.toUpperCase();
    efType.appendChild(efTypeKey);
    efType.appendChild(efTypeVal);
  } else {
    type.innerHTML = "";
    efType.innerHTML = "";
  }

  let start = Date.now();
  let end;
  fetch(tabs[0].url)
    .then(res => {
      return res.body;
    })
    .then(body => {
      const reader = body.getReader();
      return reader;
    })
    .then(reader => {
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              return pump();
            });
          }
        }
      });
    })
    .then(stream => new Response(stream))
    .then(response => response.blob())
    .then(blob => {
      console.log(URL.createObjectURL(blob));
      end = Date.now();
      let sec = (end - start) / 1000;

      setTimeout(() => {
        const conSpeedKey = document.createElement("b");
        const conSpeedVal = document.createElement("p");
        speed.innerText = "";
        conSpeedKey.innerText = "Connection speed when you loaded this page: ";
        conSpeedVal.innerText = navigator.connection.downlink + " Mbps";
        speed.appendChild(conSpeedKey);
        speed.appendChild(conSpeedVal);

        calculating.innerText = "";
        loadTimeDOM.innerText = "";
        const loadTimeKey = document.createElement("b");
        const loadTimeVal = document.createElement("p");
        loadTimeKey.innerText = "Loading time: ";
        loadTimeVal.innerText = sec.toString() + " sec(s)";
        loadTimeDOM.appendChild(loadTimeKey);
        loadTimeDOM.appendChild(loadTimeVal);

        const sizeKey = document.createElement("b");
        const sizeVal = document.createElement("p");
        size.innerText = "";
        sizeKey.innerText = "Approximate total page size: ";
        const byte = ((sec * Number(navigator.connection.downlink)) / 8) * 1000;
        sizeVal.innerText = byte + " Byte(s)";
        size.appendChild(sizeKey);
        size.appendChild(sizeVal);

        const eng = {
          lang: "en-US",
          rate: 1.0
        };

        if (Number(navigator.connection.downlink) <= 5) {
          if (sec > 1) {
            chrome.tts.speak(
              "Man, this webpage is so heavy and your Internet is so slow...I can't believe how you have survived in this modern society.",
              eng
            );
          } else if (sec > 0.5 && sec < 1) {
            chrome.tts.speak(
              "Well, this webpage is not heavy, but... your Internet is so slow, to be honest. You should start marathon from today",
              eng
            );
          } else {
            chrome.tts.speak(
              "Thank God, your Internet is slow but this webpage is super light! You should definitely learn a lot from this webpage. Good boy Mr.webpage.",
              eng
            );
          }
        } else {
          if (sec > 1) {
            chrome.tts.speak(
              "Your Internet is fast, but this webpage is heavy. I feel sorry for your Internet, dude.",
              eng
            );
          } else if (sec > 0.5 && sec < 1) {
            chrome.tts.speak(
              "Your Internet is fast, and this webpage is not heavy. I like your Internet, because I hate weightlifting.",
              eng
            );
          } else {
            chrome.tts.speak(
              "Your Internet is fast and this webpage is super light! Save your time and do more push-ups.",
              eng
            );
          }
        }
      }, 2000);
    });
});
