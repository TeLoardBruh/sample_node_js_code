'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')


const app = express()
PORT = 8080
let token = 'EAAjUYnJpZAMoBAOBemtbwdjsZAbg906HrasCLyjpn1xcEg7583VvE6T470ZCLShZBLAGDS25LsstcyxlS248lH2jYzeAZBt09k1Gcuu41JEkv53BKtcKnHRZAcnhUtSSy68tZBi7LsdxQpcfrXSx90QC5i7d7ngKbfTZAogZAjZCXQwQZDZD'
app.set('port', (process.env.PORT || 5000))

// Allow us to process the data 
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// Routes 

app.get('/', function (req, res) {
    res.send("Hi this is my node ChatBot")
})

// Secure Stuff
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === "raxcyRax") {
        res.send(req.query['hub.challenge'])
    }
    res.send("wrong token")
})

app.post('/webhook/', function (req, res) {
    let messaging_event = req.body.entry[0].messaging;
    for (let i = 0 ; i < messaging_event.length; i++){
        let event = messaging_event[i];
        let sender = event.sender.id
        if(event.message && event.message.text){
            let text = event.message.text;
            sendText(sender, "Text Echo : " + text.substring(0,100))
        }
    }
    res.sendStatus(200);
})

function sendText(sender, text){
    let messageData = {text : text};
    request({
        url: 'https://graph.facebook.com/v5.0/me/messages',
        qs: {access_token : token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData
        }
    }), function(error, req,res){
        if(error){
            console.log("Sending is Error");
        }
        else if(req.body.error){
            console.log("responding is Error");
        }
    }
}
app.listen(app.get('port'), function(){
    console.log(`listenning to ${PORT}`);
})