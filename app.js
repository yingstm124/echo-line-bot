const line = require('@line/bot-sdk');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000

// create Line SDK config 
const config = {
    channelAccessToken: 'EALDDWtXzvKMbkhgBxAPfV5Fb8fTpsxM3D7STllFAaTlvvVg0b5HihNHSv0nB4pm+T12aV04Sq6/EuOA5+kcsYZe8Sf6ze5Pm+Z+XDL+2FW65TC2xO9QSlfT7nGOHYA9u8u9b2uoVdkJnneAO9uFhQdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'e36f4ea4431d0e2f3a29f66abe234cbf'
};

// create Line client
const client = new line.Client(config);
var p

// client.getProfile('Ub797bf3dc1f36a8afc5edf8d2d72a4f9')
// .then((profile) => {
//     p = profile.displayName
// })
// .catch(err => {
//     console.log(err)
// })

app.get('/', (req, res) => {
    res.send('ok')
    console.log('home')
})

app.post('/echo', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(replyClient))
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.error(err)
            res.status(500).end()
        })
})

// replyClient
function  replyClient(event) {


    if(event.type !== 'message' || event.message.type !== 'text'){
        return Promise.resolve(null)
    }

    const msg = event.message.text

    var p = event.source.userId
    var p_name, p_url

    client.getProfile(p)
    .then((profile) => {
        p_name = profile.displayName
        p_url = profile.pictureUrl

        const echo = {
            type: 'image',
            url: p_url,
        }

        return client.replyMessage(event.replyToken, echo)
    })
    .catch(err => {
        console.log(err)
    })

}   

app.listen(port, ()=> {
    `${port} port is working !!`
});