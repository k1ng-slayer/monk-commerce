export const applyCartWiseDiscount = (cart, discountAmount) => {
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return {
    items: cart.items.map((item) => ({
      ...item,
      total_discount: 0,
    })),
    total_price: totalPrice,
    total_discount: discountAmount,
    final_price: totalPrice - discountAmount,
  };
};
