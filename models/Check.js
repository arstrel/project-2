const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkSchema = new Schema ({
netSales: Number,
regAutoGrat: Number,
eventAutoGrat: Number,
chargeTip: Number,
liquorTotal: Number,
beerTotal: Number,
wineTotal: Number,
foodTotal: Number
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const Check = mongoose.model('Check', checkSchema);

module.exports = Check;
