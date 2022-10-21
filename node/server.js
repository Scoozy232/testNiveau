const express = require("express");
const app = express();
//middleware
app.use(express.json());
 
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
 


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://EmmaLoisel:toucan@cluster0.y10v2kc.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'teslaApi';
let db
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});

app.get('/tesla', async (req,res) => {
  try {
      const docs = await db.collection('tesla').find({}).toArray()
      res.status(200).json(docs)
  } catch (err) {
      console.log(err)
      throw err
  }
})

app.get('/tesla/:id', async (req,res) => {
  const id = parseInt(req.params.id)
  try {
      const docs = await db.collection('tesla').findOne({id})
      res.status(200).json(docs)
  } catch (err) {
      console.log(err)
      throw err
  }
})

app.post('/tesla', async (req,res) => {
  try {
      const teslaData = req.body
      const tesla = await db.collection('tesla').insertOne(teslaData)
      res.status(200).json(tesla)
  } catch (err) {
      console.log(err)
      throw err
  }
  
})
app.put('/tesla/:id', async (req,res) => {
  try {
      const id = parseInt(req.params.id)
      const replacementtesla = req.body
      const tesla = await db.collection('tesla').replaceOne({id},replacementtesla)
      res.status(200).json(tesla)
  } catch (err) {
      console.log(err)
      throw err
  }
})

app.patch('/tesla/:id', async (req,res) => {
  try {
      const id = parseInt(req.params.id)
      const replacementtesla = req.body
      const tesla = await db.collection('tesla').updateOne({id}, {$set: replacementtesla}, {upsert:true})
      res.status(200).json(tesla)
  } catch (err) {
      console.log(err)
      throw err
  } 
})

app.delete('/tesla/:id', async (req,res) => {
  try {
      const id = parseInt(req.params.id)
      const tesla = await db.collection('tesla').deleteOne({id})
      res.status(200).json(tesla)
  } catch (err) {
      console.log(err)
      throw err
  } 
})