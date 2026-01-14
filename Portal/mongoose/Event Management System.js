const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const eventDb = async()=>{
    await mongoose.connect("mongodb://localhost:27017/Event-Manage")
                          .then(()=> console.log("Mongo Connected"))
}

eventDb();

const eventSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : [3,"Min 3 characters required"],
        maxLength : [50,"Max 50 characters required"]
    },
    date : {
        type : Date,
        validate : {
            validator : function(v){
                return v > new Date();
            },
            message : 'Event date must be in the future'
        }
    },

    venue : String,

    participants : {
        type : [String],
        validate : {
            validator : function(v){
                return Array.isArray(v) && v.length > 0;
            },
            message : "At least one participant must be added"
        }
    },

    ticketPrice : {
        type : Number,
        Max : [9999,"max value of the ticket should be 9999"],
        validate : {
            validator : function(v){
                return v > 0;
            },
            message : "Ticket price must be positive"
        }
    }
})

eventSchema.pre("save",function(next){
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
    next();
})

eventSchema.post("save", function(doc) {
  console.log("Event added successfully.");
});

const eventModel = mongoose.model("Event",eventSchema);

app.post("/add-event",async(req,res)=>{
    const addEv = await eventModel(req.body).save();
    res.status(201).json({
        status : "Success",
        event : addEv
    });
})

app.get("/view",async(req,res)=>{
    const viewEv = await eventModel.find();

    res.status(200).json({
        success : true,
        EventView : viewEv
    });
})

app.put("/update-event/:name",async(req,res)=>{
    const updEv = await eventModel.findOneAndUpdate(
        {name : req.params.name},
        {$set : req.body},
        {new : true}
    )

    if(!updEv){
        return res.status(404).json({
            status : "Error",
            message : "Event Not Found"
        });
    }

    res.status(200).json({
        success : true,
        UpdatedEvent : updEv
    });
})

app.get("/delete-event/:name",async(req,res)=>{
    const deleteEv = await eventModel.deleteOne(
        {name : req.params.name}
    )

    res.status(200).json({
        status : "Success",
        message : "Event Data Deleted",
        deletedEvent : deleteEv
    })
})

app.get("/view-event-specificVenue/:venue",async(req,res)=>{
    const venueSpecEv = await eventModel.findOne(
        {venue : req.params.venue}
    )

    res.status(200).json({
        success : true,
        Event_BasedOn_Venue : venueSpecEv
    })
})

app.listen(5353,()=>{
    console.log("server at http://localhost:5353");
})