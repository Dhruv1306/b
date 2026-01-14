const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json())

//this is a function to make a database name "Employee-Payroll"
const employeeDB = async()=>{
    await mongoose.connect("mongodb://localhost:27017/Employee-Payroll")
                            .then(()=> console.log("Mongo Connected"))
                            .catch((err)=> console.log("Mongo Error : ",err)) //this error handling of mongoose
}

//this a schema on how data should be in the database
const empSchema = mongoose.Schema({
    //here in the schema we provide details of data should be and the validations we need on the data
    name : {
        type : String,
        required : true,
        minlength : [3,"Min - 3 Characters required"],
        maxlength : [50,"Max - 20 characters required"]
    },
    empId : {
        type : Number,
        required : true,
        unique : true
    },
    department : String,
    salary : {
        type : Number,
        min : [10000, "Min - 10000 salary required"],
        validate : {
            validator : (v) => v % 1000 === 0,
            message : "Salary must be multiple of 1000"
        }
    },
    JoiningDate : String
})

//pre middleware hook
empSchema.pre("save",function(next){
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
    next();
})

//here with the help of model we make a collection named "Employee" in which CRUD function can be performed
const emp = mongoose.model("Employee",empSchema);

employeeDB(); //this is calling function to initiate the database

//this code is to add the data of employee in the database which we get from the req.body
app.post("/add-employee",async(req,res)=>{
    //console.log(req.body);
    
    const newEmp = await emp(req.body).save(); //save() helps in saving the data we get from ThunderClient
    res.status(201).json({
        status : "Success",
        user : newEmp
    })
})

//to view all the employees data
app.get("/view-employees",async(req,res)=>{
    const allEmp = await emp.find(); //to view the data using find() function
    res.status(200).json({
        status : "Success",
        Employees : allEmp //we will get to see data in json format here
    })
})

//to view the employee data by their id
app.get("/view-employee-byId/:id",async(req,res)=>{
    const EmpById = await emp.findOne({ empId: parseInt(req.params.id) }); //getting employee data using findOne()
    
    //if the employee id is wrong and employee is not found
    if(!EmpById){
        return res.status(404).json({
            status : "Error",
            message : "Employee Not Found"
        });
    }
    res.status(200).json({
        status : "Success",
        EmployeeById : EmpById //this will show the data
    });
})

//to update the value of employee data  by using their unique ID
app.put("/update-employee/:empId",async(req,res)=>{
    const updatedEmp = await emp.findOneAndUpdate( //finding the employee and updating it using findOneAndUpdate()
        {empId : parseInt(req.params.empId)},
        {$set : req.body}, //this will help us to decide what we need to update by taking it directly from the req.body
        {new : true} //this new true helps in putting new value on updating
    );

    //if employee is not found
    if(!updatedEmp){
         return res.status(404).json({
            status : "Error",
            message : "Employee Not Found"
        });
    }

    res.status(200).json({
        status : "Success",
        updatedEmployee : updatedEmp //to show the updated Data
    })
})

//to emp using its id
app.get("/delete-employee/:empId",async(req,res)=>{

    const deleteEmp = await emp.deleteOne(
        {empId : parseInt(req.params.empId)}
    )

    res.status(200).json({
        status : "Success",
        message : "Employee Data Deleted",
        deletedDataOf : deleteEmp
    })
})

//now to get average salary of all the employee
app.get("/average-salary", async (req, res) => {
    const result = await emp.aggregate([ //here aggregate helps in calculating the average salary
        {
            $group: {
                _id: null,
                averageSalary: { $avg: "$salary" },
                count: { $sum: 1 }
            }
        }
    ]);

    res.status(200).json({
        status: "Success",
        averageSalary: result[0]?.averageSalary || 0, //to print avg salary
        employeeCount: result[0]?.count || 0 //to print emp count
    });
});

app.listen(4053,()=>{
    console.log("Server running at http://localhost:4053");
})