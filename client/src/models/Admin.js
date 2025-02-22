import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  // or other fields you might need
}, { timestamps: true });

// If there's already a model named "Admin" in Mongoose, use that.
// Otherwise, create a new model.
export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
