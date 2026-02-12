import mongoose from 'mongoose';

const TechnicianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('Technician', TechnicianSchema);
