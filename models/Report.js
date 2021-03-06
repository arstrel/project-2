const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    type: { type: String, enum: ["employee", "manager"], default: "employee" },
    sales: Number,
    totalAutoGrat: Number,
    tips: Number,
    tipoutBartender: Number,
    tipoutFoodRunner: Number,
    reportedTips: Number,
    totalTipoutBartender: Number,
    totalTipoutFoodRunner: Number,
    takeHome: Number,
    author:{ type: Schema.Types.ObjectId, ref: "Check" },
    authorName: String,
    edited: {
      sales: String,
      totalAutoGrat: String,
      tips: String,
      tipoutBartender: String,
      tipoutFoodRunner: String,
      reportedTips: String,
      totalTipoutBartender: String,
      totalTipoutFoodRunner: String,
      takeHome: String
    },
    config: { type: Schema.Types.ObjectId, ref: "Setup" },
    checks: [{ type: Schema.Types.ObjectId, ref: "Check" }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
