const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');

module.exports = new class AuthController extends Controller {

    register(req , res) {  console.log(req)
        req.checkBody('data.firstname' , 'وارد کردن فیلد نام الزامیست').notEmpty();
        req.checkBody('data.lastname' , 'وارد کردن فیلد نام خانوادگی الزامیست').notEmpty();
        req.checkBody('data.email' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('data.password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        req.checkBody('data.email' , 'فرمت اییمل وارد شده صحیح نیست').isEmail();
        
        if(this.showValidationErrors(req, res)) 
            return;

            console.log(req.body)
        this.model.User({
            firstname : req.body.data.firstname,
            lastname : req.body.data.lastname,
            email : req.body.data.email,
            password : req.body.data.password
        }).save(err => {
            if(err) {
                if(err.code == 11000) {
                    return res.json({
                        data : 'ایمیل نمی تواند تکراری باشد',
                        success : false
                    })
                } else {
                    throw err;
                }
            }

            return res.json({
                data : 'کاربر با موفقیت عضو وبسایت شد',
                success : true
            });
        })
    }

    login(req , res) {
        req.checkBody('email' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();

        if(this.showValidationErrors(req, res)) 
            return;

        this.model.User.findOne({ email : req.body.email } , (err , user) => {
            if(err) throw err;

            if(user == null) 
                return res.status(422).json({
                    data : 'اطلاعات وارد شده صحیح نیست',
                    success : false
                });

            bcrypt.compare(req.body.password , user.password , (err , status) => {

                if(! status) 
                    return res.status(422).json({
                        success : false,
                        data : 'پسورد وارد شده صحیح نمی باشد'
                    })
              

                return res.json({
                    data : new UserTransform().transform(user,true),
                    success : true
                });  
            })
        })

    }
}