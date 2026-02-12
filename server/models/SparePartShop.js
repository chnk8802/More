import mongoose from 'mongoose';

const SparePartShopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    address: {
        type: String
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }
}, { timestamps: true });

export default mongoose.model('SparePartShop', SparePartShopSchema);
