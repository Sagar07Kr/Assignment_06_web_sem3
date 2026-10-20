const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required: [true, 'Name is required'],
        trim : true
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true,
        lowercase : true,
        trim : true,
    },
    password : {
        type : String,
        required : [true, 'password is required'],
        minlength : [6, 'password must be at least 6 charecter']
    },
    role : {
        type : String,
        required : [true, 'Please enter Role'],
    },
    phone : {
        type : String,
        trim : true
    }
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const usermodel = mongoose.model('usermodel', userSchema);

module.exports = usermodel;