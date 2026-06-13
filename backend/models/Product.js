const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
name: {
type: String,
required: true
},


sku: {
    type: String,
    required: true,
    unique: true
},

category: {
    type: String,
    required: true
},

price: {
    type: Number,
    required: true
},

quantity: {
    type: Number,
    default: 0
},

description: {
    type: String
},

updatedBy: {
    type: String,
    default: null
},

updatedAt: {
    type: Date,
    default: null
},

customerId: {
    type: String,
    default: null
},

isActive: {
    type: Boolean,
    default: true
},


},
{
timestamps: true
}
);

module.exports =
mongoose.model(
"Product",
productSchema
);
