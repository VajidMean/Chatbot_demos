const request = require('request')

module.exports = function(obj){
    return new Promise((resolve, reject) => {
        request(obj, (error, response , body) => {
                if(error){
                    reject(error)
                }else{
                    resolve( body)
                }
        })
    })
}

// const res =  await request({
        //     url : `https://graph.facebook.com/v3.0/me/messages`,
        //     qs : {
        //         access_token: this.ACCESS_TOKEN
        //     },
        //     json,            
        //     methods: 'POST'
        // })
