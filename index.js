"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
let token =
  "EAAjUYnJpZAMoBAOBemtbwdjsZAbg906HrasCLyjpn1xcEg7583VvE6T470ZCLShZBLAGDS25LsstcyxlS248lH2jYzeAZBt09k1Gcuu41JEkv53BKtcKnHRZAcnhUtSSy68tZBi7LsdxQpcfrXSx90QC5i7d7ngKbfTZAogZAjZCXQwQZDZD";
app.set("port", process.env.PORT || 5000);

// Allow us to process the data
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Routes
// =====================================================================================================================================

app.get("/", function (req, res) {
  res.send("Hi this is my node ChatBot");
});
// =====================================================================================================================================

// =====================================================================================================================================
// webhook 
app.get("/webhook/", function (req, res) {
  if (req.query["hub.verify_token"] === "raxcyRax") {
    res.send(req.query["hub.challenge"]);
  }
  res.send("wrong token");
});

app.post("/webhook/", function (req, res) {
  let messaging_event = req.body.entry[0].messaging;
  for (let i = 0; i < messaging_event.length; i++) {
    let event = messaging_event[i];
    let sender = event.sender.id;
    if (event.message && event.message.text) {
      let text = event.message.text;
      // sendText(sender, "Text Echo : " + text.substring(0,100))
      decideMessage(sender, text);
    }
    if (event.postback) {
      let text = JSON.stringify(event.postback);
      decideMessage(sender, text);
      continue;
    }
  }
  res.sendStatus(200);
});
// =====================================================================================================================================


// =====================================================================================================================================
// main structure of chatbot 
function decideMessage(sender, text1) {
  let text = text1.toString().toLowerCase();
  if (text.includes("hi")) {
    sendGreeting_quick_reply(sender);
  } else if (text.includes("shop here")) {
    sendImageMessageGenericShopHere(sender);
    sendButton(sender);
  } else if (text.includes("check price")) {
    sendImageMessageCat(sender);
    sendButton(sender, 'hello 2');
  } else if (text.includes('go back')) {
    sendGreeting_quick_reply(sender);
  } else {
    // sendText(sender, "Hello welcome to my service");
    // sendButton(sender, "what is your fav pet ?");
    sendGreeting_quick_reply(sender);

  }
}
// =====================================================================================================================================

// =====================================================================================================================================
// quick replies on opening chat 
function sendGreeting_quick_reply(sender) {
  let messageData = {
    text: "What can we help you with ?",
    quick_replies: [{
        content_type: "text",
        title: "shop here",
        payload: "testing_1",
      },
      {
        content_type: "text",
        title: "check price",
        payload: "testing_2",
      }
    ]

  };
  sendRequest(sender, messageData);
}
// =====================================================================================================================================

// =====================================================================================================================================
// send button
function sendButton(sender) {
  let messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: text,
        buttons: [{
          type: "postback",
          title: "go back",
          payload: "go_back"
        }]
      }
    }
  };
  sendRequest(sender, messageData);
}
// =====================================================================================================================================


// =====================================================================================================================================
// send image function
function sendImageMessageGenericShopHere(sender) {
  let messageData = {
    attachment: {
      type: "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
            "title": "Welcome!",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCLCDHqP6Xcs6HiSH86dnEkm3J4timN0eExjdnqwddr45OgET&s",
            "subtitle": "We have the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "compact",
            },
            "buttons": [{
              "type": "web_url",
              "url": "https://petersfancybrownhats.com",
              "title": "View Website"
            }, {
              "type": "postback",
              "title": "Start Chatting",
              "payload": "DEVELOPER_DEFINED_PAYLOAD"
            }, ],
            buttons: [{
              type: "postback",
              title: "go back",
              payload: "go_back"
            }]

          },
          {
            "title": "Welcome!",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLOO-8_NOdPnb1CNo4qp6GrCjHsZ1L8gDjdCIHmp6T_ibdNNjc&s",
            "subtitle": "We have the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "compact",
            },
            "buttons": [{
              "type": "web_url",
              "url": "https://petersfancybrownhats.com",
              "title": "View Website"
            }, {
              "type": "postback",
              "title": "Start Chatting",
              "payload": "DEVELOPER_DEFINED_PAYLOAD"
            }, ],
            buttons: [{
              type: "postback",
              title: "go back",
              payload: "go_back"
            }]
          },
          {
            "title": "Welcome!",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0v1fSi6IQBrgcHXbDGSrc8yTrFLnzQzo_hwkXd6xPvPZ7V9p5A&s",
            "subtitle": "We have the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "compact",
            },
            "buttons": [{
              "type": "web_url",
              "url": "https://petersfancybrownhats.com",
              "title": "View Website"
            }, {
              "type": "postback",
              "title": "Start Chatting",
              "payload": "DEVELOPER_DEFINED_PAYLOAD"
            }, ],
            buttons: [{
              type: "postback",
              title: "go back",
              payload: "go_back"
            }]
          },
        ]
      }
    }
  };
  sendRequest(sender, messageData);
}

function sendImageMessageCat(sender) {
  let messageData = {
    attachment: {
      type: "image",
      payload: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifDWMZoCYkJUfs_3YwbMVlTdMke7RgEfOX2P_NUXBmiRp7JW_&s"
      }
    }
  };
  sendRequest(sender, messageData);
}
// =====================================================================================================================================



// send Request Function
// =====================================================================================================================================
function sendRequest(sender, messageData) {
  request({
      url: "https://graph.facebook.com/v5.0/me/messages",
      qs: {
        access_token: token
      },
      method: "POST",
      json: {
        recipient: {
          id: sender
        },
        message: messageData
      }
    },
    function (error, req, res) {
      if (error) {
        console.log("Sending is Error");
      } else if (req.body.error) {
        console.log("responding is Error");
      }
    }
  );
}
// =====================================================================================================================================

function sendText(sender, text) {
  let messageData = {
    text: text
  };
  sendRequest(sender, messageData);
}
app.listen(app.get("port"), function () {
  console.log(`running : port `);
});