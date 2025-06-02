import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const SignUp = async (req, res, next) => {
  const correctCondition = Joi.object({
    username:Joi.string().required().min(2).max(20).trim().strict(),
    phone: Joi.string().required().min(10).max(11).trim().strict(),
    password: Joi.string().required().min(8).max(20).trim().strict(),
    comfirmPassword: Joi.string().required().min(8).max(20).trim().strict()
  });

  try {
    
    await correctCondition.validateAsync(req.body,{abortEarly:false}) 
    next()
    
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message:error.message
    });
  }
};

const Login = async (req, res, next) => {
  const correctCondition = Joi.object({
    phone: Joi.string().required().min(10).max(11).trim().strict(),
    password: Joi.string().required().min(8).max(20).trim().strict()
  });

  try {
    
    await correctCondition.validateAsync(req.body,{abortEarly:false}) 
    next()
    
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message:error.message
    });
  }
};
export const userValidation = {
  SignUp,
  Login
};
