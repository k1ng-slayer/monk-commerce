import express from "express";
import Coupon from "../models/Coupon.js";
import {
  calculateCartTotal,
  applyCartWiseCoupon,
} from "../services/cartWise.service.js";

const router = express.Router();

// {
//   cart: {
//     items: [
//       { product_id: 1, quantity: 6, price: 50 },
//       { product_id: 2, quantity: 3, price: 30 },
//       { product_id: 3, quantity: 2, price: 25 },
//     ],
//   },
// };

router.post("/", async (req, res) => {
  const { cart } = req.body;

  if (!cart || !Array.isArray(cart.items))
    return res.status(400).json({ error: "Invalid cart data" });

  const cartTotal = calculateCartTotal(cart.items);
  const coupons = await Coupon.find({ isActive: true });

  const applicableCoupons = [];

  for (const coupon of coupons) {
    if (coupon.type === "cart-wise") {
      const discount = applyCartWiseCoupon(coupon, cartTotal);
      if (discount > 0) {
        applicableCoupons.push({
          coupon_id: coupon._id,
          type: coupon.type,
          discount: discount,
        });
      }
    } else if (coupon.type === "product-wise") {
      const { productIds, discountPercentage } = coupon.details;

      let discount = 0;

      for (const item of cart.items) {
        if (productIds.includes(item.product_id)) {
          discount += Math.floor(
            (discountPercentage / 100) * item.quantity * item.price
          );
        }
      }

      if (discount > 0) {
        applicableCoupons.push({
          coupon_id: coupon._id,
          type: coupon.type,
          discount,
        });
      }
    } else continue;
  }

  res.json({ applicable_coupons: applicableCoupons });
});

export default router;
