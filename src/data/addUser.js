const {connectToCluster} = require("./server");
const uuid = require("uuid");

async function addUser(user) {
  const uri = "mongodb+srv://kestenemel:emy12153@cluster0.8meopda.mongodb.net/";
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
