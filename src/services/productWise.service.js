export const applyProductWiseCoupon = (coupon, cart) => {
  const { productIds, discountPercentage } = coupon.details;

  let totalDiscount = 0;

  const updatedItems = cart.items.map((item) => {
    if (!productIds.includes(item.product_id)) {
      return { ...item, total_discount: 0 };
    }

    const itemTotal = item.quantity * item.price;
    const discount = Math.floor((discountPercentage / 100) * itemTotal);

    totalDiscount += discount;

    return {
      ...item,
      total_discount: discount,
    };
  });

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return {
    items: updatedItems,
    total_price: totalPrice,
    total_discount: totalDiscount,
    final_price: totalPrice - totalDiscount,
  };
};
