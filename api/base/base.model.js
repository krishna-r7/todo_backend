
const mongoose = require("mongoose");

const todoSchema  = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Completed"],
      default: "Pending",
    },
    userId: 
      {
       type: mongoose.Schema.Types.ObjectId, ref: "User"
      },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema );
