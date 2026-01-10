import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["cart-wise", "product-wise", "bxgy"],
      required: true,
    },
    details: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", CouponSchema);

export default Coupon;
