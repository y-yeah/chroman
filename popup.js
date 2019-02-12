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
    conSpeedVal.innerText = navigator.connection.downlink + " Mbps";
    speed.appendChild(conSpeedKey);
    speed.appendChild(conSpeedVal);

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
          const byte =
            ((sec * Number(navigator.connection.downlink)) / 8) * 1000;
          sizeVal.innerText = byte + " Byte(s)";
          size.appendChild(sizeKey);
          size.appendChild(sizeVal);

          if (Number(navigator.connection.downlink) <= 5) {
            if (sec > 1) {
              chrome.tts.speak(
                "This webpage is heavy and your Internet is slow...",
                {
                  lang: "en-US",
                  rate: 1.0
                }
              );
            } else if (sec > 0.5 && sec < 1) {
              chrome.tts.speak(
                "This webpage is not heavy, but your Internet is slow.",
                {
                  lang: "en-US",
                  rate: 1.0
                }
              );
            } else {
              chrome.tts.speak(
                "Thank God, your Internet is slow but this webpage is super light!",
                {
                  lang: "en-US",
                  rate: 1.0
                }
              );
            }
          } else {
            if (sec > 1) {
              chrome.tts.speak(
                "Your Internet is fast, but this webpage is heavy.",
                {
                  lang: "en-US",
                  rate: 1.0
                }
              );
            } else if (sec > 0.5 && sec < 1) {
              chrome.tts.speak(
                "Your Internet is fast, and this webpage is not heavy.",
                {
                  lang: "en-US",
                  rate: 1.0
                }
              );
            } else {
              chrome.tts.speak(
                "Your Internet is fast and this webpage is super light!",
                {
                  lang: "en-US",
                  rate: 1.0
                }
              );
            }
          }

          chrome.storage.sync.set({ isClicked: true });
        }, 2000);
      });
  });
};
