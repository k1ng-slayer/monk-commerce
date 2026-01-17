import express from "express";

import Coupon from "../models/Coupon.js";

const router = express.Router();

// {
//   "type": "cart-wise",
//   "details": {
//     "threshold": 100,
//     "discountPercentage": 10,
//   },
// };

// {
//   "type": "product-wise" ,
//   "details": {
//     "productIds": [2] ,
//      "discountPercentage": 20
//   }
// };

// {
//   "type": "bxgy",
//   "details": {
//     "buy_products": [{ "product_id": 1, "quantity": 2 }],
//     "get_products": [{ "product_id": 3, "quantity": 1 }],
//     "repetition_limit": 2,
//   },
// };

router.post("/", async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json(coupon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
});

router.get("/:id", async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) return res.status(404).json({ error: "Coupon not found" });

  res.json(coupon);
});

router.put("/:id", async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!coupon) return res.status(404).json({ error: "Coupon not found" });

  res.json(coupon);
});

router.delete("/:id", async (req, res) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);

  if (!coupon) return res.status(404).json({ error: "Coupon not found" });

  res.json({ message: "Coupon deleted" });
});

export default router;
