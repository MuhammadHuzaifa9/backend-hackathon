const AuthModel = require("../Models/AuthModel.js");
const toeknGen = require("../helpers/index");
const crypto = require('crypto')
const ResetPasswordEmail = require('../Mail/mailtrap.js')
exports.signupuser = async (req, res) => {
  try {
    const { email } = req.body;
    const is_existing_email = await AuthModel.findOne({ email });
    if (is_existing_email) {
      return res.status(401).json({
        status: "unauthorized",
        message: "email already exist",
      });
    }

    const user = await AuthModel.create(req.body);

    res.status(201).json({
      status: "success",
      message: "User SignUp Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: `Signup Failed!${err.message}`,
    });
  }
};
exports.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const is_registered = await AuthModel.findOne({ email });
    if (!is_registered) {
      return res.status(401).json({
        status: "unauthorized",
        message: "no user find with this email address",
      });
    }
    const valdiate_Pass = await is_registered.comparePasswrod(
      password,
      is_registered.password
    );
    if (!valdiate_Pass) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Incorrect Password!",
      });
    }
    const token = toeknGen.SignToken(is_registered._id);

    res.status(200).json({
      status: "Success",
      message: "Loged In Successfully",
      token,
      user: is_registered,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: `SignIn Failed!${err.message}`,
    });
  }
};
exports.forgotpasword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await AuthModel.findOne({email})
    if(!user){
        return res.status(401).json({
            status: "Unauthorized",
            message: "No user Found With this email!",
          });
    }

    const resettoken = await crypto.randomBytes(20).toString('hex')
    const encryptedToken = crypto.createHash('sha256').update(resettoken).digest('hex')
    const expires = Date.now() + 10 * 60 * 1000

    user.resetpasstoken = encryptedToken
    user.resetpasstokenexpires = expires

    await user.save()
    
    ResetPasswordEmail.SendResetEmail(email , `http://localhost:3000/auth/resetpassword/${resettoken}`)
    res.status(200).json({
        status: "Success",
        message: "Password Reset Token Generated!",
        resettoken,
    });
  } catch (err) {
    res.status(400).json({
        status: "Failed",
        message: err.message,
      });
  }
};
exports.resetpassword = async (req,res) => {
    try {
        console.log(req.params.token);
        const encryptedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        console.log(encryptedToken);
    
        const user = await AuthModel.findOne({ resetpasstoken: encryptedToken }); 
        if (!user) {
            return res.status(401).json({
                status: "Unauthorized",
                message: "User not found",
            });
        }
    
        if (!req.body.password) {
            return res.status(400).json({
                status: "Failed",
                message: "Password is required",
            });
        }
    
        user.password = req.body.password;
        user.resetpasstoken = undefined;
        user.resetpasstokenexpires = undefined;
    
        await user.save();
        res.status(200).json({
            status: "Success",
            message: "Password reset successfully",
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message,
        });
    }
    
}