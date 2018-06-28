// // for getting output if value is same and confidence is > threshold Value(let 0.85)

// let output = '';
// let conValue = 0.85;

// if(demo.entry[0].messaging[0].message.nlp.entities.greetings && demo.entry[0].messaging[0].message.nlp.entities.greetings[0].confidence > conValue){
//     if(demo.entry[0].messaging[0].message.nlp.entities.greetings[0].value === "true" && demo.entry[0].messaging[0].message.nlp.entities.greetings[0].confidence > conValue){
//         console.log("greeting");
//         output = "greetings"
//     }
// }else if(demo.entry[0].messaging[0].message.nlp.entities.bye && demo.entry[0].messaging[0].message.nlp.entities.bye[0].confidence > conValue){
//     if(demo.entry[0].messaging[0].message.nlp.entities.bye[0].value === "true" ){
//         output = "bye";
//         console.log("bye"); 
//     }
// }else if(demo.entry[0].messaging[0].message.nlp.entities.intent && demo.entry[0].messaging[0].message.nlp.entities.intent[0].confidence > conValue){
//     if(demo.entry[0].messaging[0].message.nlp.entities.intent[0].value === "sendJoke" ){
//         console.log("joke");    
//         output = "joke"
//     }
// }else{
//     console.log("random");
//     output = "random"
// }

// console.log("output is : ",output);
let json = { "entities": {
        "bye": [
            {
                "confidence": 0.4956977365449,
                "value": "true"
            }
        ],
        "greetings": [
            {
                "confidence": 0.61914795888079,
                "value": "true"
            }
        ]
    }
}
let output = '';
let threshold = 0;
let A_entity = []


for (var key in json.entities) {
    if (json.entities.hasOwnProperty(key)) {
        A_entity.push({ intent : key,confidence : json.entities[key][0].confidence})
    }   
}
function findMax(A_entity) {
    let  max = A_entity[0].confidence;
    for (let i = 1; i < A_entity.length ; i++) {
      let v = A_entity[i].confidence;
      max = (v > max) ? v : max;
    }
    return max;
  }

let max = findMax(A_entity);
let getIntent = A_entity.filter(function( obj ) {
    return obj.confidence == max;
});
// console.log("Max Confidence : ",getIntent[0].intent);
output = getIntent[0].intent
console.log(output);
