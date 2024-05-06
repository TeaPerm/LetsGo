import mongoose from 'mongoose';
import { productCategoryTypes } from '../utils/constants.js';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        enum: productCategoryTypes,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    stripePriceId:{
        type: String,
        required: true
    },
    stripeProductId:{
        type: String,
        required: true
    }

},{timestamps: true})

export const Product = mongoose.model('Product', productSchema)