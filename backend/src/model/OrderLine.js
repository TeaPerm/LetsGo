import mongoose from "mongoose";

const orderLineSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true,
    },
    quantity:{
        type: Number,
        required: true,
    }
  }, {timestamps: true});

  export const OrderLine = mongoose.model('OrderLine', orderLineSchema)