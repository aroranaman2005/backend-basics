// asyncHandler.js provides a wrapper function
// Wrappers like asyncHandler are useful whenever we need to standardize error handling and improve code maintainability.
// high order function are functions that accept a function and return a function
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}
export {asyncHandler}


// same function in form of try - catch block

// const asyncHandler = () => {}
// const asyncHandler = () => () => {}  
// const asyncHandler = () => async () => {}  

// const asyncHanlder = (fn) => async (req, res, next) => {
//     try {
//          await fn(req, res, next);
//     } catch (err) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message || "An unknown error occurred!"
//         })
//     }
// }