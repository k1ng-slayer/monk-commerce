export const calculateCartTotal = (items) => {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
};

export const applyCartWiseCoupon = (coupon, cartTotal) => {
  const { threshold, discountPercentage } = coupon.details;

  if (cartTotal <= threshold) return 0;

  return Math.floor((discountPercentage / 100) * cartTotal);
};
