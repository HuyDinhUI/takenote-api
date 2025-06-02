import express from "express";
import { StatusCodes } from "http-status-codes";
import { userRoute } from "./userRouters.js";
import { accountRoute } from "./accountRouters.js";
import { tasksRouter } from "./tasksRouters.js";
import { OauthRouter } from "./OauthRouters.js";

const Router = express.Router();

Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "APIs V1 are ready to use" });
});

Router.use("/users", userRoute);

Router.use("/account", accountRoute);

Router.use("/tasks", tasksRouter);

Router.use("/auth", OauthRouter);

export const APIs_v1 = Router;
