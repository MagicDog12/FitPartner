import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import config from '../config/config.js'

export const generateEmailToken = (payload) => {
    return jwt.sign(
        payload,
        config.jwtEmailTokenSecret,
        {
            algorithm: config.jwtAlgorithm,
            expiresIn: config.jwtEmailExpires
        }
    );
};

export const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: config.emailPort,
  secure: true,
  auth: {
    user: config.email,
    pass: config.emailPassword,
  },
});

transporter.verify().then( () => {
    console.log("Ready for send emails!");
});