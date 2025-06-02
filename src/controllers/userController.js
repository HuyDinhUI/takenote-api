import { StatusCodes } from "http-status-codes";
import { JwtProvider } from "../providers/JwtProvider.js";
import ms from "ms";
import { User } from "../modules/users.js";
import bcrybt from "bcryptjs";
import 'dotenv/config'

const ACCESS_TOKEN_SECRET_SIGNATURE = process.env.ACCESS_TOKEN_SECRET_SIGNATURE;
const REFRESH_TOKEN_SECRET_SIGNATURE = process.env.REFRESH_TOKEN_SECRET_SIGNATURE;

const signup = async (req, res) => {
  const { username, phone, password, comfirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({ message: "Phone is existed" });
    }

    if (comfirmPassword !== password) {
      return res.status(400).json({ message: "Password is not match" });
    }

    const hashPassword = await bcrybt.hash(password, 10);

    const newUser = new User({
      phone,
      password: hashPassword,
      username,
    });

    const saved = await newUser.save();
    res.status(201).json({message: "Sign up success",data:saved});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "Phone is not existing" });
    }

    const isMatchPassword = await bcrybt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(400).json({ message: "Password is wrong" });
    }

    const userInfo = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = await JwtProvider.generateToken(
      userInfo,
      ACCESS_TOKEN_SECRET_SIGNATURE,
      "1h"
    );

    const refreshToken = await JwtProvider.generateToken(
      userInfo,
      REFRESH_TOKEN_SECRET_SIGNATURE,
      "14 days"
    );

    //csrf

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: ms("14 days"),
    });

    // localStoarge

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: ms("14 days"),
    });

    res.status(StatusCodes.OK).json({
      message:"Log in success",
      ...userInfo,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.clearCookie("refresh", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(StatusCodes.OK).json({ message: "Log out success" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const refreshToken = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Refresh Token API success" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const userController = {
  signup,
  login,
  logout,
  refreshToken,
};
