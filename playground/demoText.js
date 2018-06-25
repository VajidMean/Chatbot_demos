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