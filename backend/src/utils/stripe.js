export const createStripeProduct = async (productName, imageURL, stripe) => {
    try {
      // Create a product on Stripe
      const productStripe = await stripe.products.create({
        name: productName,
        images: [imageURL],
        active: true,
      });
  
      return productStripe.id;
    } catch (error) {
      // Handle errors during Stripe or Supabase operations
      console.error(error);
      return null;
    }
  };
  
export const createStripePrice = async (productId,stripeProductId, productPrice, stripe) => {
    try {
      // Create a product on Stripe
      const stripePrice = await stripe.prices.create({
        unit_amount: parseInt(productPrice) * 100, // Stripe prices are in cents
        currency: "huf", // Hungarian Forint
        product: stripeProductId,
        active: true,
        metadata:{
          product_id : productId
        }
      });
  
      return stripePrice.id;
    } catch (error) {
      // Handle errors during Stripe
      console.error(error);
      return null;
    }
  };
  