const axios = require('axios');
// const randomWord = require('random-word');

module.exports = class methods {
    constructor(access_token) {
        this.ACCESS_TOKEN = access_token
    }
    async sendText(text, id) {
        const json = {
            recipient: { id },
            message: { text }
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
        console.log("user says : ",message);
        // const message = randomWord();
        const id = json.entry[0].messaging[0].sender.id
        return { message, id }
    }

}