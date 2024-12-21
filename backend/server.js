/*External Modules*/
const express=require('express');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const cors=require('cors');

/*Internal Modules*/
const { services } = require('./imports');
const { websockets } = services;
const { httpServer, websocket_Editor_wss } = websockets.websocket_Editor;

/*Configurations*/
const corsOptions=(req,callback)=>{
    const allowedOrigins=['http://localhost:5173','http://192.168.129.46:5173','http://192.168.132.46:5173','http://192.168.1.52:5173'];
    const origin=req.headers.origin;
    if(allowedOrigins.includes(origin))
        callback(null,{origin:true});
    else 
        callback(new Error('Not Allowed , Cors Error'));
}

/*Intialisation*/
const PORT = process.env.PORT || 3000;
const app=express();

/*Middlewares*/
app.use(cors(corsOptions));

/*Routes*/

httpServer.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
