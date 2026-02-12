import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    jobId: {
        type: String,
        unique: true,
        // required: true // Auto-generated usually
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    device: {
        model: { type: String, required: true },
        imei: { type: String },
        problem: { type: String, required: true },
        image: { type: String } // URL or path
    },
    repairDetails: {
        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Technician'
        },
        components: [{ type: String }], // Array of strings for now
        remark: { type: String }
    },
    financials: {
        repairingCharges: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        totalSpareCost: { type: Number, default: 0 },
        totalReceived: { type: Number, default: 0 },
        balanceAmount: { type: Number, default: 0 }
    },
    status: {
        type: String,
        enum: [
            'Received',
            'Repairing',
            'Repaired',
            'Not Repaired',
            'Repaired Picked up',
            'Not Repaired Picked up',
            'Repair Picked Unpaid',
            'Return'
        ],
        default: 'Received'
    },
    paymentStatus: {
        type: String,
        enum: ['Unpaid', 'Partially Paid', 'Paid'],
        default: 'Unpaid'
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }
}, { timestamps: true });

// Pre-save to update payment status based on balance
ItemSchema.pre('save', function (next) {
    if (this.financials.balanceAmount <= 0 && this.financials.totalReceived > 0) {
        this.paymentStatus = 'Paid';
    } else if (this.financials.totalReceived > 0 && this.financials.balanceAmount > 0) {
        this.paymentStatus = 'Partially Paid';
    } else {
        this.paymentStatus = 'Unpaid';
    }
    next();
});

export default mongoose.model('Item', ItemSchema);
