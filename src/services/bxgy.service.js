export const applyBxGyCoupon = (coupon, cart) => {
  const { buy_products, get_products, repetition_limit } = coupon.details;

  const buyRule = buy_products[0];
  const getRule = get_products[0];

  const buyItem = cart.items.find(
    (item) => item.product_id === buyRule.product_id
  );

  if (!buyItem || buyItem.quantity < buyRule.quantity) {
    return null;
  }

  let applicableTimes = Math.floor(buyItem.quantity / buyRule.quantity);
  if (repetition_limit) {
    applicableTimes = Math.min(applicableTimes, repetition_limit);
  }

  if (applicableTimes <= 0) {
    return null;
  }

  const getItem = cart.items.find(
    (item) => item.product_id === getRule.product_id
  );

  if (!getItem || getItem.quantity <= 0) {
    return null;
  }

  const maxFreeQty = getRule.quantity * applicableTimes;
  const freeQty = Math.min(getItem.quantity, maxFreeQty);

  if (freeQty <= 0) {
    return null;
  }

  let totalDiscount = 0;

  const updatedItems = cart.items.map((item) => {
    if (item.product_id !== getRule.product_id) {
      return { ...item, total_discount: 0 };
    }

    const discount = freeQty * item.price;
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
