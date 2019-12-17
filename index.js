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
    attachment: {
      type: "template",
        elements: [
          {
            title: "greeting",
            type: "quick",
            text: "Welcome to Kia! Choose your language",
            answer_1: "English",
            payload_1: "en_lang",
            answer_2: "ភាសាខ្មែរ",
            payload_2: "kh_lang"
          },
          {
            title: "kh_lang",
            type: "att",
            block_1_title: "រថយន្ត",
            block_1_subtitle: "",
            block_1_image_url: "http://penhwonders.com/bot/kia/vehicles.jpg",
            block_1_button_1_title: "ជ្រើសរើស",
            block_1_button_1_type: "postback",
            block_1_button_1_payload: "vehicles_kh",
            block_2_title: "សេវាកម្ម",
            block_2_subtitle: "",
            block_2_image_url: "http://penhwonders.com/bot/kia/services.JPG",
            block_2_button_1_title: "ជ្រើសរើស",
            block_2_button_1_type: "postback",
            block_2_button_1_payload: "services_kh",
            block_3_title: "FAQ",
            block_3_subtitle: "",
            block_3_image_url: "http://penhwonders.com/bot/kia/faq.jpg",
            block_3_button_1_title: "ជ្រើសរើស",
            block_3_button_1_type: "web_url",
            block_3_button_1_payload:
              "http://penhwonders.com/bot/kia/kia_faq.html",
            block_4_title: "ទាក់ទង​មក​ពួក​យើង",
            block_4_subtitle: "Kia Motors Cambodia",
            block_4_image_url:
              "http://penhwonders.com/bot/kia/location_kia.jpg",
            block_4_button_1_title: "ទីតាំង",
            block_4_button_1_type: "web_url",
            block_4_button_1_payload: "https://goo.gl/maps/QV7A9sGYYPq",
            block_4_button_2_title: "ព័ត៌មានលម្អិតទំនាក់ទំនង",
            block_4_button_2_type: "postback",
            block_4_button_2_payload: "contact_details_kh",
            block_5_title: "មតិអ្នកប្រើ",
            block_5_subtitle: "",
            block_5_image_url: "http://penhwonders.com/bot/kia/kia_logo.jpg",
            block_5_button_1_title: "ជ្រើសរើស",
            block_5_button_1_type: "postback",
            block_5_button_1_payload: "feedback_kh"
          },

          {
            title: "vehicles_kh",
            type: "att",
            block_1_title: "Grand Carnival Full Option ",
            block_1_subtitle: "",
            block_1_image_url:
              "http://penhwonders.com/bot/kia/grand_carnival.jpg",
            block_1_button_1_title: "លក្ខណៈពិសេស & តម្លៃ",
            block_1_button_1_type: "postback",
            block_1_button_1_payload: "grand_carnival_full_kh",
            block_1_button_2_title: "សាកល្បងថាស",
            block_1_button_2_type: "postback",
            block_1_button_2_payload: "test_drive_kh",
            block_1_button_3_title: "លេខទូរសព្ទទំនាក់ទំនង",
            block_1_button_3_type: "phone_number",
            block_1_button_3_payload: "+855023999555",
            block_2_title: "KIA Carnival Mid Option ",
            block_2_subtitle: "",
            block_2_image_url:
              "http://penhwonders.com/bot/kia/grand_carnival_mid.jpg",
            block_2_button_1_title: "លក្ខណៈពិសេស & តម្លៃ",
            block_2_button_1_type: "postback",
            block_2_button_1_payload: "grand_carnival_mid_kh",
            block_2_button_2_title: "សាកល្បងថាស",
            block_2_button_2_type: "postback",
            block_2_button_2_payload: "test_drive_kh",
            block_2_button_3_title: "លេខទូរសព្ទទំនាក់ទំនង",
            block_2_button_3_type: "phone_number",
            block_2_button_3_payload: "+855023999555",
            block_3_title: "Sportage",
            block_3_subtitle: "",
            block_3_image_url: "http://penhwonders.com/bot/kia/sportage.jpg",
            block_3_button_1_title: "លក្ខណៈពិសេស & តម្លៃ",
            block_3_button_1_type: "postback",
            block_3_button_1_payload: "sportage_kh",
            block_3_button_2_title: "សាកល្បងថាស",
            block_3_button_2_type: "postback",
            block_3_button_2_payload: "test_drive_kh",
            block_3_button_3_title: "លេខទូរសព្ទទំនាក់ទំនង",
            block_3_button_3_type: "phone_number",
            block_3_button_3_payload: "+855023999555",
            block_4_title: "Sorento",
            block_4_subtitle: "",
            block_4_image_url: "http://penhwonders.com/bot/kia/sorento.JPG",
            block_4_button_1_title: "លក្ខណៈពិសេស & តម្លៃ",
            block_4_button_1_type: "postback",
            block_4_button_1_payload: "sorento_kh",
            block_4_button_2_title: "សាកល្បងថាស",
            block_4_button_2_type: "postback",
            block_4_button_2_payload: "test_drive_kh",
            block_4_button_3_title: "លេខទូរសព្ទទំនាក់ទំនង",
            block_4_button_3_type: "phone_number",
            block_4_button_3_payload: "+855023999555",
            block_5_title: "K3000s-Cargo",
            block_5_subtitle: "",
            block_5_image_url: "http://penhwonders.com/bot/kia/cargo.jpg",
            block_5_button_1_title: "លក្ខណៈពិសេស & តម្លៃ",
            block_5_button_1_type: "postback",
            block_5_button_1_payload: "cargo_kh",
            block_5_button_2_title: "សាកល្បងថាស",
            block_5_button_2_type: "postback",
            block_5_button_2_payload: "test_drive_kh",
            block_5_button_3_title: "លេខទូរសព្ទទំនាក់ទំនង",
            block_5_button_3_type: "phone_number",
            block_5_button_3_payload: "+855023999555",
            block_6_title: "Picanto",
            block_6_subtitle: "",
            block_6_image_url: "http://penhwonders.com/bot/kia/picanto1.jpg",
            block_6_button_1_title: "លក្ខណៈពិសេស & តម្លៃ",
            block_6_button_1_type: "postback",
            block_6_button_1_payload: "picanto_kh",
            block_6_button_2_title: "សាកល្បងថាស",
            block_6_button_2_type: "postback",
            block_6_button_2_payload: "test_drive_kh",
            block_6_button_3_title: "លេខទូរសព្ទទំនាក់ទំនង",
            block_6_button_3_type: "phone_number",
            block_6_button_3_payload: "+855023999555"
          },
          {
            title: "grand_carnival_full_kh",
            type: "serialize",
            items: ["test_drive_phone_number_kh"],
            end_title: "grand_carnival_full_quick_kh"
          },
          {
            title: "grand_carnival_full_quick_kh",
            type: "quick",
            text:
              "លក្ខណៈ​ពិសេស:\nម៉ាស៊ីន:  3299cc. 6 cyl. សាំង\nការបញ្ជូន:  6ល្បឿន,លេខ ស្វ័យប្រវត្តិ\nកុនសោ ស្វ័យប្រវត្តិ (W/Buttom Start)\nFuel economy:  8.5L/100km\nកោឣី:  11\nDual power sliding doors with Atomatic Tailgate , Safety Power Window\nតម្លៃ:  US$66,800\nFinancing & Trad in service available",
            answer_1: "រថយន្តច្រើនទៀត",
            payload_1: "vehicles_kh",
            answer_2: "Main Menu",
            payload_2: "kh_lang"
          },
          {
            title: "grand_carnival_mid_kh",
            type: "serialize",
            items: ["test_drive_phone_number_kh"],
            end_title: "grand_carnival_mid_quick_kh"
          },
          {
            title: "grand_carnival_mid_quick_kh",
            type: "quick",
            text:
              "លក្ខណៈ​ពិសេស:\nម៉ាស៊ីន:  3299cc. 6 cyl. សាំង\nការបញ្ជូន:  6ល្បឿន, លេខ ស្វ័យប្រវត្តិ\nកុនសោ ស្វ័យប្រវត្តិ(W/Buttom Start)\nFuel economy:  8.5L/100km\nកោឣី:      11\nDual power sliding doors with Safety Power Window\nតម្លៃ:  US$57,800\nFinancing & Trad in service available",
            answer_1: "រថយន្តច្រើនទៀត",
            payload_1: "vehicles_kh",
            answer_2: "Main Menu",
            payload_2: "kh_lang"
          },
          {
            title: "sportage_kh",
            type: "serialize",
            items: ["test_drive_phone_number_kh"],
            end_title: "sportage_quick_kh"
          },
          {
            title: "sportage_quick_kh",
            type: "quick",
            text:
              "លក្ខណៈ​ពិសេស:\nម៉ាស៊ីន:  1,198cc. 4 cyl. សាំង\nការបញ្ជូន:  6ល្បឿន, លេខ ស្វ័យប្រវត្តិ\nកុនសោ ស្វ័យប្រវត្តិ(W/Buttom Start)\nFuel economy:  8L/100km\nកោឣី:  5\nAWD and GT-Line \nតម្លៃ:  US$57,800\nFinancing & Trad in service available",
            answer_1: "រថយន្តច្រើនទៀត",
            payload_1: "vehicles_kh",
            answer_2: "Main Menu",
            payload_2: "kh_lang"
          },
          {
            title: "sorento_kh",
            type: "serialize",
            items: ["test_drive_phone_number_kh"],
            end_title: "sorento_quick_kh"
          },
          {
            title: "sorento_quick_kh",
            type: "quick",
            text:
              "លក្ខណៈ​ពិសេស:\nម៉ាស៊ីន:  2,199cc. 4Cyl. ម៉ាស៊ូត \nការបញ្ជូន:  6ល្បឿន, លេខ ស្វ័យប្រវត្តិ \nកុនសោ ស្វ័យប្រវត្តិ(W/Buttom Start)\nFuel economy:  8L/100km\nកោឣី:  07\nAWD and GT-Line \nតម្លៃ:  US$79,800\nFinancing & Trad in service available",
            answer_1: "រថយន្តច្រើនទៀត",
            payload_1: "vehicles_kh",
            answer_2: "Main Menu",
            payload_2: "kh_lang"
          },
          {
            title: "cargo_kh",
            type: "serialize",
            items: ["test_drive_phone_number_kh"],
            end_title: "cargo_quick_kh"
          },
          {
            title: "cargo_quick_kh",
            type: "quick",
            text:
              "លក្ខណៈ​ពិសេស:\nម៉ាស៊ីន:  2956cc.OHV 2valve cylinders \n5-ល្បឿន, លេខដៃ        \nKeyless entry\nFuel economy:  8L/100km\nFront Fog Lamps\nTinted Glass\nតម្លៃ: US$34,800\nFinancing & Trad in service available",
            answer_1: "រថយន្តច្រើនទៀត",
            payload_1: "vehicles_kh",
            answer_2: "Main Menu",
            payload_2: "kh_lang"
          },
          {
            title: "picanto_kh",
            type: "serialize",
            items: ["test_drive_phone_number_kh"],
            end_title: "picanto_quick_kh"
          },
          {
            title: "picanto_quick_kh",
            type: "quick",
            text:
              "លក្ខណៈ​ពិសេស:\nម៉ាស៊ីន:  998cc. 3Cyl ម៉ាស៊ូត \nការបញ្ជូន: 6ល្បឿន, លេខ ស្វ័យប្រវត្តិ \nកុនសោ ស្វ័យប្រវត្តិ(W/Buttom Start)\nFuel economy:  4L/100km\nកោឣី:  05\nABS, Back Camera with sensors\nតម្លៃ:  US$25,800\nFinancing & Trad in service available",
            answer_1: "រថយន្តច្រើនទៀត",
            payload_1: "vehicles_kh",
            answer_2: "Main Menu",
            payload_2: "kh_lang"
          },
          {
            title: "services_kh",
            type: "serialize",
            items: ["phone_number_kh"],
            end_title: "end_services_kh"
          },
          {
            title: "test_drive_kh",
            type: "serialize",
            items: ["test_drive_phone_number_kh"],
            end_title: "end_test_drive_kh"
          },
          {
            title: "phone_number_kh",
            type: "text",
            content: "សូមផ្តល់លេខទូរស័ព្ទរបស់អ្នកយើងនឹងទាក់ទងអ្នកបន្តិចទៀត"
          },
          {
            title: "test_drive_phone_number_kh",
            type: "text",
            content: "សូមផ្តល់លេខទូរស័ព្ទរបស់អ្នក"
          },
          {
            title: "end_services_kh",
            type: "quick",
            text: "អរគុណ,  យើងនឹងទាក់ទងអ្នកបន្តិចទៀត!",
            answer_1: "Main Menu",
            payload_1: "kh_lang"
          },
          {
            title: "end_test_drive_kh",
            type: "quick",
            text: "អរគុណ, យើងនឹងទាក់ទងអ្នកបន្តិចទៀត!",
            answer_1: "Main Menu",
            payload_1: "kh_lang"
          },
          {
            title: "contact_details_kh",
            type: "quick",
            text:
              "បន្ទប់តាំង : (+855) 95 999 799 / (+855) 23 999 555 \nការិយាល័យ : (+855) 95 666 057 / (+855) 23 999 555 / (+855) 95 666 025 \nEmail : info@anaautogroup.com \nWebsite : www.kiamotors.com.kh ",
            answer_1: "Main Menu",
            payload_1: "en_lang"
          },
          {
            title: "feedback_kh",
            type: "serialize",
            items: ["feedback_message"],
            end_title: "end_feedback_kh"
          },
          {
            title: "feedback_message_kh",
            type: "text",
            content: "Please leave your message"
          },
          {
            title: "end_feedback_kh",
            type: "quick",
            text: "អរគុណ, យើងនឹងទាក់ទងអ្នកបន្តិចទៀត!",
            answer_1: "Main Menu",
            payload_1: "kh_lang"
          }
        ]
      
    }
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
