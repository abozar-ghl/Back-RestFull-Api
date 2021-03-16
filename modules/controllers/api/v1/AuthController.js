const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

module.exports = new class AuthController extends Controller {

    register(req , res) {  console.log(req)
        req.checkBody('data.username' , 'وارد کردن فیلد نام الزامیست').notEmpty();
        req.checkBody('data.email' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('data.password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        req.checkBody('data.email' , 'فرمت اییمل وارد شده صحیح نیست').isEmail();
        
        if(this.showValidationErrors(req, res)) 
            return;

            console.log(req.body)
        this.model.User({
            username : req.body.data.username,
            email : req.body.data.email,
            password : req.body.data.password ,
            reffer_id : req.body.data.reffer_id
        }).save(err => {   console.log( 'err'); console.log( err)
                            if(err) {
                                if(err.code == 11000) {   console.log( 'err11000'); console.log( err.code)
                                    return res.json({
                                        success : false ,
                                        Error : 'ایمیل نمی تواند تکراری باشد'
                                    })
                                } else {
                                    // throw err;
                                    return res.json({
                                        success : false ,
                                        Error : 'خطای ناشناس در ثبت نام'
                                    })
                                }
                            }

                return res.json({
                    success : true ,
                    data : 'کاربر با موفقیت عضو وبسایت شد'
                });
        })
    }

    login(req , res) {

        req.checkBody('email' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();

        if(this.showValidationErrors(req, res)) 
            return;

            console.log('reqqqqqqqq>' + req  )
            console.log('reqqqqqqqq>' + req.body.email )
        this.model.User.findOne({ email : req.body.email } , (err , user) => {
            if(err) throw err;

            if(user == null) 
                return res.status(422).json({
                    success : false ,
                    Error : 'اطلاعات وارد شده صحیح نیست'
                    
                });

            
            bcrypt.compare(req.body.password , user.password , (err , status) => {
                console.log(user)
                if(! status) 
                // return res.status(422).json({
                return res.json({
                        success : false,
                        Error : 'پسورد وارد شده صحیح نمی باشد'
                    })
              
                
                return res.json({
                    success : true ,
                    data : new UserTransform().transform(user,true),
                    profile : {   
                        firstname : user.firstname ,
                        lastname : user.lastname 
                    }
                });  
            })
        })

    }
}