const express = require('express');
const app = express();
app.listen(3000, () => { console.log("Server Started")})
app.use(express.urlencoded({extended:true}))                
// app.use(express.static(path.join(__dirname, 'src'))); 

app.get('/', (req,res) => { res.send()})






// *************************************** NOTES *****************************************************






// app. get, post, put, delete, use, option

// we use "put"  ->   when we want to EDIT.

// Relative Path  ->  we only know the end location where the file is located, we don't know the full path.
// Absolute Path  ->  We know the full location where the file is located.

// During "res.sendFile"   ->   it's going in STREAM 
    // Therefore, we use either ->   Path.join()
    //                     or   ->   directly give the full absolute path.

// "res.json"   ->     if we, want to send JSON Data.

// app.use(express.urlencoded({extended:true}))    ->   it internaly uses "qs".   // it's true  ->  when we will use nested Data.
//  NOTE:-  IF "extended:false"     ->                  it uses "querystring".  
//                                ->  it converts the "url" into an object (into readable form).




/*    DYNAMIC ROUTING


SUPPOSE:- 
        url:-  localhost:3000/student/varun/1001
                             /student/raj/1002
                             /student/gautam/1003

    NOTE:- the "name" & "id" is changing constantly  

            HERE, "/student"        ->      BASIC ROUTE
                  "/name" & "/id"   ->      DYNAMIC ROUTE

SO,

req.get('/student/:name/:id', (req,res))

WHEN we use ":" in a route it becomes DYNAMIC in NATURE.

here, "/student"  ->  STATIC (will not change).

    ":/name" , ":/id"  ->   DYNAMIC (will change everytime for new user)

*/