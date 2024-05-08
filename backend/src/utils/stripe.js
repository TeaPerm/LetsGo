import { frontEndURL } from "./constants.js";

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

export const createStripePrice = async (
  productId,
  stripeProductId,
  productPrice,
  stripe
) => {
  try {
    // Create a product on Stripe
    const stripePrice = await stripe.prices.create({
      unit_amount: parseInt(productPrice) * 100, // Stripe prices are in cents
      currency: "huf", // Hungarian Forint
      product: stripeProductId,
      active: true,
      metadata: {
        product_id: productId,
      },
    });

    return stripePrice.id;
  } catch (error) {
    // Handle errors during Stripe
    console.error(error);
    return null;
  }
};

export const createCheckoutLink = async (lineItems, userId, stripe) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      locale: "en",
      shipping_address_collection: {
        allowed_countries: ["HU"],
      },
      phone_number_collection: {
        enabled: true,
      },
      mode: "payment",
      success_url: frontEndURL + "/success",
      allow_promotion_codes: true,
      metadata: {
        user_id: userId,
      },
    });
    return session.url;
  } catch (error) {
    console.error(error);
    return null;
  }
};
