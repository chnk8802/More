import Payment from '../models/Payment.js';
import Item from '../models/Item.js';

// @desc    Get all payments
// @route   GET /api/payments
// @access  Public
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate({
                path: 'item',
                select: 'jobId customer',
                populate: { path: 'customer', select: 'name' }
            })
            .sort({ date: -1 });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a payment
// @route   POST /api/payments
// @access  Public
const createPayment = async (req, res) => {
    const { item, amount, date, profit } = req.body;

    try {
        // 1. Create Payment Record
        const payment = new Payment({
            item,
            amount,
            date,
            profit
        });
        const savedPayment = await payment.save();

        // 2. Update Job (Item) Financials
        const job = await Item.findById(item);
        if (job) {
            job.financials.totalReceived = (job.financials.totalReceived || 0) + Number(amount);

            // Recalculate Balance
            const totalCost = (job.financials.repairingCharges || 0) + (job.financials.totalSpareCost || 0) - (job.financials.discount || 0);
            job.financials.balanceAmount = totalCost - job.financials.totalReceived;

            await job.save(); // Pre-save hook will update paymentStatus
        }

        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a payment
// @route   PUT /api/payments/:id
// @access  Public
const updatePayment = async (req, res) => {
    const { amount, profit, date } = req.body;
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });

        const oldAmount = payment.amount;

        payment.amount = amount !== undefined ? amount : payment.amount;
        payment.profit = profit !== undefined ? profit : payment.profit;
        payment.date = date || payment.date;

        await payment.save();

        // Update Job Financials if amount changed
        if (amount !== undefined && Number(amount) !== oldAmount) {
            const job = await Item.findById(payment.item);
            if (job) {
                const diff = Number(amount) - oldAmount;
                job.financials.totalReceived = (job.financials.totalReceived || 0) + diff;
                // Recalculate Balance
                const totalCost = (job.financials.repairingCharges || 0) + (job.financials.totalSpareCost || 0) - (job.financials.discount || 0);
                job.financials.balanceAmount = totalCost - job.financials.totalReceived;

                await job.save();
            }
        }

        res.json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { getPayments, createPayment, updatePayment };
