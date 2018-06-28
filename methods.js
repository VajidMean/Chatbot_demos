const axios = require('axios');
module.exports = class methods {

    constructor(access_token) {
        this.ACCESS_TOKEN = access_token
    }

    async sendText(text, id) {
        const json = {
            recipient: { id },
            message: { text },

        }
        const url = `https://graph.facebook.com/v2.12/me/messages?access_token=${this.ACCESS_TOKEN}`
        const res = await axios.post(url, json).catch((err, response, body) => {
            if (!err) {
                console.log('message sent !');
            } else {
                console.error("unable to send message: " + err);
            }
        })
        console.log("Facebooks says : ", json.message.text);
    }

    getMessageObject(json) {
        const message = json.entry[0].messaging[0].message.text
        let intent = '', confidence = 0;
        // if (json.entry[0].messaging[0].message.attachments) {    // for attachment
        //     console.log("Hey, User attached something ! (e.g:- Audio, video, image,etc..)");
        // } else {
        let entity_len = Object.keys(json.entry[0].messaging[0].message.nlp.entities).length;
        if (entity_len === 1) {
            console.log("Single entity !");
            // (json.entry[0].messaging[0].message.nlp.entities.intent[0]) ? intent = json.entry[0].messaging[0].message.nlp.entities.intent[0].value : intent = "Not Clear !"
            if (json.entry[0].messaging[0].message.nlp.entities.intent) {
                intent = json.entry[0].messaging[0].message.nlp.entities.intent[0].value
                confidence = json.entry[0].messaging[0].message.nlp.entities.intent[0].confidence

            } else {
                // intent = Object.keys(json.entry[0].messaging[0].message.nlp.entities)[0]
                // console.log("heyyyyyy is here ...",Object.keys(json.entry[0].messaging[0].message.nlp.entities)[0]);
                intent = Object.keys(json.entry[0].messaging[0].message.nlp.entities)[0]
                confidence = json.entry[0].messaging[0].message.nlp.entities[Object.keys(json.entry[0].messaging[0].message.nlp.entities)[0]][0].confidence

            }
        } else if (entity_len === 0) {
            intent = "Random_word"

        } else {
            console.log("\nMultiple entities is there !");
            // get maxConfidence intnet
            let A_entity = []
            for (var key in json.entry[0].messaging[0].message.nlp.entities) {
                if (json.entry[0].messaging[0].message.nlp.entities.hasOwnProperty(key)) {
                    A_entity.push({ intent: key, confidence: json.entry[0].messaging[0].message.nlp.entities[key][0].confidence })

                }
            }
            function findMax(A_entity) {
                let max = A_entity[0].confidence;
                for (let i = 1; i < A_entity.length; i++) {
                    let v = A_entity[i].confidence;
                    max = (v > max) ? v : max;
                }
                return max;
            }
            let max_conf = findMax(A_entity);
            confidence = max_conf;
            let getIntent = A_entity.filter(function (obj) {
                return obj.confidence == max_conf;
            });
            // console.log("Max Confidence : ",getIntent[0].intent);
            intent = getIntent[0].intent
            if (intent === "intent") {
                intent = json.entry[0].messaging[0].message.nlp.entities.intent[0].value

            }
            
        }
        console.log("final intent is : ", intent);
        // }
        console.log("user says : ", message);
        const id = json.entry[0].messaging[0].sender.id
        return { message, id, intent, confidence }
    }
}