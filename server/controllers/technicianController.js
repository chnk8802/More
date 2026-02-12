import User from '../models/User.js';

// @desc    Get all technicians (Users with role Technician)
// @route   GET /api/technicians
// @access  Private
const getTechnicians = async (req, res) => {
    try {
        const technicians = await User.find({
            organization: req.user.organization,
            role: 'Technician'
        }).sort({ name: 1 });
        res.json(technicians);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a technician (User)
// @route   POST /api/technicians
// @access  Private (Admin/Manager)
const createTechnician = async (req, res) => {
    const { name, contact, address, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const technician = await User.create({
            name,
            email: email || `tech-${Date.now()}@example.com`, // Temporary fallback if email not provided in old form
            password: password || '123456', // Default password
            role: 'Technician',
            contact,
            address,
            organization: req.user.organization
        });

        res.status(201).json(technician);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a technician
// @route   PUT /api/technicians/:id
// @access  Private
const updateTechnician = async (req, res) => {
    const { name, contact, address } = req.body;

    try {
        const technician = await User.findOne({ _id: req.params.id, organization: req.user.organization });

        if (technician) {
            technician.name = name || technician.name;
            technician.contact = contact || technician.contact;
            technician.address = address || technician.address;

            const updatedTechnician = await technician.save();
            res.json(updatedTechnician);
        } else {
            res.status(404).json({ message: 'Technician not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { getTechnicians, createTechnician, updateTechnician };
