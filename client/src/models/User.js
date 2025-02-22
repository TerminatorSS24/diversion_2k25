import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  // other fields as needed
});

// If a model named "User" already exists in the mongoose connection, use it; otherwise create a new one.
export default mongoose.models.User || mongoose.model("User", UserSchema);
