import mongoose from '../config/db.js'
import cuid from 'cuid'
import validator from 'validator'


const orderSchema = new mongoose.Schema({
    _id: {type: String, default: cuid},
    items:[
        {
            id: {type: String, default: cuid, required: true},
            quantity: {type: Number, required: true, min: 1}
        }
    ],
    buyerEmail:{
        type: String, 
        required: true,
        validate:{
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid Email address`
        }
    },
    createdAt:{type: Date, default: Date.now}
})
export const Order = mongoose.model('Order', orderSchema)