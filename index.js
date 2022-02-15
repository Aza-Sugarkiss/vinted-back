const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const stripe = require("stripe")("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

const app = express();
app.use(formidableMiddleware());
app.use(cors());

app.post("/payment", async (req, res) => {
  try {
    const stripeToken = req.fields.stripeToken;
    const response = await stripe.charges.create({
      source: req.fields.stripeToken,
      amount: req.fields.productPrice * 100,
      currency: "eur",
      description: req.fields.productDetails,
      source: stripeToken,
    });
    console.log(response.status);

    if (response.status === "succeeded") {
      res.status(200).json({ message: "Paiement validé" });
    } else {
      res.status(400).json({ message: "Une erreur est survenue" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

app.listen(3100, () => {
  console.log("Server started");
});
