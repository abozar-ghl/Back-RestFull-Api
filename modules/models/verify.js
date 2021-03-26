const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');

const VerifySchema = new Schema({
    user : { type : Schema.Types.ObjectId , ref : 'User'},
    username : { type : String , required : true , unique : true } ,
    vfypercent : { type : Number , default : 0 } ,
    firstname : { type : Boolean , default : false } ,
    lastname : { type : Boolean , default : false } ,
    codemelli : { type : Boolean , default : false } ,
    email : { type : Boolean , default : false } ,
    sms_mobil : { type : Boolean , default : false } ,
    call_mobil : { type : Boolean , default : false } ,
    tell : { type : Boolean , default : false } ,
    cart_melli : { type : Boolean , default : false } ,
    cart_banki : { type : Boolean , default : false } ,
    facepic : { type : Boolean , default : false } ,
    // type : { type : String , default : 'user'},
    // courses : [{ type : Schema.Types.ObjectId , ref : 'Course'}]
});
VerifySchema.plugin(timestamps);


VerifySchema.pre('update' , function(next) {
//     let percent=0 ;
//     var vfy = this;
// // console.log(this)
// // percent += 1 ;
// console.log(vfy.cart_banki);
// console.log(JSON.stringify(vfy.cart_banki));

// if(this.lastname) {  console.log("user.lastname"); };

//     this.firstname ? percent += 1 : percent;
//     (this.lastname) ? percent += 1 : percent;
//     (this.codemelli) ? percent += 1 : percent;
//     (this.email) ? percent += 1 : percent;
//     (this.sms_mobil) ? percent += 1 : percent;
//     (this.call_mobil) ? percent += 1 : percent;
//     (this.tell) ? percent += 1 : percent;
//     (this.cart_melli) ? percent += 1 : percent;
//     (this.cart_banki) ? percent += 1 : percent;
//     (this.facepic) ? percent += 1 : percent;

//     console.log(percent)

//     // const data = this.getUpdate()
//     // data.vfypercent = percent;
//     // this.update({}, data).exec()

//     this.getUpdate().$set.vfypercent =percent ;
    

    // this.vfypercent = percent * 10 ;
    next();
    // bcrypt.hash(this.password, 10, (err, hash) => {
    //     this.password = hash;
    //     next();
    // });

    // createRefIdForUser(this.email , 10 , (err , hash)=>{
    // میتونه تو مرحله وریفای شدن ساخته بشه
    // })
})


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



module.exports = mongoose.model('Users_verifys' , VerifySchema);