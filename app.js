//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["food", "eat", ];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {



 let day = date.getDay();

  res.render("list", {listTitle: day, newListItems: items  }); // "list" get the html from views/list.ejs
  //items the array where the todos are stored
});


app.post("/", function(req, res) {

  let item = req.body.newItem;

  if (req.body.list === "work") {   // list is the name of the button
    workItems.push(item);
    res.redirect("/work");

  } else {
    items.push(item);
    res.redirect("/");

  }


});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "work List",
    newListItems: workItems
  });
});


app.listen(3000, function() {
  console.log("Server stated on port 3000");
});
