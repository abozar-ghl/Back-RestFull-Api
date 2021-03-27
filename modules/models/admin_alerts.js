const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');

const AdminAlertSchema = new Schema({

    admin_name : { type : String , required : true , unique : true } ,
    start_show : { type : Number , default : 0 } ,
    end_show : { type : Number , default : 0 } ,
    active_show : { type : Boolean , default : true } ,
    priority : { type : String  } ,
    head : { type : String  } ,
    body : { type : String  } 

    // type : { type : String , default : 'user'},
    // courses : [{ type : Schema.Types.ObjectId , ref : 'Course'}]
});
AdminAlertSchema.plugin(timestamps);


// AdminAlertSchema.pre('update' , function(next) {
// //     let percent=0 ;
// //     var vfy = this;
// // // console.log(this)
// // // percent += 1 ;
// // console.log(vfy.cart_banki);
// // console.log(JSON.stringify(vfy.cart_banki));

// // if(this.lastname) {  console.log("user.lastname"); };

// //     this.firstname ? percent += 1 : percent;
// //     (this.lastname) ? percent += 1 : percent;
// //     (this.codemelli) ? percent += 1 : percent;
// //     (this.email) ? percent += 1 : percent;
// //     (this.sms_mobil) ? percent += 1 : percent;
// //     (this.call_mobil) ? percent += 1 : percent;
// //     (this.tell) ? percent += 1 : percent;
// //     (this.cart_melli) ? percent += 1 : percent;
// //     (this.cart_banki) ? percent += 1 : percent;
// //     (this.facepic) ? percent += 1 : percent;

// //     console.log(percent)

// //     // const data = this.getUpdate()
// //     // data.vfypercent = percent;
// //     // this.update({}, data).exec()

// //     this.getUpdate().$set.vfypercent =percent ;
    

//     // this.vfypercent = percent * 10 ;
//     next();
//     // bcrypt.hash(this.password, 10, (err, hash) => {
//     //     this.password = hash;
//     //     next();
//     // });

//     // createRefIdForUser(this.email , 10 , (err , hash)=>{
//     // میتونه تو مرحله وریفای شدن ساخته بشه
//     // })
// })


// const UserSchema = mongoose.model(
//     'User',
//     new mongoose.Schema({
//         username: String,
//         lastname: String,
//         email: String,
//         password: String,
//         roles: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Role'
//             }
//         ]
//     })
// );



module.exports = mongoose.model('Admin_alerts' , AdminAlertSchema);