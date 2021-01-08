const db = require("./../db");
const admin = require("firebase-admin");


exports.user_Registration =async (req, res) => {

    const userRef = db.collection('users').doc(req.body.Name.toLowerCase());
    const doc = await userRef.get();
    if (!doc.exists) {
        const fb_Users = {
            Name: req.body.Name, 
            Number: req.body.Phone,
            Email: req.body.Email
        };

        try{
            const result = await db.collection("users").doc(req.body.Name.toLowerCase()).set(fb_Users);
            res.send('Record saved successfuly');
        } catch(error) {
            res.status(400).send(error.message);
        }

    } else {
        return res.status(400).json({ User: "User already exists" });  
    }

};



exports.login =  async(req, res) => {

    const snapshot = await db.collection("users").doc(req.body.Name.toLowerCase()).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }  
    
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        return res.send({message : "record found"});
    });

        
};

exports.find_User =  (req,res) => {
    userModel.find({Email : {$regex: ".*" + req.body.Email + ".*" }}, (err,docs) => {
        if(!err)
        { 
            console.log(docs);
            res.render("list", {data : docs});
        }else{
            res.send("Error");
        }
    }).lean();
};

exports.update_User = (req, res) => {
    userModel.updateOne({Email:req.body.Email}, async(err, user) => {
        try{            
            const user = await db.collection("users").doc("24OGq1yXIJbBQJV3Jm6J");
            const result = await user.update({
                First_Name: "Deepali",
            });
            return res.send(result);
        } catch(error) {
            res.status(400).send(error.message);
        }
    });
 };
 
exports.user_List =  (req,res) => {
    userModel.find(async(err,docs) => {
        const snapshot = await db.collection("users").get();
        const userArray = [];

        if(snapshot.empty){
            res.status(404).send('No user found');
            console.log("User not fount");
        } else{
            console.log("User fount"+snapshot);
            snapshot.forEach(doc => {
                   const user = new User(
                       doc.data().firstName,
                       doc.data().lastName,
                       doc.data().number
                );
                userArray.push(user); 
            })
            res.send(userArray);
        }
         
    }).lean()
};

exports.remove_User = (req, res) => {
    userModel.deleteOne({Email: req.body.Email}, (err, user) => {
        if(err) {
            res.send("Error");
        }else{
            res.status(200).send({message : "User deleted successfully"});
        }
    });
};

