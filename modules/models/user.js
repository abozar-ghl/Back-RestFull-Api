const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstname : { type : String } ,
    lastname : { type : String } ,
    email : { type : String  , unique : true} ,
    password : { type : String } ,
    // type : { type : String , default : 'user'},
    // courses : [{ type : Schema.Types.ObjectId , ref : 'Course'}]
});
UserSchema.plugin(timestamps);


UserSchema.pre('save' , function(next) {
    
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})


// const UserSchema = mongoose.model(
//     'User',
//     new mongoose.Schema({
//         firstname: String,
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