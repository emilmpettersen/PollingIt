import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  // ping to confirm connection
  await client.db("admin").command({ ping: 1 });
  console.log("successfully connected to mongodb!");
} catch (err) {
  console.error(err);
}

let db = client.db("polls");

export default db;
