const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const Users_verifys = require(`${config.path.model}/verify`);

module.exports = new class AuthController extends Controller {

    register(req , res) {  //console.log(req)
        req.checkBody('data.username' , 'وارد کردن فیلد نام الزامیست').notEmpty();
        req.checkBody('data.email' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('data.password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        req.checkBody('data.email' , 'فرمت اییمل وارد شده صحیح نیست').isEmail();
        
        if(this.showValidationErrors(req, res)) 
            return;

          //  console.log(req.body)
        const newUser = this.model.User({
            username : req.body.data.username,
            email : req.body.data.email,
            password : req.body.data.password ,
            reffer_id : req.body.data.reffer_id,
            // verify : "0" ,
            // verify : '0' , 
            })
            .save((err , user) => {   console.log( 'err'); console.log( err)
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
                                    //global.newUserId = user._id ;  console.log(user);
                                    console.log("newUser");
                                    console.log(newUser._id);
                })
                //    console.log(newUserId);
              
            .then( (resault) => { 
            
                let findUser = this.model.User.findById(resault._id , (err , user) => {
           
            
                    let newVerify = new this.model.Users_verifys({
                        user: user._id ,
                        username: req.body.data.username ,

                    });
            
                    newVerify.save(err => {
                        if(err) throw err;
            
                        // findUser.verify.push(newVerify._id);
                        // findUser.save();
                    
                        // res.json({
                        //     data : ' با موفقیت ایجاد شد',
                        //     success : true
                        // })
                    })
                    // findUser.model.push { scores: 89 };
                    // findUser.push(verify=newVerify._id);
                    // findUser.save();

                })
            })
            // )


        // console.log(newUser);
        // if (newUser){
        //     this.model.Users_verifys({
        //         username: req.body.data.username ,
        //         firstname: false ,
        //         lastname: false ,
        //         email: false ,
        //         user: newUser._id    // assign the _id from the person
        //         }).save( (err) => {
        //             if (err) console.log(err)
        //             // that's it!
        //             });


        // }
        if (newUser){
        return res.json({
            success : true ,
            data : 'کاربر با موفقیت عضو وبسایت شد'
        });}
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