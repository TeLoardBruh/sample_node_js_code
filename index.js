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

app.get("/", function(req, res) {
  res.send("Hi this is my node ChatBot");
});

// Secure Stuff
app.get("/webhook/", function(req, res) {
  if (req.query["hub.verify_token"] === "raxcyRax") {
    res.send(req.query["hub.challenge"]);
  }
  res.send("wrong token");
});

app.post("/webhook/", function(req, res) {
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

function decideMessage(sender, text1) {
  let text = text1.toString().toLowerCase();
  if (text.includes("hi")) {
    sendGreeting(sender);
  } else if (text.includes("dog")) {
    sendImageMessageDog(sender);
  } else if (text.includes("cat")) {
    sendImageMessageCat(sender);
  } else {
    sendText(sender, "Hello welcome to my service");
    sendButton(sender, "what is your fav pet ?");
  }
}
function sendGreeting(sender) {
  let messageData = {

      text: "Pick a color:",
      quick_replies: [
        {
          content_type: "text",
          title: "Red",
          payload: "testing_1",
          image_url: "http://example.com/img/red.png"
        },
        {
          content_type: "text",
          title: "Green",
          payload: "testing_2",
          image_url: "http://example.com/img/green.png"
        },

      ]
    
  };
  sendRequest(sender, messageData);
}

function sendButton(sender, text) {
  let messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: text,
        buttons: [
          {
            type: "postback",
            title: "dog",
            payload: "dog"
          },
          {
            type: "postback",
            title: "cat",
            payload: "cat"
          }
        ]
      }
    }
  };
  sendRequest(sender, messageData);
}

function sendImageMessageDog(sender) {
  let messageData = {
    attachment: {
      type: "image",
      payload: {
        url:
          "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg"
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
        url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifDWMZoCYkJUfs_3YwbMVlTdMke7RgEfOX2P_NUXBmiRp7JW_&s"
      }
    }
  };
  sendRequest(sender, messageData);
}

function sendRequest(sender, messageData) {
  request(
    {
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
    function(error, req, res) {
      if (error) {
        console.log("Sending is Error");
      } else if (req.body.error) {
        console.log("responding is Error");
      }
    }
  );
}

function sendText(sender, text) {
  let messageData = {
    text: text
  };
  sendRequest(sender, messageData);
}
app.listen(app.get("port"), function() {
  console.log(`running : port `);
});
