// const randomWord = require('random-word')
// console.log(randomWord());

// // API for random word : " https://api.chew.pro/trbmb "


// // getMessageObject(json) {
// //     const message = json.entry[0].messaging[0].message.text
// //     let intent = ''
// //     if (json.entry[0].messaging[0].message.nlp.entities.intent != null) {
// //         if(json.entry[0].messaging[0].message.nlp.entities.intent[0].value != null){
// //             if(json.entry[0].messaging[0].message.nlp.entities.intent[0].value === "sendJoke"){
// //                  intent =  json.entry[0].messaging[0].message.nlp.entities.intent[0].value
// //             }else{
// //                  intent = "Intent is there but not joke !"
// //             }
// //         }else{
// //             console.log("value of intent is null");
// //         }
// //     }else{
// //          intent = "Not Clear | intent not defined for this !"
// //     }   
    
// //     console.log("user says : ",message);
// //     // const message = randomWord();
// //     const id = json.entry[0].messaging[0].sender.id
// //     return { message, id, intent}
    
// // }

// // --> asdf
{
    "object": "page",
    "entry": [
        {
            "id": "1459353787504684",
            "time": 1530078054856,
            "messaging": [
                {
                    "sender": {
                        "id": "1885387924838820"
                    },
                    "recipient": {
                        "id": "1459353787504684"
                    },
                    "timestamp": 1530078054555,
                    "message": {
                        "mid": "mid.$cAAV1swW89c1qcQeQm1kP8JH4rI-m",
                        "seq": 9690,
                        "text": "asdf",
                        "nlp": {
                            "entities": {}
                        }
                    }
                }
            ]
        }
    ]
}

// HI greetings
{
    "object": "page",
    "entry": [
        {
            "id": "1459353787504684",
            "time": 1530078064586,
            "messaging": [
                {
                    "sender": {
                        "id": "1885387924838820"
                    },
                    "recipient": {
                        "id": "1459353787504684"
                    },
                    "timestamp": 1530078064049,
                    "message": {
                        "mid": "mid.$cAAV1swW89c1qcQe1sVkP8Js-hgAn",
                        "seq": 9695,
                        "text": "hi",
                        "nlp": {
                            "entities": {
                                "greetings": [
                                    {
                                        "confidence": 0.99993050098374,
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

// sendjoke
{
    "object": "page",
    "entry": [
        {
            "id": "1459353787504684",
            "time": 1530078071126,
            "messaging": [
                {
                    "sender": {
                        "id": "1885387924838820"
                    },
                    "recipient": {
                        "id": "1459353787504684"
                    },
                    "timestamp": 1530078070560,
                    "message": {
                        "mid": "mid.$cAAV1swW89c1qcQfPIFkP8KGY6R19",
                        "seq": 9700,
                        "text": "joke",
                        "nlp": {
                            "entities": {
                                "intent": [
                                    {
                                        "confidence": 0.96148137607807,
                                        "value": "sendJoke"
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


//  bye

{
    "object": "page",
    "entry": [
        {
            "id": "1459353787504684",
            "time": 1530078128770,
            "messaging": [
                {
                    "sender": {
                        "id": "1885387924838820"
                    },
                    "recipient": {
                        "id": "1459353787504684"
                    },
                    "timestamp": 1530078128185,
                    "message": {
                        "mid": "mid.$cAAV1swW89c1qcQiwOVkP8NnezFJ_",
                        "seq": 9705,
                        "text": "bye",
                        "nlp": {
                            "entities": {
                                "bye": [
                                    {
                                        "confidence": 0.9956977365449,
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
                    }
                }
            ]
        }
    ]
}

let demo = {
    "object": "page",
    "entry": [
        {
            "id": "1459353787504684",
            "time": 1530014452068,
            "messaging": [
                {
                    "sender": {
                        "id": "1885387924838820"
                    },
                    "recipient": {
                        "id": "1459353787504684"
                    },
                    "timestamp": 1530014451810,
                    "message": {
                        "mid": "mid.$cAAV1swW89c1qbT0QYlkO_fHyUUen",
                        "seq": 9668,
                        "text": "bye",
                        "nlp": {
                            "entities": {
                                "bye": [
                                    {
                                        "confidence": 0.9956977365449,
                                        "value": "true"
                                    }
                                ],
                                "greetings": [
                                    {
                                        "confidence": 0.91914795888079,
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
let conValue = 0.85;

if(demo.entry[0].messaging[0].message.nlp.entities.greetings && demo.entry[0].messaging[0].message.nlp.entities.greetings[0].confidence > conValue){
    if(demo.entry[0].messaging[0].message.nlp.entities.greetings[0].value === "true" && demo.entry[0].messaging[0].message.nlp.entities.greetings[0].confidence > conValue){
        console.log("greeting");
        output = "greetings"
    }
}else if(demo.entry[0].messaging[0].message.nlp.entities.bye && demo.entry[0].messaging[0].message.nlp.entities.bye[0].confidence > conValue){
    if(demo.entry[0].messaging[0].message.nlp.entities.bye[0].value === "true" ){
        output = "bye";
        console.log("bye"); 
    }
}else if(demo.entry[0].messaging[0].message.nlp.entities.intent && demo.entry[0].messaging[0].message.nlp.entities.intent[0].confidence > conValue){
    if(demo.entry[0].messaging[0].message.nlp.entities.intent[0].value === "sendJoke" ){
        console.log("joke");    
        output = "joke"
    }
}else{
    console.log("random");
    output = "random"
}

console.log("output is : ",output);

