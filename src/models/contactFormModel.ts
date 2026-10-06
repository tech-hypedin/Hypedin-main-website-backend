import mongoose from "mongoose";

interface IContactForm extends mongoose.Document {
    name: string,
    phoneNo: string,
    email: string,
    instagramURL: string,
    instagramFollowers: number,
    state: string,
    contentNiche: string,
    commercials: number,
    links: string
}

const contactFormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true },
    instagramURL: { type: String, required: true },
    instagramFollowers: { type: Number },
    state: { type: String },
    contentNiche: { type: String },
    commercials: { type: Number },
    links: { type: String }
},{ timestamps: true });

const ContactFormModel = mongoose.model<IContactForm>("contactForm", contactFormSchema);

export default ContactFormModel;