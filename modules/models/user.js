const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstname : { type : String , default : "x"} ,
    lastname : { type : String , default : "x"} ,
    username : { type : String , required : true , unique : true} ,
    email : { type : String , required : true , unique : true} ,
    password : { type : String , required : true} ,
    reffer_id : { type : String } ,
    // verify_id : { type : String } ,
    verify :[ { type : Schema.Types.ObjectId  , ref : 'Users_verifys'}]

    // type : { type : String , default : 'user'},
    // courses : [{ type : Schema.Types.ObjectId , ref : 'Course'}]
});
UserSchema.plugin(timestamps);


UserSchema.pre('save' , function(next) {
    
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });

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



module.exports = mongoose.model('User' , UserSchema);