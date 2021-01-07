const { collection } = require("./../db");
const db = require("./../db");


//Brand creation
exports.brand_Registration =async (req, res) => {

    const brandRef = db.collection("brand").doc(req.body.BrandName.toLowerCase());
    const doc = await brandRef.get();
    if (!doc.exists) {
        const fb_Brand = {
            brandName: req.body.BrandName
        };

        try{
            const result = await db.collection("brand").doc(req.body.BrandName.toLowerCase()).set(fb_Brand);
            res.send("Record saved successfuly");
        } catch(error) {
            res.status(400).send(error.message);
        }

    } else {
        return res.status(400).json({ Brand: "Brand already exists" });  
    }

};


//display BrandList
exports.brand_List =  async(req,res) => {
    const doc = await db.collection("brand").get();
    const brandArray = [];

    if (doc.empty) {
        res.status(404).send("No brandList found");
    } else {
        doc.forEach(doc => {
            brandArray.push(doc.data().brandName);
        });
        res.send(brandArray);
    }
};