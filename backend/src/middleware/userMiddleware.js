import z from "zod";
import { User } from "../model/User.js";

const userLoginSchema = z
  .object({
    email: z.string().email().min(5),
    password: z.string().min(1),
  })
  .strict();

const userRegisterSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
  })
  .strict();

export const validateLoginData = async (req, res, next) => {
  const userData = req.body;
  const parsed = userLoginSchema.safeParse(userData);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.issues });
  }

  req.userData = parsed.data;
  next();
};

export const validateRegisterData = async (req, res, next) => {
  try {
    const userData = req.body;
    const { email } = userData;

    const parsed = userRegisterSchema.safeParse(userData);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }

    const foundEmail = await User.findOne({ email: email });

    if (foundEmail) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    req.userData = parsed.data;
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};
