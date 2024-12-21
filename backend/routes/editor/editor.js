const {Router}=require('express');
const router=Router();
const wss=require('ws');

/*Internal Modules*/
const {websocket_Editor}=require('../../services/websockets/websockets-imports');

router.get('/',(req,res)=>{
    console.log('Request from '+req.originalUrl+' with '+req.method+' method');
    res.send('Request from '+req.originalUrl+' with '+req.method+' method');
});

module.exports=router;