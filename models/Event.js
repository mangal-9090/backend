import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  category: { type: String, enum: ["Workshop", "Seminar", "Conference", "Meetup"], required: true }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
