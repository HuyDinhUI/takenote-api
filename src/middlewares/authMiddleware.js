import { StatusCodes } from "http-status-codes";
import { JwtProvider } from "../providers/JwtProvider.js";
import "dotenv/config";

const isAuthozied = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(StatusCodes.FORBIDDEN).json({ slug: "INVALID_ACCESS_TOKEN" });
    return;
  }

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ slug: "NO_ACCESS_TOKEN" });
    return;
  }

  try {
    const accessTokenDecoded = await JwtProvider.verifyToken(
      token,
      process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
    );

    req.jwtDecoded = accessTokenDecoded;
    next();
  } catch (error) {
    if (error.message?.includes("jwt expired")) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ slug: "ACCESS_TOKEN_EXPIRED" });
      return;
    }

    res.status(StatusCodes.FORBIDDEN).json({ slug: "INVALID_ACCESS_TOKEN" });
  }
};

export const authMiddleware = {
  isAuthozied,
};
