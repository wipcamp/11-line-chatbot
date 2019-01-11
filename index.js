const express = require('express')
const port = process.env.PORT || 9999
const TOKEN = process.env.TOKEN || null
const LOCAL = process.env.LOCAL || null
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const axios = require('axios')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

    app.post('/webhook', async (req, res) => {
        let reply_token = req.body.events[0].replyToken
        let msg = req.body.events[0].message.text
        console.log(res)
        console.log(msg)
        // const questions = ''
        // if (msg === 'ตอบคำถาม') {
        //     try {
        //         questions = await axios('http://127.0.0.1:8001/api/questions')
        //     }catch(e){
        //         console.log('Errrrrr Q  ',e)
        //     }
        // }
        // console.log('question: '+questions)
        // await axios.get('http://127.0.0.1:8001/api/questions')
        // .then(function(response){
        //     console.log('data : '+response.data); // ex.: { user: 'Your User'}
        //     console.log('status : '+response.status); // ex.: 200
        // });  
    reply(reply_token, req.body.events[0].source.userId, msg)
    console.log(reply_token)
    console.log(req.body.events)
    console.log(req.body.events[0].source)
    console.log(req.body)
    res.sendStatus(200)
})
app.get('/', (req, res) => res.sendStatus(200))
app.listen(port)

function reply(reply_token, path, msg, question) {

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
    }
    let body
    if (msg === 'connect') {
        body = JSON.stringify({
            replyToken: reply_token,
            messages: [
                {
                    type: "flex",
                    altText: "Connect hi",
                    contents: {
                        type: "bubble",
                        body: {
                            type: "box",
                            layout: "vertical",
                            contents: [
                                {
                                    type: "button",
                                    style: "primary",
                                    height: "sm",
                                    action: {
                                        type: "uri",
                                        label: "Connect Wipcamp",
                                        uri: `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1632037404&redirect_uri=https://localhost:3000&state=asdasd&scope=openid%20profile`
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        })
    } else if (msg == "ตอบคำถาม") {
        body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
                type: 'text',
                text: 'คำถามมี'
            }
            ]
        })
    }

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function login(userId, accessToken) {
    // U60a8501e03cd8ab7db37a5f7036aa417
}