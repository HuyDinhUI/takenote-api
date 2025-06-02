import mongoose, { Schema } from "mongoose";

const tasksSchema = new mongoose.Schema({
  userId: {
    type:Schema.Types.ObjectId,
    ref:'users',
    require:true
  },
  title: String,
  description: String,
  status: String, // "pending", "done"
  deadline: Date,
  important: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date,
});

export const Tasks = mongoose.model("Tasks", tasksSchema);
