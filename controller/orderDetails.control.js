const { collection } = require("../db");
const db = require("../db");
const admin = require("firebase-admin");
const OrderDetails = require("../model/orderDetails");

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
        const result = await db.collection("orderDetails").doc().set(fb_OrderDetails);
        res.send("Record saved successfuly");
    } catch(error) {
        res.status(400).send(error.message);
    }

};

//display ChequeList
exports.orderDetails_List =  async(req,res) => {
    const snapshot = await db.collection("orderDetails").get();
    const orderDetailsArray = [];

    if(snapshot.empty){
        res.status(404).send("No orderdetails found");
    } else{
        snapshot.forEach(doc => {
               const orderDetails_data = new OrderDetails(
                doc.data().orderId,
                doc.data().orderType,
                doc.data().productName,
                doc.data().brand,
                doc.data().additionalInfo,
                doc.data().taxInEx,
                doc.data().quantity,
                doc.data().price,
                doc.data().additionalCharges,
                doc.data().gstpercentage,
                doc.data().gstamount,
                doc.data().subTotal,
                doc.data().totalAmount,
                doc.data().discountPercentage,
                doc.data().discountAmount,
                doc.data().modifiedDate,
                doc.data().createdBy
            );
            orderDetailsArray.push(orderDetails_data); 
        })
        res.send(orderDetailsArray);
    }
};

//orderDetails Deletion
exports.orderDetails_Remove = async(req, res) => {
    try{
        var orderDetails_query = db.collection("orderDetails").where('orderId','==',req.body.OrderId);
        orderDetails_query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
        });
        res.send('Record deleted successfuly');
    } catch(error) {
        res.status(400).send(error.message);
    }
};