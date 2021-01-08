const express = require("express");
const router = express.Router();
const {brandRegistration, brandList} = require("./brand.control");
//const {userRegistration, userList} = require("./users.control");
const {chequeRegistration, chequeList, chequeUpdate} = require("./cheque.control");
const {productRegistration, productList, productDataUpdate, productQuantityUpdate} = require("./products.control");
const {orderRegistration, orderList, orderRemove } = require("./orders.control");
const {orderDetailsRegistration, orderDetailsList, orderDetailsRemove} = require("./orderDetails.control");
const {partiesRegistration, partyList, partyDataUpdate, partyBalanceDataUpdate} = require("./parties.control");
const {paymentModeRegistration, paymentModeList, paymentModeUpdate} = require("./paymentMode.control");


//brand controller
router.post("/brand/registration", brandRegistration);
router.get("/brand/brandlist", brandList);

//cheque controller
router.post("/cheque/registration", chequeRegistration);
router.get("/cheque/chequelist", chequeList);
router.post("/cheque/update", chequeUpdate);



//product controller
router.post("/product/registration", productRegistration);
router.get("/product/productlist", productList);
router.post("/product/update", productDataUpdate);
router.post("/product/updatequantity", productQuantityUpdate);


//order controller
router.post("/order/createorder", orderRegistration);
router.post("/order/remove", orderRemove);
router.get("/order/orderlist", orderList);

//orderDetails controller
router.post("/orderdetails/registration", orderDetailsRegistration);
router.get("/orderdetails/orderdetailslist", orderDetailsList);
router.post("/orderdetails/remove",orderDetailsRemove);

//parties controller
router.post("/party/registration", partiesRegistration);
router.get("/party/partylist", partyList);
router.post("/party/update", partyDataUpdate);
router.post("/party/updatebsalance", partyBalanceDataUpdate);

//paymentMode controller
router.post("/paymentmode/registration", paymentModeRegistration);
router.get("/paymentmode/paymentmodeList", paymentModeList);
router.post("/paymentmode/updatepayment", paymentModeUpdate);

module.exports = router;