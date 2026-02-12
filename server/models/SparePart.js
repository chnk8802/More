import mongoose from 'mongoose';

const SparePartSchema = new mongoose.Schema({
    partName: {
        type: String,
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SparePartShop',
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    linkedItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }
}, { timestamps: true });

export default mongoose.model('SparePart', SparePartSchema);
