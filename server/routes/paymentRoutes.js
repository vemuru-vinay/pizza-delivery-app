import express from 'express';
import Razorpay from 'razorpay';
import shortid from 'shortid';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: 'rzp_test_JSGyKDijpHnryO', 
  key_secret: '9MsWFKlTnZFmJnNFSCNqZ7ls',
});

router.post('/create-order', async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.amount * 100; // convert to paise
  const currency = 'INR';

  const options = {
    amount,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});

export default router;
