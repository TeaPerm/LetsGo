import Stripe from "stripe";

export const constructOrderDetailsFromStripe = async (req, res, next) => {
  if (req.stripeEvent.type === "checkout.session.completed") {
    const checkoutSessionCompleted = req.stripeEvent.data.object;

    const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
    try {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        checkoutSessionCompleted.id,
        {
          expand: ["line_items"],
        }
      );

      const lineItems = sessionWithLineItems.line_items.data.map((lineItem) => {
        return {
          product_id: lineItem.price.metadata.product_id,
          quantity: lineItem.quantity,
        };
      });

      req.userId = checkoutSessionCompleted.metadata.user_id;
      req.body = lineItems;
      req.total = sessionWithLineItems["amount_total"] / 100;
      next();
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  } else {
    res
      .status(400)
      .json({ error: `Unhandled event type ${req.stripeEvent.type}` });
  }
};

export const verifyStripe = async (req, res, next) => {
  const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    req.stripeEvent = event;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
