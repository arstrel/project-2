const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema ({
type: {type: String, enum: ["employee", "manager"], default: "employee"},
sales: Number,
totalAutoGrat: Number,
tips: Number,
tipoutBartender: Number,
tipoutFoodRunner: Number,
reportedTips: Number,
totalTipoutBartender: Number,
totalTipoutFoodRunner: Number,
takeHome: Number,
config: {type: Schema.Types.ObjectId, ref: "Setup"},
checks: [{type: Schema.Types.ObjectId, ref: "User"}]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
