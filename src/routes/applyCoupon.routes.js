import express from "express";

import Coupon from "../models/Coupon.js";
import { calculateCartTotal } from "../services/cartWise.service.js";
import { applyCartWiseDiscount } from "../services/applyCartWise.service.js";
import { applyProductWiseCoupon } from "../services/productWise.service.js";
import { applyBxGyCoupon } from "../services/bxgy.service.js";

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

// bxgy coupon testing cart
// {
//   cart: {
//     items: [
//       { product_id: 1, quantity: 4, price: 15 },
//       { product_id: 3, quantity: 2, price: 10 },
//     ],
//   },
// };

router.post("/:id", async (req, res) => {
  const { cart } = req.body;

  if (!cart || !Array.isArray(cart.items))
    return res.status(400).json({ error: "Invalid cart data" });

  const coupon = await Coupon.findById(req.params.id);

  if (!coupon || !coupon.isActive)
    return res.status(404).json({ error: "Coupon not found" });

  if (coupon.type === "cart-wise") {
    const cartTotal = calculateCartTotal(cart.items);
    const { threshold, discountPercentage } = coupon.details;

    if (cartTotal <= threshold)
      return res.status(400).json({ error: "Coupon conditions not met" });

    const discountAmount = Math.floor((discountPercentage / 100) * cartTotal);

    const updatedCart = applyCartWiseDiscount(cart, discountAmount);
    return res.json({ updated_cart: updatedCart });
  }

  if (coupon.type === "product-wise") {
    const updatedCart = applyProductWiseCoupon(coupon, cart);
    return res.json({ updated_cart: updatedCart });
  }

  if (coupon.type === "bxgy") {
    const updatedCart = applyBxGyCoupon(coupon, cart);

    if (!updatedCart) {
      return res.status(400).json({ error: "Coupon conditions not met" });
    }

    return res.json({ updated_cart: updatedCart });
  }

  return res.status(400).json({ error: "Coupon type not supported yet" });
});

export default router;
