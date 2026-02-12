import SparePart from '../models/SparePart.js';

// @desc    Get all parts
// @route   GET /api/parts
// @access  Private
const getParts = async (req, res) => {
    try {
        const parts = await SparePart.find({ organization: req.user.organization }).populate('shop', 'shopName').sort({ partName: 1 });
        res.json(parts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a part
// @route   POST /api/parts
// @access  Private
const createPart = async (req, res) => {
    const { partName, shop, cost, isPaid } = req.body;

    try {
        const part = new SparePart({
            partName,
            shop,
            cost,
            isPaid,
            organization: req.user.organization
        });

        const createdPart = await part.save();
        res.status(201).json(createdPart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a part
// @route   PUT /api/parts/:id
// @access  Private
const updatePart = async (req, res) => {
    const { partName, shop, cost, isPaid } = req.body;

    try {
        const part = await SparePart.findOne({ _id: req.params.id, organization: req.user.organization });

        if (part) {
            part.partName = partName || part.partName;
            part.shop = shop || part.shop;
            part.cost = cost !== undefined ? cost : part.cost;
            part.isPaid = isPaid !== undefined ? isPaid : part.isPaid;

            const updatedPart = await part.save();
            res.json(updatedPart);
        } else {
            res.status(404).json({ message: 'Part not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { getParts, createPart, updatePart };
