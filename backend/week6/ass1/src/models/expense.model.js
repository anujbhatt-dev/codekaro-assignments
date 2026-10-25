
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user"
        }
    },
    {
        timestamps: true
    }
);

const Expense = mongoose.model("expense", expenseSchema);

module.exports = Expense;
