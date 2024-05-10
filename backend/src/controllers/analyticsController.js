import { Order } from "../model/Order.js"
import { OrderLine } from "../model/OrderLine.js"
import { Product } from "../model/Product.js"
import { User } from "../model/User.js"


export const analyticsController = {
    getAnalytics: async (req,res) => {
        try{

            
            const user_count = await User.countDocuments()
            const product_count = await Product.countDocuments()
            const order_count = await Order.countDocuments()
            const total_sales = await getTotalOrdersSum();
            const most_sold_product = await getMostSoldProduct();

            const userCountForMostOrders = parseInt(req.query.users) || 3;
            const users_with_most_orders = await getTopUsersByTotalOrderAmount(userCountForMostOrders);
            
            const response = {
                user_count,
                product_count,
                order_count,
                total_sales,
                most_sold_product,
                users_with_most_orders,
            }

            res.status(200).json(response)
        }catch(err){
            res.status(500).send(err)
        }
    }
}

async function getTotalOrdersSum() {
    try {
        const result = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSum: { $sum: "$total" }
                }
            }
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
                    total_quantity: { $sum: "$quantity" },
                    count: { $sum: 1 } 
                }
            },
            {
                $lookup: {
                    from: "products", 
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $project: {
                    "product.__v": 0,
                    "product.stripePriceId" : 0,
                    "product.stripeProductId" : 0,
                }
            },
            {
                $sort: { total_quantity: -1 }
            },
            {
                $limit: 1
            }
        ]);

        if (result.length > 0) {
            return result[0]; 
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
                    total_orders: {$sum: 1},
                    total_amount: { $sum: "$total" } 
                }
            },
            {
                $lookup: {
                    from: "users", 
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $sort: { total_amount: -1 }
            },
            {
                $project: {
                    "user.__v": 0,
                    "user.password": 0,
                    "user.is_admin": 0,
                    "user.createdAt": 0,
                    "user.updatedAt": 0,
                }
            },
            {
                $limit: userCount
            }
        ]);

        return result;
    } catch (error) {
        console.error("Error occurred while finding top users by total order amount:", error);
        throw error;
    }
}
