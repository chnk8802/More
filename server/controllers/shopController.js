import SparePartShop from '../models/SparePartShop.js';

// @desc    Get all shops
// @route   GET /api/shops
// @access  Private
const getShops = async (req, res) => {
    try {
        const shops = await SparePartShop.find({ organization: req.user.organization }).sort({ shopName: 1 });
        res.json(shops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a shop
// @route   POST /api/shops
// @access  Private
const createShop = async (req, res) => {
    const { shopName, contact, address } = req.body;

    try {
        const shop = new SparePartShop({
            shopName,
            contact,
            address,
            organization: req.user.organization
        });

        const createdShop = await shop.save();
        res.status(201).json(createdShop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a shop
// @route   PUT /api/shops/:id
// @access  Private
const updateShop = async (req, res) => {
    const { shopName, contact, address } = req.body;

    try {
        const shop = await SparePartShop.findOne({ _id: req.params.id, organization: req.user.organization });

        if (shop) {
            shop.shopName = shopName || shop.shopName;
            shop.contact = contact || shop.contact;
            shop.address = address || shop.address;

            const updatedShop = await shop.save();
            res.json(updatedShop);
        } else {
            res.status(404).json({ message: 'Shop not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { getShops, createShop, updateShop };
