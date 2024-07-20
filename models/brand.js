import mongoose  from "mongoose";

const Schema = mongoose.Schema

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user :{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        },
    ],
    
    },
    {timestamps: true}
);

const Brand = mongoose.model("Brand", brandSchema)
export default Brand;