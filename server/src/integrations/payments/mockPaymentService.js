export const createCheckoutSession = async ({ product, customer }) => ({
  checkoutId: `chk_${Date.now()}`,
  status: 'pending',
  amount: product.price,
  customer,
  redirectUrl: `/checkout/${product.slug}?session=mock`
});

