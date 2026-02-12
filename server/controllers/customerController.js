import Customer from '../models/Customer.js';

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({ organization: req.user.organization }).sort({ createdAt: -1 });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private
const createCustomer = async (req, res) => {
    const { name, contact, address, isShopkeeper } = req.body;

    try {
        const customer = new Customer({
            name,
            contact,
            address,
            isShopkeeper,
            organization: req.user.organization
        });

        const createdCustomer = await customer.save();
        res.status(201).json(createdCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = async (req, res) => {
    const { name, contact, address, isShopkeeper } = req.body;

    try {
        const customer = await Customer.findOne({ _id: req.params.id, organization: req.user.organization });

        if (customer) {
            customer.name = name || customer.name;
            customer.contact = contact || customer.contact;
            customer.address = address || customer.address;
            customer.isShopkeeper = isShopkeeper !== undefined ? isShopkeeper : customer.isShopkeeper;

            const updatedCustomer = await customer.save();
            res.json(updatedCustomer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { getCustomers, createCustomer, updateCustomer };
