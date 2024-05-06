import z from "zod";

export const userSchema = z
  .object({
    // name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
  })
  .strict();

export const validateUserData = async (req, res, next) => {
  const userData = req.body;
  const parsed = userSchema.safeParse(userData);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.issues);
  }

  req.userData = parsed.data;
  next();
};
