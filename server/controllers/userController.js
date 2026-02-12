import User from '../models/User.js';

// @desc    Get all users in organization
// @route   GET /api/users
// @access  Private (Admin/Superadmin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ organization: req.user.organization }).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new user (Admin/Manager/Technician)
// @route   POST /api/users
// @access  Private (Admin/Superadmin)
const createUser = async (req, res) => {
    const { name, email, password, role, contact, address } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'Technician',
            contact,
            address,
            organization: req.user.organization
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                organization: user.organization
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin/Superadmin)
const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, organization: req.user.organization });

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
            user.contact = req.body.contact || user.contact;
            user.address = req.body.address || user.address;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                organization: updatedUser.organization
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin/Superadmin)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, organization: req.user.organization });

        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getUsers, createUser, updateUser, deleteUser };
