import express from "express";
import ExpressUsersController from "@/infrastructure/servers/express/controllers/ExpressAuthController";

let router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { firstName = "Robert", lastName = "Lopez", email = "rlopez.rjls@gmail.com", password = "" } = req.body;
    const savedUser = await ExpressUsersController.signUp({ firstName, lastName, email, password });
    res.status(200).send(savedUser);
  } catch (error) {
    console.log(error);
  }
});