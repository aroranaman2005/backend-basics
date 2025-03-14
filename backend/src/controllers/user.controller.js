import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => { // 💡 Using asyncHandler eliminates the need for try...catch in every route! ✅

    // get user details from frontend
    // validation -- not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullname, username, email, password} = req.body;
    console.log("email: ", email);

    // beginners way of doing
    // if(fullname===""){
    //     throw new ApiError(400, "Fullname is required");  // new is used as ApiError is a constuctor function and calling without new leads to an error
    // }

    if(
        [fullname, email, username, password].some( (field) =>  // The some() method in JavaScript is used to check if at least one element in an array satisfies a condition.
            field?.trim() === "" )
    ){
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = User.findOne({  // returns the first matching document & null if no match is found.
    $or: [ {username}, {email} ] // $or is a MongoDB operator that checks multiple conditions
    })
    if(existedUser){
        throw new ApiError(400, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(500, "Avatar upload failed");
    }

    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

});

export { registerUser };