
const Expense = require("../models/expense.model")

async function createExpense (req,res) {
    try {
        const expense = await Expense.create({...req.body,userId:req.user._id});
        res.status(201).json({success:true,data:expense})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error!"})
    }
}

async function getExpenses (req,res) {
    try {
        const {filter} = req.query;
        const today = new Date();
        today.setHours(0,0,0,0);
        let date = {};

        if(filter === "today") date = {$gte:today};
        else if(filter === "last7days") {
            const start = new Date(today);
            start.setDate(start.getDate()-6);
            date = {$gte:start};
        } else if(filter === "thisMonth") date = {$gte:new Date(today.getFullYear(),today.getMonth(),1)};
        else if(filter === "lastMonth") date = {$gte:new Date(today.getFullYear(),today.getMonth()-1,1),$lt:new Date(today.getFullYear(),today.getMonth(),1)};

        const query = {userId:req.user._id};
        if(filter) query.date = date;

        const expenses = await Expense.find(query).sort({date:-1});
        res.status(200).json({success:true,data:expenses})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error!"})
    }
}

async function getExpenseById (req,res) {
    try {
        const expense = await Expense.findOne({_id:req.params.id,userId:req.user._id});
        if(!expense) return res.status(404).json({success:false,message:"Expense not found!"});
        res.status(200).json({success:true,data:expense})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error!"})
    }
}

async function updateExpense (req,res) {
    try {
        const expense = await Expense.findOneAndUpdate({_id:req.params.id,userId:req.user._id},{$set:req.body},{new:true});
        if(!expense) return res.status(404).json({success:false,message:"Expense not found!"});
        res.status(200).json({success:true,data:expense})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error!"})
    }
}

async function deleteExpense (req,res) {
    try {
        const expense = await Expense.findOneAndDelete({_id:req.params.id,userId:req.user._id});
        if(!expense) return res.status(404).json({success:false,message:"Expense not found!"});
        res.status(200).json({success:true,message:"Expense deleted successfully!"})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error!"})
    }
}

module.exports = {createExpense,getExpenses,getExpenseById,updateExpense,deleteExpense}
