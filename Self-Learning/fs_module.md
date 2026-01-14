## fs Module

1. **fs.readFile :-** *Reads* the file.          [ path, (encoding), callback ]        callback  ->  err, data
2. **fs.writeFile :-** *Write* the file. If doesn't exist it will *create one too*.          [ path, data, callback ]
3. **fs.unlink :-** *Deletes* the file           [ path, callback ]
4. **fs.mkdir :-**  *Make Directory*            [ path, callback ]
5. **fs.rmdir  (NOW DEPRICATED)  / fs.rm :-** *Remove Directory*        [ path, callback ]                  **NOTE:- Only WORKS IF Directory is Empty. To alter it forcefully, read the note below.
6. **fs.readdir :-** *Reads* the content of  a *directory*                 [ path, callback ]
7. **fs.access :-** Checks whether *file exist or not.*Also, c*hecks a user's permissions* for the file or directory          [ path, (mode), callback ]              "mode"  ->  specifies the accessibility ,i.e, whether the file/directory is read only, write only or both
8. **fs.appendFile :-** *Append data* to a file. Also, *create the file if it doesn't exist.*          [ path, data, callback ]
9. **fs.chmod :-**  *Changes the permission of a file.*               [ path, mode, callback ]
10. **fs.copyFile :-** *Copies* data from the *source* to the *destination.*           By default, destination is overwritten if it already exists.               [ src, dest, callback ]
11. **fs.cp :-** *Copies the entire directory* structure from *source* to *destination,* including *subdirectories & files.*                   [ src, dest, callback ]


NOTE:-  

* fs.rm :-   To delete NON-EMPTY Directories pass   ->   { recursive: true, force: true }      AS Argument too.
  		

* `recursive: true` → removes the directory and all its contents.
  * `force: true` → ignores errors like missing files or permission issues

⚠️ Be careful, cause It will delete everything with asking.
