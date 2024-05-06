import express from "express";
import productsRouter from "./routes/products.js";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/db.js";
import usersRouter from "./routes/users.js";
import ordersRouter from "./routes/orders.js";
import cors from "cors";
import { verifyStripe } from "./middleware/authMiddleware.js";
import { constructOrderDetailsFromStripe, parseOrderLines, validateProductIds } from "./middleware/orderMiddleware.js";
import { orderController } from "./controllers/orderController.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

//STRIPE WEBHOOK ENDPOINT
app.post("/orders", express.raw({type: 'application/json'}), verifyStripe, constructOrderDetailsFromStripe, parseOrderLines, validateProductIds, orderController.createOrder);
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

connectToDatabase();

app.use( "/products", productsRouter ),
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);


app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
