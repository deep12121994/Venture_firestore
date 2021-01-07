const express = require("express");
const router = express.Router();
const {brand_Registration, brand_List} = require("./brand.control");
const {user_Registration, user_List, login, find_User, update_User, remove_User } = require("./users.control");
const {cheque_Registration, cheque_List} = require("./cheque.control");
const {product_Registration, product_List} = require("./products.control");
const { order_Registration, order_List, order_Remove } = require("./orders.control");
const {orderDetails_Registration, orderDetails_List, orderDetails_Remove} = require("./orderDetails.control");
const {parties_Registration, party_List} = require("./parties.control");
const {paymentMode_Registration, paymentMode_List} = require("./paymentMode.control");


//brand controller
router.post("/brand/registration", brand_Registration);
router.get("/brand/brand_list", brand_List);

//cheque controller
router.post("/cheque/registration", cheque_Registration);
router.get("/cheque/cheque_list", cheque_List);

//users controller
router.post("/user/registration", user_Registration);
router.get("/user/user_list", user_List);
router.post("/user/login", login);
router.post("/user/find", find_User);
router.post("/user/update", update_User);
router.post("/user/remove", remove_User);

//product controller
router.post("/product/registration", product_Registration);
router.get("/product/product_list", product_List);
/*router.post("/product/find", find_Product);
router.post("/product/update", update_Product);
router.post("/product/remove", remove_Product);*/

//order controller
router.post("/order/createorder", order_Registration);
router.post("/order/remove", order_Remove);
router.get("/order/order_list", order_List);
/*router.post("/order/find", find_Order);
router.post("/order/update", update_Order);
router.post("/order/orderdetails_registration", orderDetails_Registration);*/

//orderDetails controller
router.post("/orderdetails/registration", orderDetails_Registration);
router.get("/orderdetails/orderdetails_List", orderDetails_List);
router.post("/orderdetails/remove",orderDetails_Remove);

//parties controller
router.post("/party/registration", parties_Registration);
router.get("/party/party_List", party_List);

//paymentMode controller
router.post("/paymentmode/registration", paymentMode_Registration);
router.get("/paymentmode/paymentmode_List", paymentMode_List);

module.exports = router;