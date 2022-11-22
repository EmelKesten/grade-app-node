const { connectToCluster } = require("./server");

async function getUsers() {
  const uri = "mongodb+srv://kestenemel:emy12153@cluster0.8meopda.mongodb.net/";
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("data");
    const collection = db.collection("users");

    return await readStudentDocument(collection);
  } 
  finally {
    await mongoClient.close();
  }
}

async function readStudentDocument(collection) {
  const cursor = collection.find();
  const results = await cursor.toArray();
  return results;
}

module.exports = getUsers;