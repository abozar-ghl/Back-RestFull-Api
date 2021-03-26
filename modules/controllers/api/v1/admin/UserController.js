const { JsonWebTokenError } = require("jsonwebtoken");

const Controller = require(`${config.path.controller}/Controller`);
const Users_verifys = require(`${config.path.model}/verify`);
const User = require(`${config.path.model}/user`);


module.exports = new class CourseController extends Controller {

    updateUserVerify(req , res) {  

        console.log("req updateUserVerify"); console.log(JSON.stringify(req.body.username) );

        let perc=0;
        let i=0;
        for(var key in req.body) {
            // if(req.body.hasOwnProperty(key)){
              //do something with e.g. req.body[key]
              if( req.body[key] ) perc += 1 ;
               i = i+1 ; // 12  تعداد کل فیلدهای موجود که باید باشد
            // }
          }


        Users_verifys.update({ "username": req.body.username } , 
                { 
                    firstname : req.body.firstname ,
                    lastname : req.body.lastname ,
                    email : req.body.email ,
                    tell : req.body.tell ,
                    // tell : req.body.tell ,
                    vfypercent : (perc-1)*(100/i)
                } , (err , verifyUsr) => {    
                if(err) throw err;

                res.json('update success');
        })
 
        // User.findById(req.body._id , (err , user) => {    
        //     if(err) throw err;

        //     if(user) {
        //         console.log(JSON.stringify(user.verify_id) );
        //         console.log(user.verify_id)
        //         Users_verifys.findByIdAndUpdate(user._verify_id , { lastname : true}, (err , veri) => {
        //             res.json('update success');
        //         });
        //         // req.verify_id = user.verify_id;           
        //         // next();
        //     } else {
        //         return res.json({
        //             success : false ,
        //             Error : 'User Not Found'      //یوزر بیدا نشد 
        //         });
        //     }
    //    }) 

 

        //     console.log(req.body)
        // this.model.User({
        //     username : req.body.data.username,
        //     email : req.body.data.email,
        //     password : req.body.data.password ,
        //     reffer_id : req.body.data.reffer_id
        // }).save(err => {   console.log( 'err'); console.log( err)
        //                     if(err) {
        //                         if(err.code == 11000) {   console.log( 'err11000'); console.log( err.code)
        //                             return res.json({
        //                                 success : false ,
        //                                 Error : 'ایمیل نمی تواند تکراری باشد'
        //                             })
        //                         } else {
        //                             // throw err;
        //                             return res.json({
        //                                 success : false ,
        //                                 Error : 'خطای ناشناس در ثبت نام'
        //                             })
        //                         }
        //                     }

        //         return res.json({
        //             success : true ,
        //             data : 'کاربر با موفقیت عضو وبسایت شد'
        //         });
        // })
    }




    index(req , res) {
        this.model.Course.find({} , (err , courses) => {
            if(err) throw err;
    
            if(courses) {
                return res.json(courses);
            }
        });
    }

    single(req , res) {
        
    }
    
    store(req , res) { 
        // Validation 
        req.checkBody('title' , 'عنوان نمیتواند خالی بماند').notEmpty();
        req.checkBody('body' , 'متن نمیتواند خالی بماند').notEmpty();
        req.checkBody('price' , 'قیمت نمیتواند خالی بماند').notEmpty();
        req.checkBody('image' , 'عنوان نمیتواند خالی بماند').notEmpty();
        
        this.escapeAndTrim(req , 'title price image');

        if(this.showValidationErrors(req, res)) 
            return;

        let newCourse = new this.model.Course({
            user : req.user._id,
            title : req.body.title,
            body : req.body.body,
            price : req.body.price,
            image : req.body.image
        })
        
        newCourse.save(err => {
            if(err) throw err;
            req.user.courses.push(newCourse._id);
            req.user.save();
            res.json('create course');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();      //آیا با فرمت مانگوهست این آی دی
        
        // this.showValidationErrors(req, res)   //اگراین روش پرامیس را استفاده کنیم در کونترلر هم پرامیس میزاریم که کامنتش  کردم
        //     .then( ()=> {
        //         //modal find
        //     })
        //     .catch( error => {
        //         console.log(error)
        //     })

        if(this.showValidationErrors(req, res)) 
            return;

        this.model.Course.findByIdAndUpdate(req.params.id , { title : 'course three'}, (err , course) => {
            res.json('update success');
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        
        if(this.showValidationErrors(req, res)) 
            return;
            
        this.model.Course.findByIdAndRemove(req.params.id , (err , course) => {
            if(err) throw err;
            res.json('delete success');
        })
    }
}