import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        }
    ],
    wishlists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WishList"
        }
    ],
    isAdmin:{
        type:Boolean,
        default:false
    },
    hasShippingAdress:{
        type:Boolean,
        default:false
    },
    shippingAddress: {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        address:{
            type: String
        },
        city:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        }
    }
},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;