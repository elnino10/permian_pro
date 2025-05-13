import users from "../mockUsers.js";
import { nanoid } from "nanoid";

export const login = (req, res) => {
  let { email } = req.body;

  email = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid Email",
      errorCode: "INVALID_EMAIL",
    });
  }

  const user = users.find((user) => user.email === email && user.isActive);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      errorCode: "USER_NOT_FOUND",
    });
  }
  // generate an OTP and send it to the user's email
  const shortId = nanoid(10);
  // we can assume this OTP is sent to the user's email
  // and also otp object is saved in the database
//   const otp = {
//     otp: shortId,
//     expiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
//   };
  return res.status(200).json({ message: "Success", email, shortId });
};

export const verifyOtp = (req, res) => {
  // get email and OTP from request body
  let { otp } = req.body;
  otp = otp.trim();
  const email = "userEmail";
  // check if the OTP is valid and not expired
  const currentTime = new Date();
  const storedOTP = {
    // assume this came from DB
    otp: "123456",
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  };

  if (storedOTP.otp !== otp) {
    return res.status(400).json({
      message: "Invalid OTP",
      errorCode: "INVALID_OTP",
    });
  }

  if (currentTime > storedOTP.expiresAt) {
    return res.status(400).json({
      message: "OTP expired",
      errorCode: "OTP_EXPIRED",
    });
  }
  // generate a JWT token and send it to the user
  const jwt = "generated-jwt-token";
  // return success response
    return res.status(200).json({
        message: "Success",
        token: jwt,
        user: {
        email,
        // other user details
        },
    });
};
