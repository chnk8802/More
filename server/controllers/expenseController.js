import Expense from '../models/Expense.js';

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ organization: req.user.organization }).populate('paidBy', 'name').sort({ createdAt: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an expense
// @route   POST /api/expenses
// @access  Private
const createExpense = async (req, res) => {
    const { category, expenseName, amount, paymentMethod, paidBy, vendorName, description } = req.body;

    try {
        const expense = new Expense({
            category,
            expenseName,
            amount,
            paymentMethod,
            paidBy,
            vendorName,
            description,
            organization: req.user.organization
        });

        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({ _id: req.params.id, organization: req.user.organization });
        if (expense) {
            Object.assign(expense, req.body);
            const updatedExpense = await expense.save();
            res.json(updatedExpense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { getExpenses, createExpense, updateExpense };
