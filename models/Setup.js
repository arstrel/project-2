const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setupSchema = new Schema ({
eventTipPercentage: Number,
tipoutPercentage: Number,
tipoutfoodRunnerPercentage: Number,
doTipFoodRunner: Boolean,
doTipBartender: Boolean,
numberOfServers: Number
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const Setup = mongoose.model('Setup', setupSchema);

module.exports = Setup;
