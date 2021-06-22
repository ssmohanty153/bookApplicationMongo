# bookApplicationMongo

index.ts

******************************************************************

import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './product';
import config from './config';
import samplerouters from './router';

const name = 'Server';
const router = express();
var path = require('path');
let userDetails = [{
    "name": "ssm",
    "email": "ssmohanty153@gmail.com",
    "age": "23",
    "MobileNumber": "9965490099",
    "password": "hare"
},
{
    "name": "ssm",
    "email": "ssmohanty153@gmail.com",
    "age": "23",
    "MobileNumber": "9907790099",
    "password": "hare"
},
{
    "name": "ssm",
    "email": "ssmohanty153@gmail.com",
    "age": "23",
    "MobileNumber": "9900000099",
    "password": "hare"
}];

router.use((req, res, next) => {

    logging.info(name, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {

        logging.info(name, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })

    next();
});


router.use('/router', samplerouters);

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static('./'));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


router.get('/userDetails', (req, res) => {
    res.json(userDetails);
});


router.get('/retiveUserDetails',(req,res)=>{
    res.sendFile(path.join(__dirname ,'../','/logindedtail.html'));
});

router.get('/getuserDetails/:MobileNumber', (req, res) => {
    const MobileNumber = req.params.MobileNumber;
    for (let userDetail of userDetails) {
        if (userDetail.MobileNumber === MobileNumber) {
            res.json(userDetail);
            return;
        }
    }
    res.status(404).send('MobileNumber not found');
});

router.post('/userDetail', (req, res) => {
    const userDetail = req.body;
    userDetails.push(userDetail);
    console.log(userDetails);
    res.sendFile(path.join(__dirname,'../', '/logindedtail.html'));
});


router.delete('/userDetail/:MobileNumber', (req, res) => {
    const MobileNumber = req.params.MobileNumber;
    for (let i = 0; i < userDetails.length; i++) {
        let userDetail = userDetails[i]
        if (userDetail.MobileNumber === MobileNumber) {
            userDetails.splice(i,1);

        }
    }
    res.send("deleted");
});

router.post('/getuserDetails/:MobileNumber', (req, res) => {
    const MobileNumber = req.params.MobileNumber;
    const newUsermobile = req.body;
    for (let i = 0; i < userDetails.length; i++) {
        let userDetail = userDetails[i]

        if (userDetail.MobileNumber === MobileNumber) {
            userDetails[i] = newUsermobile;
        }
    }
    // res.json(userDetails);
    // console.log(userDetails);
   res.send("edited");
   //res.json(userDetails);
    // res.sendFile(path.join(__dirname,'../', '/logindedtail.html'));
});




router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(name, `Server is running ${config.server.hostname}:${config.server.port}`));



// A response header is an HTTP header that can be used in an HTTP response 
// and that doesn't relate to the content of the message.
//  Response headers, like Age , Location or Server are used to give a 
//  more detailed context of the response.
