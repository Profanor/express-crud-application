import userModel from '../models/User';
import { Response, Request} from 'express';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    //assuming user ID is available in req.params.id
    const users = await userModel.findAll();
    res.json({ success: true, users });
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
     //find user by ID in the database
     const user = await userModel.findByPk(userId);
     if (!user) {
      return res.status(404).json({ error: 'User not found' });
  }
    res.json({ success: true, user });
}   catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, gender, phone, address } = req.body;

    // Validate that required fields are present
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: 'Fullname, email, and password are required' });
    }

    // Check if the email is already in use
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Create a new user
    const newUser = await userModel.create({
      fullname,
      email,
      password,
      gender,
      phone,
      address,
    });

    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { fullname, email, password, gender, phone, address } = req.body;

    // Validate that required fields are present
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: 'Fullname, email, and password are required' });
    }

    // Find the user by ID
    const user = await userModel.findByPk(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user
    await user.update({
      fullname,
      email,
      password,
      gender,
      phone,
      address,
    });

    res.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await userModel.findByPk(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    await user.destroy();

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default { 
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};