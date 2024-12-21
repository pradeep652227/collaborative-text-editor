/*External Modules*/
const
    express = require('express'),
    path = require('path'),
    dotenv = require('dotenv').config({ path: path.resolve(__dirname, './.env') }),
    cors = require('cors'),
    http = require('http');

/*Declarations*/
const
    PORT = process.env.PORT || 3000,
    app = express(),
    httpServer = http.createServer(app);//integrate http server with express library

/*Internal Modules*/
const
    { services } = require('./imports'),
    { websockets } = services;

/*Configurations*/
/*const corsOptions = (req, callback) => {
    const allowedOrigins = ['http://localhost:5173', 
        'http://192.168.129.46:5173', 'http://192.168.132.46:5173', 'http://192.168.1.52:5173','http://localhost:5000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)){
        console.log('Origin Allowed :- ', origin);
        callback(null, { origin: true });
    }
    else{
        console.log('Not Allowed cors error for origin , ', origin);
        callback(new Error('Not Allowed , Cors Error'));
    }
}
*/

/*Middlewares*/
//  app.use(cors(corsOptions));

/*Initialization*/
    websockets.textEditor(httpServer);



/*Routes*/

httpServer.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
