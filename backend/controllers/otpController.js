import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';

// Generate the OTP

let otp1=null;
// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., use 'gmail', 'hotmail', etc.
  auth: {
    user: 'kushwahay535@gmail.com', // replace with your email
    pass: 'kyjl czxm vfgg zmct'    // replace with your email password
  }
});

// Send OTP to user
export const sendOtp = async (req, res) => {
  const { email } = req.body;
   otp1 = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
   console.log(otp1);
  
  try {
    // Send OTP email
    await transporter.sendMail({
      from: 'kushwahay535@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp1}`
    });

    res.status(200).json({
      message: 'OTP sent to email',
      success: true
    });
  } catch (error) {
    console.log("error is ",error);
    res.status(500).json({
      message: 'Failed to send OTP',
      success: false
    });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  console.log(`verify otp1 : ${otp1} and otp is ${otp}`)

  if (otp1 === otp) {
     otp1=null
    return res.status(200).json({
      message: "OTP is valid",
      success: true
    });
  } else {
    return res.status(400).json({
      message: "Invalid OTP",
      success: false
    });
  }
};
