const Restify = require('restify')
const methods = require('./methods')
const request = require('request')
let lastChoice = '';
let jokeCount = 0

const app = Restify.createServer({
    name: 'Resume chatbot'
})

const token = 'abcd123'
const bot = new methods('EAADBZCz5ZBS0MBAH1eewAgCN5MjBXzqSHRFq44ZBH5uuJ6QpSfJLZCJ7hgIV91ABIRS3UQGTgdLyDhqZCiGnlz6AXwT6jMencoQ53r02qX9UyK0jJPQVZApUN4R8vD82WDGNYHcdVQGeEAdZCamlQ33gvbHPZBMtan7PPdexPVmrUuFdx3HF2jJe')

app.use(Restify.plugins.jsonp())
app.use(Restify.plugins.bodyParser())

app.get('/', (req, res, next) => {
    if (req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] == token) {
        res.end(req.query['hub.challenge'])
    } else {
        next();
    }
});

app.post('/', (req, res, next) => {
    const response = req.body
    const threshold = 0.85;
    console.log("lastChoice", lastChoice);
    if (response.object === "page") {
        const messageObj = bot.getMessageObject(response)
        // bot.sendText(`You said :${messageObj.message}`,messageObj.id) 
        if (messageObj.intent === "sendJoke") {
            lastChoice = 'sendJoke';
            jokeCount++;
            request({
                headers: {
                    Accept: 'application/json' // FOR GETTING RESULT IN FORM OF JSON !!
                },
                uri: 'https://icanhazdadjoke.com/',
                method: 'GET'
            }, function (err, res, body) {
                const apiBody = JSON.parse(body);
                const joke = apiBody['joke'] + '🤪 😄';
                bot.sendText(joke, messageObj.id)

            });
        } else if (messageObj.intent === "greetings" && messageObj.confidence > threshold) {
            lastChoice = 'greetings';
            const greetings = 'Hi there 🤠,\nHow can i help you 🤔';
            bot.sendText(greetings, messageObj.id)
        } else if (messageObj.intent === "thanks" && messageObj.confidence > threshold) {
            lastChoice = 'thanks';
            const greetings = 'Your most welcome ! 😃';
            bot.sendText(greetings, messageObj.id)
        } else if (messageObj.intent === "bot_self" && messageObj.confidence > threshold) {
            lastChoice = 'bot_self';
            const greetings = 'Hey i\'m here  to help you! 😇 \nI can make you happy by telling jokes If you want 🤪 ';
            bot.sendText(greetings, messageObj.id)
        } else if (messageObj.intent === "target_bot" && messageObj.confidence > threshold) {
            lastChoice = 'target_bot';
            const greetings = 'Hey i\'m here  to help you! 😇 \nI can make you happy by telling jokes If you want 🤪 ';
            bot.sendText(greetings, messageObj.id)
        } else if (messageObj.intent === "ask_something" && messageObj.confidence > threshold) {
            if (lastChoice === 'sendJoke' || jokeCount > 0) {
                request({
                    headers: {
                        Accept: 'application/json' // FOR GETTING RESULT IN FORM OF JSON !!
                    },
                    uri: 'https://icanhazdadjoke.com/',
                    method: 'GET'
                }, function (err, res, body) {
                    const apiBody = JSON.parse(body);
                    const joke = apiBody['joke'] + '🤪 😄';
                    jokeCount++;
                    // bot.sendText(`sure your today's ${jokeCount} joke is listed below,\n${joke}`, messageObj.id)
                    bot.sendText(joke, messageObj.id)
                });
            } else {
                const greetings = 'Sure but can you please more clearify what you want  🤔';
                bot.sendText(greetings, messageObj.id)
            }
            // lastChoice = 'ask_something';     **** crate condition in whioch if user ask somthing more than 5 time than give warning ****
        } else if (messageObj.intent === "bye" && messageObj.confidence > threshold) {
            lastChoice = 'bye';
            const greetings = 'byeeeee 🙋🏻‍ \nsee you soon 🙃';
            bot.sendText(greetings, messageObj.id)
        }
        // else if (messageObj.intent === "location" && messageObj.confidence > threshold) {
        //     lastChoice = 'location';
        //     const greetings = `You want to know weather of '${messageObj.intentValue}' ?`;
        //     bot.sendText(greetings, messageObj.id)
        // }
        else if (messageObj.intent === "praise" && messageObj.confidence > threshold) {
            lastChoice = 'praise';
            const greetings = 'Thanks 🙂';
            bot.sendText(greetings, messageObj.id)
        } else {
            lastChoice = 'random';
            request('https://randomname.de/', function (error, response, body) {
                bot.sendText(body, messageObj.id)
            });
        }
    }
    res.send(200)
})

app.listen(8080, () => {
    console.log("app is running on port : 8080");
}) 
