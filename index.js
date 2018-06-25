const Restify = require('restify')
const methods = require('./methods')
const request = require('request')


const app = Restify.createServer({
    name:'Resume chatbot'
})

const token = 'abcd123'
const bot = new methods('EAADBZCz5ZBS0MBAF3hd7wt2TV8OXSvRuvohZCbTVvwPPWFWVsF6xZCh2LDk6wT6a9KjJ4pYc7SS41i7Ag4oySJpD4RraHcEEaTIAS84nlJHZCjyw2pPWqAAyQqUwtDAR6y0Q3ZCVDIpVor8Y4MVYavP8gtVICsxeqHgcNCnLpxZCUQHZAHElZBseW')

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
        request('https://randomname.de/', function (error, response, body) {

        console.log('body:', body);
        bot.sendText(body,messageObj.id) 
      });
    }
    res.send(200)
})

app.listen(8080,()=>{
    console.log("app is running on port : 8080");
}) 