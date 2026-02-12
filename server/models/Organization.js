import mongoose from 'mongoose';

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    subscriptionPlan: {
        type: String,
        enum: ['Free', 'Basic', 'Pro', 'Enterprise'],
        default: 'Free'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export default mongoose.model('Organization', OrganizationSchema);
