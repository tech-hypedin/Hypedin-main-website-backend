import express from "express";
import { fillContactForm } from "../controllers/contactFormControllers.js";

const contactFormRouter = express.Router();

contactFormRouter.post("/fillForm", fillContactForm);

export default contactFormRouter;