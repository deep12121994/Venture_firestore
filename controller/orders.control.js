const { collection } = require("./../db");
const db = require("./../db");
const admin = require('firebase-admin');


//Order creation
exports.order_Registration =async (req, res) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
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
        const result = await db.collection("orders").doc(today).set(fb_Order);
        res.send('Record saved successfuly');
    } catch(error) {
        res.status(400).send(error.message);
    }

};


