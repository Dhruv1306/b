const express = require(express);
const app = express();
app.listen(3000, () => console.log("Temp's Server started"));
const { ObjectId } = require("bson");
const { MongoClient } = require("mongodb");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended : true }));
app.use(express.static("public"));
app.use(express.json());

let db;

const connectDB = async() => {
    try{
        let client = new MongoClient("mongodb://localhost:27017/");
        await client.connect();
        db = client.db("NameOurDB");
        console.log("Database Connected");
    } catch(error) {
        console.log(error);
    }
};

connectDB();

