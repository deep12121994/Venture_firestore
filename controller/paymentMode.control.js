
const db = require("./../db");
const admin = require("firebase-admin");
const BankAccountData = require("../model/bankAccountData");

//product creation
exports.paymentMode_Registration =async (req, res) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");//January is 0!
    var yy = today.getFullYear().toString().substr(-2);
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var hr = today.getHours();
    var millisec = today.getMilliseconds();


    today =  yy + mm + dd + hr + min + sec + millisec;

    const paymentModeRef = db.collection("paymentMode").doc(req.body.DisplayName.toLowerCase());
    const doc = await paymentModeRef.get();
    if (!doc.exists) {
        const fb_PaymentMode = {
            displayName : req.body.DisplayName,
            type : req.body.Type,
            amount : req.body.Amount,
            openingBalance : req.body.OpeningBalance,
            createdBy : req.body.CreatedBy,
            modifiedBy : req.body.ModifiedBy,
            createdDate : admin.firestore.Timestamp.fromDate(new Date()),
            modifiedDate : admin.firestore.Timestamp.fromDate(new Date())
        };

        try{
            const result = await db.collection("paymentMode").doc(req.body.DisplayName.toLowerCase()).set(fb_PaymentMode);
            res.send("Record saved successfuly");
        } catch(error) {
            res.status(400).send(error.message);
        }
    } else {
        return res.status(400).json({ PaymentMode: "PaymentData already exists" });  
    }

};

//display PaymentModeList
exports.paymentMode_List =  async(req,res) => {
    const snapshot = await db.collection("paymentMode").get();
    const paymentModeArray = [];

    if(snapshot.empty){
        res.status(404).send("No bankdata found");
    } else{
        snapshot.forEach(doc => {
               const paymentMode_data = new BankAccountData(
                doc.data().displayName,
                doc.data().type,
                doc.data().amount,
                doc.data().openingBalance,
                doc.data().createdBy,
                doc.data().modifiedBy,
                doc.data().createdDate,
                doc.data().modifiedDate
            );
            paymentModeArray.push(paymentMode_data); 
        })
        res.send(paymentModeArray);
    }
};