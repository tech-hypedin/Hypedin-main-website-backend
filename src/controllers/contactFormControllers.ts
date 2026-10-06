import type { Request, Response } from "express";
import ContactFormModel from "../models/contactFormModel.js";

const fillContactForm = async (req: Request, res: Response) => {
    try {
        const { name, email, phoneNo, instagramURL, instagramFollowers, state, contentNiche, commercials, links } = req.body;

        if (!name || !email || !phoneNo || !instagramURL || !instagramFollowers || !state || !contentNiche || !commercials || !links) {
            return res.status(400).json({ success: false, message: "Details missing" });
        }

        await ContactFormModel.create({ name, email, phoneNo, instagramURL, instagramFollowers, state, contentNiche, commercials, links });

        return res.status(200).json({ success: true, message: "Details filled" });
    } catch(error: unknown) {
        console.log(error);

        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { fillContactForm }