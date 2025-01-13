import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  // Check if token is present
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user to the request object
    req.user = await User.findById(decoded.id);

    // If user is not found
    if (!req.user) {
      return next(new ErrorHandler("User Not Found", 404));
    }

    next();
  } catch (error) {
    // Handle invalid or expired token
    return next(new ErrorHandler("Invalid or Expired Token", 401));
  }
});
