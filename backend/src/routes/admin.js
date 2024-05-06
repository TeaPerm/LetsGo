import express from "express";

export function createAdminRoute({
    getUsers,
    getUser
}) {
    
  const adminRouter = express.Router();

  adminRouter.get("/users", async (req, res, next) => {
    try {
      const users = await getUsers();

      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  adminRouter.get("/users/:userId", async (req, res, next) => {
    try {
      const user = await getUser(req.params.userId);
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return adminRouter;
}
