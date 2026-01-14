// .find:- Finds the ellement in the array that user asked for AND return the FIRST one it finds.

// .findIndex:- Finds the index of the element in the array that user asked for AND return the FIRST one it finds.

// .findLast:- Finds the last element in the array that user asked for AND return the FIRST one it finds.

// Ternary operators :-  Never use {} in the Ternary operators

// Note:- We cannot use "return" inside a Variable assignment.

// .reduce:- Executes a reducer function (that you provide) on each element of the array, resulting in a single output value.

// existSync:- The fs.existsSync function works for both files and folders (directories). It returns true if the specified path exists, regardless of whether it is a file or a directory, and false if it does not exist.


/* 
fs.mkdir and fs.mkdirSync are Node.js methods used to create directories (folders):

fs.mkdir(path, options, callback) is asynchronous. It creates a directory at the specified path. The options can include { recursive: true } to create parent folders if they don't exist. The callback is called when the operation finishes, with an error if it fails.

fs.mkdirSync(path, options) is the synchronous version. It blocks execution until the directory is created. It also accepts { recursive: true } as an option.
*/


//path.join(a,b)

//__dirname

// ..

// fs.readFile

// fs.readdir :- // fs.readdir reads the contents of a directory asynchronously.

// fs.stateSync :-  Gets the info about the file. It returns a stats object, not a string. 

// .endsWith() :-  This method is for strings. It will not work with the stats objects.

// res.write = It just sends the data(the body) to the client.

//  res.writeHead :-  writeHead sets the HTTP response status code and headers (like content type) before sending any data. With this you don't need to ude setHeader and Status code Seperaely. 

// JSON.stringfy() :- It's a JavaScript method that converts a JavaScript object or value into a JSON-formatted string.  It is commonly used to send objects as JSON in HTTP responses or to store objects as text.

/* 

"The server should read and parse the incoming data" means:

When a client sends data to your server (for example, in a POST request), the server needs to:
1)  Read the data from the request body (using streams).
2)  Parse the data (convert it from a string or buffer into a usable format, like a JavaScript object—often using JSON.parse() if the data is JSON).
This allows your server to access and use the information sent by the client.

*/

// Methods like(POST/ PUT/ PATCH) are SAME THING.



// app.use(express.urlencoded({ extended: true }));   // This middleware is used to parse incoming REQUEST bodies in a middleware before your handlers, available under the req.body property. 
// The extended: true option allows for rich objects and arrays to be encoded into the URL-encoded format, which is useful for form submissions.

// app.use(express.json()); // This middleware is used to parse incoming JSON requests and make the parsed data available under req.body. It is useful for APIs that expect JSON payloads.