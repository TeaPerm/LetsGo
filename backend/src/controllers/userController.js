import { User } from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

export const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ userId: user._id.toString() }, secretKey, {
        expiresIn: "24h",
      });

      res
        .status(201)
        .json({ message: "User registered successfully", token: token });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Registration failed", message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.userData;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Authentication failed" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      const token = jwt.sign({ userId: user._id }, secretKey, {
        expiresIn: "24h",
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  },
  getUser: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findById(userId).select("-__v -createdAt -updatedAt -password");
      if (!user) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Getting user failed" });
    }
  },
};
