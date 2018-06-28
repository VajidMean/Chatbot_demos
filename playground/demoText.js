var request = require('request');

// let msg = '';
// const getmessage = async ()=>{
//    await request('https://randomname.de/', function (error, response, body) {

//         console.log('body:', body); // Print the HTML for the Google homepage.
//         msg = body;
//         console.log("message : ",msg);
        
//       });

// }
// getmessage();


// let joke = '';
// const getjoke = ()=>{
//   request('https://icanhazdadjoke.com/', function (error, response, body) {

//         // console.log('body:', body); // Print the HTML for the Google homepage.
//         joke =body;
//         console.log("joke : ",joke);
        
//       });
// }
let joke = '';
const getjoke = ()=>{
  request({
    headers: {
      Accept: 'application/json' // FOR GETTING RESULT IN FORM OF JSON !!
    },
    uri: 'https://icanhazdadjoke.com/',
    method: 'GET'
  }, function (err, res, body) {
    let apiBody = JSON.parse(body);
    console.log(apiBody['joke']);
  });
}

getjoke();




// if (json.entry[0].messaging[0].message.nlp.entities != null) {
//   if (json.entry[0].messaging[0].message.nlp.entities.intent != null && json.entry[0].messaging[0].message.nlp.entities.intent[0].value != null) {
//       if (json.entry[0].messaging[0].message.nlp.entities.intent[0].value === "sendJoke") {
//           intent = json.entry[0].messaging[0].message.nlp.entities.intent[0].value
//           confidence = json.entry[0].messaging[0].message.nlp.entities.intent[0].confidence
//       } else {
//           intent = "comes into user defined but not described in wit.ai"
//           console.log(intent);
//       }
//   } else {
//       if (json.entry[0].messaging[0].message.nlp.entities.greetings != null && json.entry[0].messaging[0].message.nlp.entities.greetings[0].value === "true") {
//           intent = "greetings"
//           confidence = json.entry[0].messaging[0].message.nlp.entities.greetings[0].confidence
//       } else {
//           intent = "not defined"
//           console.log(intent);
//       }
//   }
// } else {
//   intent = "Not Clear | intent not defined for this entry!"
// }