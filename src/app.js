import express from "express";

import healthRoutes from "./routes/health.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import applicableCouponsRoutes from "./routes/applicableCoupons.routes.js";
import applyCouponRoutes from "./routes/applyCoupon.routes.js";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/coupons", couponRoutes);
app.use("/applicable-coupons", applicableCouponsRoutes);
app.use("/apply-coupon", applyCouponRoutes);

export default app;
