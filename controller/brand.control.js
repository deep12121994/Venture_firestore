const { collection } = require("./../db");
const db = require("./../db");


// Brand creation
exports.brand_Registration =async (req, res) => {

    const brandRef = db.collection('brand').doc(req.body.BrandName.toLowerCase());
    const doc = await brandRef.get();
    if (!doc.exists) {
        const fb_Brand = {
            brandName: req.body.BrandName
        };

        try{
            const result = await db.collection("brand").doc(req.body.BrandName.toLowerCase()).set(fb_Brand);
            res.send('Record saved successfuly');
        } catch(error) {
            res.status(400).send(error.message);
        }

    } else {
        return res.status(400).json({ Brand: "Brand already exists" });  
    }

};

// Brand_list
exports.brand_List =  async(req,res) => {
    const snapshot = await db.collection("brands").get();
    const brandArray = [];

    if(snapshot.empty){
        res.status(404).send('No brand found');
        console.log("Brand not found");
    } else{
        console.log("Brand found"+snapshot);
        snapshot.forEach(doc => {
                const brand = new Brand(
                    doc.data().brandName,
            );
            brandArray.push(brand); 
        })
        res.send(brandArray);
    }
};