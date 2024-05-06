import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
  }, {timestamps: true});

  export const Order = mongoose.model('Order', orderSchema)