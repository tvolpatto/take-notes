var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
var app = express();
var PORT = 3000;

// App configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//need it to load the css
app.use('/public', express.static('public'));

 
//------------------- Begin Routes -------------------\\
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  fs.readFile('./db/db.json', "utf-8", (err, data) => {
    if(err)  throw err;
    
    return res.json(JSON.parse(data));
  });
});

app.post("/api/notes", function(req, res) {
   const newNote = req.body;
   fs.readFile('./db/db.json', "utf-8", (err, data) => {
     if(err)throw err;;
     
     let notes = [];  
     if(data!=="")  notes = JSON.parse(data);
   
     let nextId = 1;
     
     if(notes.length > 0 ) {
       nextId = notes[notes.length-1].id +1;
     }  
     newNote.id= nextId;
     
     notes.push(newNote);
     
     fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
       if(err) throw err;    
       return res.status(200).send("Note added!");  
     });  
   });
 });
//-------------------- End Routes --------------------\\

// Listening PORT 
app.listen(PORT, function() {
  console.log("Server running! PORT: " + PORT);
});
