const db = require("./../db");
const admin = require("firebase-admin");
const Orders = require("../model/order");


//Order creation
exports.orderRegistration =async (req, res) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yy = today.getFullYear().toString().substr(-2);
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var hr = today.getHours();
    var millisec = today.getMilliseconds();

    today =  yy + mm + dd + hr + min + sec + millisec;

    const fb_Order = {
        orderId : today,
        billNo : today,
        refOrderId : req.body.RefOrderId,
        orderType : req.body.OrderType,
        orderDate : admin.firestore.Timestamp.fromDate(new Date()),
        modifiedDate : admin.firestore.Timestamp.fromDate(new Date()),
        partyName : req.body.PartyName,
        partyNo : req.body.PartyNo,
        gstNumber : req.body.GstNumber,
        mode : req.body.Mode,
        modeRef : req.body.ModeRef,
        totalQuantity : req.body.TotalQuantity,
        subTotal : req.body.SubTotal,
        totalTaxAmount : req.body.TotalTaxAmount,
        totalDiscountAmount : req.body.TotalDiscountAmount,
        totalDiscountPercentage : req.body.TotalDiscountPercentage,
        totalAmount : req.body.TotalAmount,
        receivedPaidAmount : req.body.ReceivedPaidAmount,
        balanceAmount : req.body.BalanceAmount,
        createdBy : req.body.CreatedBy
    };

    try{
        await db.collection("orders").doc().set(fb_Order);
        res.send("Record saved successfuly'");
    } catch(error) {
        res.status(400).send(error.message);
    }

};

//display OrderList
exports.orderList =  async(req,res) => {
    const snapshot = await db.collection("orders").get();
    const orderArray = [];

    if(snapshot.empty){
        res.status(404).send("No order found");
    } else{
        snapshot.forEach(doc => {
            const order_data = new Orders(
                doc.data().orderId,
                doc.data().billNo,
                doc.data().refOrderId,
                doc.data().orderType,
                doc.data().orderDate,
                doc.data().modifiedDate,
                doc.data().partyName,
                doc.data().partyNo,
                doc.data().gstNumber,
                doc.data().mode,
                doc.data().modeRef,
                doc.data().totalQuantity,
                doc.data().subTotal,
                doc.data().totalTaxAmount,
                doc.data().totalDiscountAmount,
                doc.data().totalDiscountPercentage,
                doc.data().totalAmount,
                doc.data().receivedPaidAmount,
                doc.data().balanceAmount,
                doc.data().createdBy);
            orderArray.push(order_data);
        })
        res.send(orderArray);
    }
};

//order Deletion
exports.orderRemove = async(req, res) => {
    try{
        var order_query = db.collection("orders").where('orderId','==',req.body.OrderId);
        order_query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
        });
        res.send('Record deleted successfuly');
    } catch(error) {
        res.status(400).send(error.message);
    }
};


