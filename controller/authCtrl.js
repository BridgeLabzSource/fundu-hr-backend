'use strict';
/**
 * define require module
 */
let express = require('express'),
    router = express.Router(),
    jwt=require('jsonwebtoken'),
    secret="eb532154d1c60fe3c035de06c30ad96e6d36af93";

router.post('/github',function(req,res){
    let clientId=req.body.clientId;
    var token=jwt.sign(clientId,secret);
    res.json({token:token});   
})

router.post('/verify',function(req,res){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token,secret,function(err,decoded){
          if(err){
            res.json({
                    success:false,
                    message:'failed to authenticate token'
            }); 
          }else{
              res.json({
                      message:'successfully authentication process',
                      result:decoded
              });
          }
        });
     }else{
        res.status(403).send({
                         success:false,
                         message:'No token provide...'
        });
    } 
});

module.exports = router;
