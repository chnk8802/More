import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['Spare Part', 'Party', 'Shop Maintenance', 'Other']
    },
    expenseName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['UPI', 'Cash', 'Debit Card/Credit Card', 'Other'],
        default: 'Cash'
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technician' // Will be User later, keeping for now
    },
    vendorName: {
        type: String
    },
    description: {
        type: String
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Expense', ExpenseSchema);
