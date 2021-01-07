const db = require("./../db");
const admin = require("firebase-admin");
const Products = require("../model/product");

//product creation
exports.product_Registration =async (req, res) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yy = today.getFullYear().toString().substr(-2);
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var hr = today.getHours();
    var millisec = today.getMilliseconds();


    today =  yy + mm + dd + hr + min + sec + millisec;

    const productRef = db.collection("products").doc(req.body.ProductName.toLowerCase());
    const doc = await productRef.get();
    if (!doc.exists) {
        const fb_Product = {
            productName: req.body.ProductName,
            brand: req.body.Brand,
            itemLocation:req.body.ItemLocation,
            qty: req.body.Qty,
            salePrice: req.body.SalePrice,
            saleTaxInEx: req.body.SaleTaxInEx,
            purchasePrice: req.body.PurchasePrice,
            purchaseTaxInEx: req.body.PurchaseTaxInEx,
            gstpercentage: req.body.GstPercentage,
            createdBy: req.body.CreatedBy,
            modifiedBy: req.body.ModifiedBy,
            createdDate: admin.firestore.Timestamp.fromDate(new Date()),
            modifiedDate: admin.firestore.Timestamp.fromDate(new Date())
        };

        try{
            const result = await db.collection("products").doc(req.body.ProductName.toLowerCase()).set(fb_Product);
            res.send("Record saved successfuly");
        } catch(error) {
            res.status(400).send(error.message);
        }
    } else {
        return res.status(400).json({ Product: "Product already exists" });  
    }

};

//display productList
exports.product_List =  async(req,res) => {
    const snapshot = await db.collection("products").get();
    const productArray = [];

    if(snapshot.empty){
        res.status(404).send("No product found");
    } else{
        snapshot.forEach(doc => {
               const product_data = new Products(
                doc.data().productName,
                doc.data().brand,
                doc.data().itemLocation,
                doc.data().qty,
                doc.data().salePrice,
                doc.data().saleTaxInEx,
                doc.data().purchasePrice,
                doc.data().purchaseTaxInEx,
                doc.data().gstpercentage,
                doc.data().createdBy,
                doc.data().modifiedBy,
                doc.data().createdDate,
                doc.data().modifiedDate
            );
            productArray.push(product_data); 
        })
        res.send(productArray);
    }
};