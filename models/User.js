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
    hasShippingAddress:{
        type:Boolean,
        default:false
    },
    shippingAddress: {
        firstName:{
            type:String,
            required:false
        },
        lastName:{
            type:String,
            required:false
        },
        address:{
            type: String
        },
        city:{
            type:String,
            required:false
        },
        country:{
            type:String,
            required:false
        },
        phone:{
            type:String,
            required:false
        }
    }
},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;