var request = require('request');

let msg = '';
const getmessage = async ()=>{
   await request('https://randomname.de/', function (error, response, body) {

        console.log('body:', body); // Print the HTML for the Google homepage.
        msg = body;
        console.log("message : ",msg);
        
      });

}
getmessage();