// Model
const Course = require(`${config.path.model}/course`);
const Episode = require(`${config.path.model}/episode`);
const User = require(`${config.path.model}/user`);
const Users_verifys = require(`${config.path.model}/verify`);

module.exports = class Controller {
    constructor() {
        this.model = { Course , Episode , User , Users_verifys }
    }

    //برای نمایش با جزئیات ارورهای برگشتی
    showValidationErrors(req , res ) {
        console.log(req.validationErrors())
        let errors = req.validationErrors();
        if(errors) {
            res.status(422).json({
                message : errors.map(error => {
                    return {
                        'field' : error.param,
                        'message' : error.msg,
                        // 'email' : error.msg
                    }
                }),
                success : false
            });
            return true;
        }
        return false
    }

    //کار با روش پرامیس و then and catch
    // showValidationErrors(req , res , callback) {
    //     return new Promise ((resolve , eject)=>{
    //         let errors = req.validationErrors();
    //         if(errors) {
    //             res.status(422).json({
    //                 message : errors.map(error => {
    //                     return {
    //                         'field' : error.param,
    //                         'message' : error.msg
    //                     }
    //                 }),
    //                 success : false
    //             });
    //             resolve(true);
    //         }
    //         eject(true) 
    //     })
    // }
    

//برای بررسی نداشتن کاراکتر غیر مجاز مانند html و ....
    

    escapeAndTrim(req , items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();            
        });
    }
}