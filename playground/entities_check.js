let json =
{
    "object": "page",
    "entry": [
        {
            "id": "1459353787504684",
            "time": 1530103230114,
            "messaging": [
                {
                    "sender": {
                        "id": "1885387924838820"
                    },
                    "recipient": {
                        "id": "1459353787504684"
                    },
                    "timestamp": 1530103229839,
                    "message": {
                        "mid": "mid.$cAAV1swW89c1qcoe1j1kQUJs9Y6uW",
                        "seq": 9794,
                        "text": "hey",
                        "nlp": {
                            "entities": {
                                "greetings": [
                                    {
                                        "confidence": 0.99901568889508,
                                        "value": "true"
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        }
    ]
}


let output = '';
let maxConf = 0.85

// let entity_len = Object.keys(json.entry[0].messaging[0].message.nlp.entities).length;
// if (entity_len === 1) {
//     console.log("Single entity !");
//     console.log(json.entry[0].messaging[0].message.nlp.entities.intent);
//     if(json.entry[0].messaging[0].message.nlp.entities != null){
//         intent = json.entry[0].messaging[0].message.nlp.entities.intent[0].value
//         confidence = json.entry[0].messaging[0].message.nlp.entities.intent[0].confidence
//     }else{
//         intent = "Not Clear !"
//     }

// } else if (entity_len === 0) {
//     output = "Random_word"

// } else {
//     console.log("\nMultiple entities is there !");
//     // get maxConfidence intnet
//     let A_entity = []
//     for (var key in json.entry[0].messaging[0].message.nlp.entities) {
//         if (json.entry[0].messaging[0].message.nlp.entities.hasOwnProperty(key)) {
//             A_entity.push({ intent: key, confidence: json.entry[0].messaging[0].message.nlp.entities[key][0].confidence })
//         }
//     }
//     function findMax(A_entity) {
//         let max = A_entity[0].confidence;
//         for (let i = 1; i < A_entity.length; i++) {
//             let v = A_entity[i].confidence;
//             max = (v > max) ? v : max;
//         }
//         return max;
//     }

//     let max_conf = findMax(A_entity);
//     let getIntent = A_entity.filter(function (obj) {
//         return obj.confidence == max_conf;
//     });
//     // console.log("Max Confidence : ",getIntent[0].intent);
//     output = getIntent[0].intent
//     if(output === "intent"){
//         output = json.entry[0].messaging[0].message.nlp.entities.intent[0].value
//     }
// }
// console.log("final intent is : ", output);
let entity_len = Object.keys(json.entry[0].messaging[0].message.nlp.entities).length;
        if (entity_len === 1) {
            console.log("Single entity !");
            // (json.entry[0].messaging[0].message.nlp.entities.intent[0]) ? intent = json.entry[0].messaging[0].message.nlp.entities.intent[0].value : intent = "Not Clear !"
            if(json.entry[0].messaging[0].message.nlp.entities.intent){
                output = json.entry[0].messaging[0].message.nlp.entities.intent[0].value
                confidence = json.entry[0].messaging[0].message.nlp.entities.intent[0].confidence
            }else{
                
                // intent = Object.keys(json.entry[0].messaging[0].message.nlp.entities)[0]
                console.log("heyyyyyy is here ...",Object.keys(json.entry[0].messaging[0].message.nlp.entities)[0]);
                output = Object.keys(json.entry[0].messaging[0].message.nlp.entities)[0]
                console.log("confidence :::: ",json.entry[0].messaging[0].message.nlp.entities[Object.keys(json.entry[0].messaging[0].message.nlp.entities)[0]][0].confidence);
                confidence = json.entry[0].messaging[0].message.nlp.entities[Object.keys(json.entry[0].messaging[0].message.nlp.entities)[0]][0].confidence
            }
        } else if (entity_len === 0) {
            output = "Random_word"
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
            output = getIntent[0].intent
            if(intent === "intent"){
                output = json.entry[0].messaging[0].message.nlp.entities.intent[0].value
            }
        }
        console.log("final intent is : ", output);