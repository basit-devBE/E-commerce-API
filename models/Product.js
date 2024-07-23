import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    reviews: [ // Changed from Reviews to reviews to match the virtuals
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review", // Use singular 'Review'
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Virtuals
ProductSchema.virtual("qtyLeft").get(function () {
  return this.totalQty - this.totalSold;
});

ProductSchema.virtual("totalReviews").get(function () {
  return this.reviews.length;
});

ProductSchema.virtual("averageRating").get(function () {
  if (this.reviews.length === 0) return 0;
  const ratingsTotal = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((ratingsTotal / this.reviews.length).toFixed(1));
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
