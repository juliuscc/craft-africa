// Retrieve
var Mongo = require('mongodb');

// Connect to the db
Mongo.MongoClient.connect("mongodb://localhost:27017/myTestDB", function(err, db) {
  if(!err) {
    console.log("We are connected");
    var collection = db.collection("movie")

    console.log(collection.find({}))
  }
})