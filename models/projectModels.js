import mongoose from '../config/db.js'
import cuid from 'cuid'
import validator from 'validator'


function isImagePathOrURL(value){
    const isValidURL = validator.isURL(value,{
        protocols: ['http', 'https'],
        require_protocol: true
    })

    const isPath = value.startsWith('/') ||
                  value.startsWith('./') ||
                  value.startsWith('../')
    return isValidURL || isPath
}



function urlSchema(opts = {}){
    const { required } = opts
    return{
        type: String,
        required: !!required,
        trim: true,
        validate:{
            validator: isImagePathOrURL,
            message: props => `${props.value} is not a valid image URL or file path`
        }
    }
}


function emailSchema(opts = {}){
    const required = opts
    return{
        type: String,
        required: !!required,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not  a valid email`
        }
    }
}


const productSchema = new mongoose.Schema({
    id:{type: String, default: cuid, unique: true},
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: urlSchema({ required: true }),
    price: { type: Number, required: true, min: 0 },
    category: { type: String, trim: true },
    tags: { type: [String], index: true, default: [] }

}, {
    timestamps: true
})


export const Products = mongoose.model('Product', productSchema)