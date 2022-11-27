const {connectToCluster} = require("./server");

async function addUser(user) {
  const uri = process.env.MONGODB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("data");
    const collection = db.collection("users");

    await createStudentDocument(collection, user);
  } finally {
    await mongoClient.close();
  }
}

async function createStudentDocument(collection, user) {
  await collection.insertOne(user);
}

module.exports = addUser;
