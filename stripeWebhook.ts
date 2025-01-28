import { https } from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Stripe
const stripeClient = new Stripe("your-stripe-secret-key");

console.log("process.env", process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = https.onRequest(async (req: any, res: any) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = "your-stripe-webhook-secret";

  let event;

  // Verify the webhook signature
  try {
    event = stripeClient.webhooks.constructEvent(
      req.rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    // @ts-ignore
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Get user UID from session metadata (assuming you passed it)
    // @ts-ignore
    const userId = session.metadata.user;

    if (userId) {
      try {
        // Update the user's 'isPro' field in Firebase
        await admin.firestore().collection("profiles").doc(userId).update({
          isPro: true,
        });

        res.status(200).send("User is updated to Pro.");
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Error updating user.");
      }
    } else {
      res.status(400).send("No user ID found.");
    }
  } else {
    res.status(200).send("Event type not handled.");
  }
});
