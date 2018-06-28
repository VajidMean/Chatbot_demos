const Restify = require('restify')
const methods = require('./methods')
const request = require('request')
 
const app = Restify.createServer({
    name:'Resume chatbot'
})

const token = 'abcd123'
const bot = new methods('EAADBZCz5ZBS0MBAH1eewAgCN5MjBXzqSHRFq44ZBH5uuJ6QpSfJLZCJ7hgIV91ABIRS3UQGTgdLyDhqZCiGnlz6AXwT6jMencoQ53r02qX9UyK0jJPQVZApUN4R8vD82WDGNYHcdVQGeEAdZCamlQ33gvbHPZBMtan7PPdexPVmrUuFdx3HF2jJe')

app.use(Restify.plugins.jsonp())
app.use(Restify.plugins.bodyParser())

app.get('/',(req, res, next)=>{
    if(req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] == token){
        res.end(req.query['hub.challenge'])
    }else{
        next();
    }
});

app.post('/',(req, res, next) => {
    const response = req.body
    if(response.object === "page"){
        const messageObj = bot.getMessageObject(response)
        // bot.sendText(`You said :${messageObj.message}`,messageObj.id) 
        if(messageObj.intent === "sendJoke"){
            request({
                headers: {
                  Accept: 'application/json' // FOR GETTING RESULT IN FORM OF JSON !!
                },
                uri: 'https://icanhazdadjoke.com/',
                method: 'GET'
              }, function (err, res, body) {
                const apiBody = JSON.parse(body);
                // console.log(apiBody['joke']);
                const joke = apiBody['joke'] + '🤪 😄';
                bot.sendText(joke,messageObj.id) 
              });    
        } else if(messageObj.intent === "greetings" && messageObj.confidence > 0.80){
                const greetings = 'Hi there 🤠,\nHow can i help you 🤔';
                bot.sendText(greetings,messageObj.id) 
        }else{
            request('https://randomname.de/', function (error, response, body) {
                bot.sendText(body,messageObj.id) 
            });    
        }
    }
    res.send(200)
})


app.listen(8080,()=>{
    console.log("app is running on port : 8080");
}) 
