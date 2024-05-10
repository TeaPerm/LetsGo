import { Order } from "../model/Order.js";
import { OrderLine } from "../model/OrderLine.js";
import { Product } from "../model/Product.js";
import { User } from "../model/User.js";

export const analyticsController = {
  getAnalytics: async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalProducts = await Product.countDocuments();
      const totalOrders = await Order.countDocuments();
      const totalSales = await getTotalOrdersSum();
      const mostSoldProduct = await getMostSoldProduct();

      const userCountForMostOrders = parseInt(req.query.users) || 3;
      const usersWithMostOrders = await getTopUsersByTotalOrderAmount(
        userCountForMostOrders
      );

      const response = {
        totalUsers,
        totalProducts,
        totalOrders,
        totalSales,
        mostSoldProduct,
        usersWithMostOrders,
      };

      res.status(200).json(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

async function getTotalOrdersSum() {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSum: { $sum: "$total" },
        },
      },
    ]);

    if (result.length > 0) {
      return result[0].totalSum;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error occurred while calculating total order sum:", error);
    throw error;
  }
}

async function getMostSoldProduct() {
  try {
    const result = await OrderLine.aggregate([
      {
        $group: {
          _id: "$product_id",
          totalQuantity: { $sum: "$quantity" },
          totalIncome: { $sum: { $multiply: ["$quantity", "$product.price"] } },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          "product.__v": 0,
          "product.stripePriceId": 0,
          "product.stripeProductId": 0,
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    if (result.length > 0) {
      const mostSoldProduct = result[0];
      const totalIncome =
        mostSoldProduct.product.price * mostSoldProduct.totalQuantity;
      mostSoldProduct.totalIncome = totalIncome;
      return mostSoldProduct;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error occurred while finding most sold product:", error);
    throw error;
  }
}

async function getTopUsersByTotalOrderAmount(userCount) {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$user_id",
          totalOrders: { $sum: 1 },
          totalAmount: { $sum: "$total" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $sort: { totalAmount: -1 },
      },
      {
        $project: {
          "user.__v": 0,
          "user.password": 0,
          "user.is_admin": 0,
          "user.createdAt": 0,
          "user.updatedAt": 0,
        },
      },
      {
        $limit: userCount,
      },
    ]);

    return result;
  } catch (error) {
    console.error(
      "Error occurred while finding top users by total order amount:",
      error
    );
    throw error;
  }
}
