import Item from '../models/Item.js';
import Customer from '../models/Customer.js';
import User from '../models/User.js'; // Technician is now User
import SparePart from '../models/SparePart.js';
import mongoose from 'mongoose';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = async (req, res) => {
    try {
        const { status, technician, customer, paymentStatus } = req.query;

        let query = { organization: req.user.organization };
        if (status) query.status = status;
        if (technician) query['repairDetails.technician'] = technician;
        if (customer) query.customer = customer;
        if (paymentStatus) query.paymentStatus = paymentStatus;

        const jobs = await Item.find(query)
            .populate('customer', 'name contact')
            .populate('repairDetails.technician', 'name')
            .sort({ createdAt: -1 });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a job (with Transaction support for ad-hoc parts)
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { customer, device, repairDetails, financials, status, newParts = [] } = req.body; // newParts is optional array of { partName, cost, shop }

        // Generate Job ID
        const jobId = 'JOB-' + Date.now().toString().slice(-6);

        const newItem = new Item({
            jobId,
            customer,
            device,
            repairDetails,
            financials,
            status: status || 'Received',
            organization: req.user.organization
        });

        const savedItem = await newItem.save({ session });

        // Transaction: Create ad-hoc parts if any
        if (newParts && newParts.length > 0) {
            const partsToCreate = newParts.map(part => ({
                ...part,
                linkedItem: savedItem._id,
                organization: req.user.organization,
                isPaid: false // Default
            }));

            await SparePart.insertMany(partsToCreate, { session });

            // Validate: Update total spare cost on Item? 
            // The frontend might have sent the total already in financials.totalSpareCost.
            // But let's assume we need to add it if not included. 
            // For simplicity, we assume financials.totalSpareCost provided by frontend includes these, or we just link them here.
        }

        await session.commitTransaction();
        session.endSession();
        res.status(201).json(savedItem);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = async (req, res) => {
    try {
        const item = await Item.findOne({ _id: req.params.id, organization: req.user.organization });

        if (!item) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const { status, repairDetails, financials, device, paymentStatus } = req.body;

        if (status) item.status = status;
        if (paymentStatus) item.paymentStatus = paymentStatus;

        if (repairDetails) {
            item.repairDetails.technician = repairDetails.technician || item.repairDetails.technician;
            item.repairDetails.remark = repairDetails.remark || item.repairDetails.remark;
            if (repairDetails.components) item.repairDetails.components = repairDetails.components;
        }

        if (device) {
            item.device.model = device.model || item.device.model;
            item.device.imei = device.imei || item.device.imei;
            item.device.problem = device.problem || item.device.problem;
        }

        if (financials) {
            item.financials.repairingCharges = financials.repairingCharges !== undefined ? financials.repairingCharges : item.financials.repairingCharges;
            item.financials.discount = financials.discount !== undefined ? financials.discount : item.financials.discount;
            item.financials.totalSpareCost = financials.totalSpareCost !== undefined ? financials.totalSpareCost : item.financials.totalSpareCost;

            // Recalculate Balance
            const totalCost = (item.financials.repairingCharges || 0) + (item.financials.totalSpareCost || 0) - (item.financials.discount || 0);
            item.financials.balanceAmount = totalCost - (item.financials.totalReceived || 0);
        }

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update Job Status
// @route   PATCH /api/jobs/:id/status
// @access  Private
const updateJobStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const item = await Item.findOne({ _id: req.params.id, organization: req.user.organization });
        if (item) {
            item.status = status;
            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { getJobs, createJob, updateJob, updateJobStatus };
