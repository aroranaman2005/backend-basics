import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken'; // it is a secure way to transmit information between a client (e.g., browser, mobile app) and a server. 

import bcrypt from 'bcrypt';
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,  // trim() is a string method that removes whitespace from both the beginning and end of a string.
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,  // cloudinary url will be provided here
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        coverImage: {
            type: String,  // cloudinary url
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"], //makes the password required). BUT, if the field is missing, it throws a custom error message: "Password is required"
            trim: true
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

// how we want to encrypt the password and we will use bcrypt for this.
userSchema.pre("save", async function(next){  //here we dont use callback in form of arrow function because we want to use this keyword and arrow function does not have context of current object (i.e this keyword)
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);   //here, 10 is salt rounds
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);  //password - actual password, this.password - encrypted password
}

userSchema.methods.generateAccessToken = function(){
    // jwt.sign(payload, secret, options)
    // payloaad -  (data inside the token).
    // secret - (a secret key to sign the token).
    // options - (optional, can be used to set the expiry of the token).
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);

// Important Point:
// The refresh token lets them stay logged in and get a new access token without re-entering credentials.