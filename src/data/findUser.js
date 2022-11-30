const { connectToCluster } = require("./server");

async function findUserByID(id) {
  const uri = process.env.DB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("data");
    const collection = db.collection("users");

    return await readStudentDocumentByID(collection, id);
  } finally {
    await mongoClient.close();
  }
}

async function readStudentDocumentByID(collection, id) {
  const cursor = collection.find({ _id: id });
  const results = await cursor.toArray();
  return results;
}

async function findUserByEmail(email) {
  const uri = process.env.DB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("data");
    const collection = db.collection("users");

    return await readStudentDocumentByEmail(collection, email);
  } finally {
    await mongoClient.close();
  }
}

async function readStudentDocumentByEmail(collection, email) {
  const cursor = collection.find({
    email: email,
  });
  const results = await cursor.toArray();
  return results;
}

module.exports = {
  findUserByID,
  findUserByEmail,
};
