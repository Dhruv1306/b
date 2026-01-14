| S.no | SQL                                  | NOSQL                                                     |
| ---- | ------------------------------------ | --------------------------------------------------------- |
| 1.   | Tables                               | Documents :  {<br />id : 1,<br />name: abc<br />}        |
| 2.   | Database > Table > columns > Records | Cluster > Database > Collection > Document > Key > Values |
| 3.   | Schema✔️                           | Schema❌                                                  |
| 4.  |                                      |                                                           |

NOTE :- `Collections`  means  `Table`

---

1. Mongo DB erver :- It's a database server, which receives information & serves data locally / cloud.
2. MongoDB Compass :-It's GUI of MongoDB to view / edit / update / delete any data.
3. MongoDB Atlas :- It's GUI but works on cloud.
4. MongoDB : - A Js library to directly connect your JS server to MongoDB, with limited features.
5. Mongoose :- Library to connect Js to MongoDB, having vast features

---

SQL cmd :- Select * from tableName

NoSQL :-

1. Show database  ->
2. Use B  ->
3. Show Collections  ->
4. db.users.insertOne({ name : "Shaan"})  ->
5. db.users.find()    ->  It will find the user
6. db.users.find({name : "Shaan"})
7. db.users.updateOne({name : "Shaan", { $set : {age : 30 }}})   -> It will update / add a previously existing data
8. db.users.deleteOne({id : 1 })
9. db.users.find({ Salary : { $get : 35000 }})    // gt -> grater than, and  so we have other things like   lt, et, ete, lte...
