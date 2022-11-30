const {connectToCluster} = require("./server");

async function editUser(user) {
    const uri = process.env.DB_URI;
    let mongoClient;
    
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db("data");
        const collection = db.collection("users");
    
        await updateStudentDocument(collection, user);
    } finally {
        await mongoClient.close();
    }
}

async function updateStudentDocument(collection, user) {
    await collection
        .updateOne(
            {_id: user._id},
            {$set: {classes: user.classes}},
            {upsert: true}
        );
}

module.exports = editUser;