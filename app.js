const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");
const https = require("https");
const { dirname } = require("path");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/8e799b2a6b"
    const options = {
        method: "POST",
        auth: "Ziad:9e696e30268f85e040b501728c1a7893-us21"
    }

    const request = https.request(url, options, function (response) {
       
        if ( response.statusCode === 200 ){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }
       
    })
    app.post("/failure", function(req, res) {
        res.redirect("/")
    })

    request.write(jsonData);
    request.end();


})







app.listen(process.env.PORT || 3000, function () {
    console.log("server started");
});



// 9e696e30268f85e040b501728c1a7893-us21
// mailchimp api key


// 8e799b2a6b
// list id