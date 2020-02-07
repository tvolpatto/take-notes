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
//-------------------- End Routes --------------------\\

// Listening PORT 
app.listen(PORT, function() {
  console.log("Server running! PORT: " + PORT);
});
