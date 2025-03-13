import {Router} from 'express';
import { registerUser } from '../controllers/user.controller.js';
const router = Router();

router.route("/register").post(registerUser)  // .route() is a chaining method that allows you to define multiple HTTP methods (GET, POST, PUT, DELETE, etc.) on the same route path.

export default router;