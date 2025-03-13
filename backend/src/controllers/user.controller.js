import { asyncHandler } from "../utils/asyncHandler.js";
const registerUser = asyncHandler(async (req, res) => { // 💡 Using asyncHandler eliminates the need for try...catch in every route! ✅
    res.status(200).json({
        message: "ok"
    });
});

export { registerUser };