import express from "express";
import { userValidation } from "../../validations/userValidation.js";
import { userController } from "../../controllers/userController.js";
const Router = express.Router();

Router.route("/signup").post(userValidation.SignUp,userController.signup)

// API login
Router.route("/login").post(userValidation.Login,userController.login);

// API logout
Router.route("/logout").delete(userController.logout);

//API Resfresh Token
Router.route("/resfresh_token").put(userController.refreshToken);

export const userRoute = Router;