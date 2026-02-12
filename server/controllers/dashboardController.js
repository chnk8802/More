import Item from '../models/Item.js';
import Payment from '../models/Payment.js';
import Expense from '../models/Expense.js';

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Public (will be Private)
const getDashboardStats = async (req, res) => {
    try {
        const orgId = req.user.organization;

        // 1. Status Counts
        const statusCounts = await Item.aggregate([
            { $match: { organization: orgId } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const formattedStatusCounts = statusCounts.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        // 2. Payment Status Counts
        const paymentStatusCounts = await Item.aggregate([
            { $match: { organization: orgId } },
            { $group: { _id: '$paymentStatus', count: { $sum: 1 } } }
        ]);

        const formattedPaymentStatusCounts = paymentStatusCounts.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        // 3. Financials
        // Total Received from Payments
        const totalReceivedResult = await Payment.aggregate([
            { $match: { organization: orgId } },
            { $group: { _id: null, total: { $sum: '$amount' }, totalProfit: { $sum: '$profit' } } }
        ]);
        const totalReceived = totalReceivedResult[0]?.total || 0;
        const totalProfit = totalReceivedResult[0]?.totalProfit || 0;

        // Total Expenses
        const totalExpensesResult = await Expense.aggregate([
            { $match: { organization: orgId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalExpenses = totalExpensesResult[0]?.total || 0;

        const financials = {
            totalReceived,
            totalProfit, // This is direct profit recorded in payments
            totalExpenses,
            netProfit: totalProfit - totalExpenses // Simple Net Profit
        };

        res.json({
            statusCounts: formattedStatusCounts,
            paymentStatusCounts: formattedPaymentStatusCounts,
            financials
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getDashboardStats };
