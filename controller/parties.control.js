const { collection } = require("./../db");
const db = require("./../db");
const admin = require('firebase-admin');

//product creation
exports.parties_Registration =async (req, res) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yy = today.getFullYear().toString().substr(-2);
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var hr = today.getHours();
    var millisec = today.getMilliseconds();


    today =  yy + mm + dd + hr + min + sec + millisec;

    const partyRef = db.collection("parties").doc(req.body.PartyName.toLowerCase());
    const doc = await partyRef.get();
    if (!doc.exists) {
        const fb_Party = {
            partyName: req.body.PartyName,
            phoneNo: req.body.PhoneNo,
            emailId:req.body.EmailId,
            gstNumber: req.body.GstNumber,
            due: req.body.Due,
            createdBy: req.body.CreatedBy,
            modifiedBy: req.body.ModifiedBy,
            createdDate: admin.firestore.Timestamp.fromDate(new Date()),
            modifiedDate: admin.firestore.Timestamp.fromDate(new Date())
        };

        try{
            const result = await db.collection("parties").doc(req.body.PartyName.toLowerCase()).set(fb_Party);
            res.send('Record saved successfuly');
        } catch(error) {
            res.status(400).send(error.message);
        }
    } else {
        return res.status(400).json({ Product: "Party already exists" });  
    }

};