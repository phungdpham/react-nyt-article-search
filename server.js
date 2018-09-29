const express = require("express");
const mongoose = require("mongoose");
const bluebird = require ("bluebird");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 3001;
mongoose.Promise = bluebird;
const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
} else {
    app.use(express.static(__dirname + "/client/public"));
}

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
});

//Routing
var articlesController = require("./server/controller.delete");
var router = new express.Router();

router.get("/api/saved", articlesController.find);
router.post("/api/saved/:id", articlesController.insert);
router.delete("/api/saved/:id", articlesController.delete);
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(router);

const db = process.env.MONGO_URI || "mongodb://localhost/nytreact";
mongoose.connect(db, function(err) {
    if(err) {
        console.log(err)
    }
});

app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);

})