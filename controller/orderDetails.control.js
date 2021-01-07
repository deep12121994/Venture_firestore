const { collection } = require("../db");
const db = require("../db");
const admin = require('firebase-admin');

//OrderDetails creation
exports.orderDetails_Registration =async (req, res) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yy = today.getFullYear().toString().substr(-2);
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var hr = today.getHours();
    var millisec = today.getMilliseconds();

    today =  yy + mm + dd + hr + min + sec + millisec;

    
    const fb_OrderDetails = {
        orderId : today,
        orderType : req.body.OrderType,
        productName : req.body.ProductName,
        brand : req.body.Brand,
        additionalInfo : req.body.AdditionalInfo,
        taxInEx : req.body.TaxInEx, 
        quantity : req.body.Quantity,
        price : req.body.Price,
        additionalCharges : req.body.AdditionalCharges,
        gstpercentage : req.body.GstPercentage,
        gstamount : req.body.GstAmount,
        subTotal : req.body.subTotal,
        totalAmount : req.body.TotalAmount,
        discountPercentage : req.body.DiscountPercentage,
        discountAmount : req.body.DiscountAmount,
        modifiedDate : admin.firestore.Timestamp.fromDate(new Date()),
        createdBy : req.body.CreatedBy
    };

    try{
        const result = await db.collection("orderDetails").doc(today).set(fb_OrderDetails);
        res.send('Record saved successfuly');
    } catch(error) {
        res.status(400).send(error.message);
    }

};