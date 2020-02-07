var express = require("express");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//------------------- Begin Routes -------------------\\
app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, "public/index.html"));
});
  
app.get("/notes", function(req, res) {
   res.sendFile(path.join(__dirname, "public/notes.html"));
});
//-------------------- End Routes --------------------\\

// Listening PORT 
app.listen(PORT, function() {
  console.log("Server running! PORT: " + PORT);
});