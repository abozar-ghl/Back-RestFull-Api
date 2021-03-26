const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const { use } = require('../api-v1');
const User = require(`${config.path.model}/user`);

module.exports = (req , res , next) =>  {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] ;     //req >  params: {   token:  'tktdxsc'   }
    let ReqList = req.body.ReqList || req.query.ReqList || req.headers['ReqList'] ;    
    req.ReqList = ReqList ;
    // console.log('apiAuth>>>' + JSON.stringify(req))
    if(token) {
        return jwt.verify(token , config.secret , (err , decode ) => {          //  در صورت وجود توکن آن را رمزگشایی میکند 
            if(err) {
                return res.json({
                    success : false ,
                    Error : 'Failed to authenticate token'      // توکن اشتباه و غیر معتبر
                })
            } 
            
            User.findById(decode.user_id , (err , user) => {      // درآوردن آی دی مونگو یوزر لاگین شده
                if(err) throw err;
                console.log("token okkkkkkkkkkkkkkk");
                
                if(user) {
                    user.token = token;         // توکن همراه یوزر به مرحله بعد باس داده میشه         
                    req.user = user;   
                    req.verifyStatus = {};      // یوزر بیدا شده به مرحله بعد باس داده میشه
                    // console.log(req.user)
                    next();
                } else {
                    return res.json({
                        success : false ,
                        Error : 'User Not Found'      //یوزر بیدا نشد 
                    });
                }
            }) 

            // next();
            // return;
        })
    }

    return res.status(403).json({   
        success : false , 
        Error : 'No Token Provided'        // توکنی دریافت نشد

    })
}