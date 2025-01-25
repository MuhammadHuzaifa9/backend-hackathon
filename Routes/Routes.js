const { router } = require("../app");
const Auth_Route_Handlers = require("../RouteHandlers/AuthControllers");
const Seeker_Route_Handlers = require("../RouteHandlers/SeekerHandlers");
const express = require("express");
const Router = express.Router();

Router.route("/auth/signup").post(Auth_Route_Handlers.signupuser);
Router.route("/auth/signin").post(Auth_Route_Handlers.loginuser);
Router.route("/auth/forgotpassword").post(Auth_Route_Handlers.forgotpasword);
Router.route("/auth/resetpassword/:token").patch(
  Auth_Route_Handlers.resetpassword
);

// admin , receptionist routes

Router.route("/saylani/createseeker").post(Seeker_Route_Handlers.createSeeker);
Router.route("/saylani/getallseekers").get(Seeker_Route_Handlers.getAllSeekers);
Router.route("/saylani/getseeker").get(Seeker_Route_Handlers.findSeeker);

module.exports = Router;
