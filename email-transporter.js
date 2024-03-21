import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const { GMAIL_APP_PASSWORD, EMAIL_ADDRESS } = process.env;

// Create a transporter object using the default SMTP transport
export default nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: EMAIL_ADDRESS, // Your Gmail address
		pass: GMAIL_APP_PASSWORD,
	},
});
