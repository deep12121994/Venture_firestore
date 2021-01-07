const db = require("./../db");
const admin = require("firebase-admin");
const ChequeData = require("../model/cheque");


//cheque creation
exports.cheque_Registration =async (req, res) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yy = today.getFullYear().toString().substr(-2);
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var hr = today.getHours();
    var millisec = today.getMilliseconds();


    today =  yy + mm + dd + hr + min + sec + millisec;
    
    const fb_ChequeData = {
        chequeId : today, 
        partyName : req.body.PartyName,
        inOut : req.body.InOut,
        amount : req.body.Amount,
        refOrderId : today,
        refOrderType : req.body.RefOrderType,
        status : req.body.Status,
        modeRef : req.body.ModeRef,
        paymentFromOrToRef : req.body.PaymentFromOrToRef,
        createdBy : req.body.CreatedBy,
        modifiedBy : req.body.ModifiedBy,
        createdDate : admin.firestore.Timestamp.fromDate(new Date()),
        modifiedDate : admin.firestore.Timestamp.fromDate(new Date())
    };

    try{
        const result = await db.collection("cheque").doc(today).set(fb_ChequeData);
        res.send("Record saved successfuly");
    } catch(error) {
        res.status(400).send(error.message);
    }

};

//display ChequeList
exports.cheque_List =  async(req,res) => {
    const snapshot = await db.collection("cheque").get();
    const chequeArray = [];

    if(snapshot.empty){
        res.status(404).send("No cheque found");
    } else{
        snapshot.forEach(doc => {
               const cheque_data = new ChequeData(
                doc.data().chequeId,
                doc.data().partyName,
                doc.data().inOut,
                doc.data().amount,
                doc.data().refOrderId,
                doc.data().refOrderType,
                doc.data().status,
                doc.data().modeRef,
                doc.data().paymentFromOrToRef,
                doc.data().createdBy,
                doc.data().modifiedBy,
                doc.data().createdDate,
                doc.data().modifiedDate
            );
            chequeArray.push(cheque_data); 
        })
        res.send(chequeArray);
    }
};