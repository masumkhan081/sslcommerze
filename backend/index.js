const express = require('express')
const app = express()
const cors = require('cors');
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'axils66b8505982163'
const store_passwd = 'axils66b8505982163@ssl'
const is_live = false //true for live, false for sandbox
// 
const port = 3000;
const corsOptions = {
      origin: 'http://localhost:5173',
      methods: 'GET,POST',
      allowedHeaders: 'Content-Type',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 

app.post("/order", async (req, res) => {
      // 
      const transIds = ["qwerty", "qwertyu", "qwertyui", "qwertyuio"]

      const { name, amount } = req.body;
      console.log(name, amount);

      const data = {
            total_amount: amount,
            currency: 'BDT',
            tran_id: transIds[0], // have to be unique in every api call; not a concern for now
            success_url: `http://localhost:3000/payment/success/${transIds[0]}`,
            fail_url: `http://localhost:3000/payment/failed/${transIds[0]}`,
            cancel_url: 'http://localhost:3000/payment/failed/${transIds[0]}',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            console.log('Redirecting to: ', GatewayPageURL);
            // res.redirect(GatewayPageURL)
            res.send({ url: GatewayPageURL });

      });
})

app.post("/payment/success/:tran_id", (req, res) => {
      console.log(req.params.tran_id);
      const tran_id = req.params.tran_id
      // 
      res.redirect(`http://localhost:5173/payment/success/${tran_id}`)
      // 
})

app.post("/payment/failed/:tran_id", (req, res) => {
      console.log(req.params.tran_id);
      const tran_id = req.params.tran_id
      // 
      res.redirect(`http://localhost:5173/payment/failed/${tran_id}`)
      // 
})

//SSLCommerz initiateRefund

app.get('/initiate-refund', (req, res) => {
      const data = {
            refund_amount: 10,
            refund_remarks: '',
            bank_tran_id: CB5464321445456456,
            refe_id: EASY5645415455,
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
      sslcz.initiateRefund(data).then(data => {
            //process the response that got from sslcommerz 
            //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
      });
})

//SSLCommerz refundQuery

app.get('/refund-query', (req, res) => {
      const data = {
            refund_ref_id: SL4561445410,
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
      sslcz.refundQuery(data).then(data => {
            //process the response that got from sslcommerz
            //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
      });
})
// 
//SSLCommerz transactionQueryBySessionId
//you also use this as internal method
app.get('/transaction-query-by-session-id', (req, res) => {
      const data = {
            sessionkey: AKHLAKJS5456454,
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
      sslcz.transactionQueryBySessionId(data).then(data => {
            //process the response that got from sslcommerz
            //https://developer.sslcommerz.com/doc/v4/#by-session-id
      });
})
// 
app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
})