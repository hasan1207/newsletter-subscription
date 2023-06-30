const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

//app.use(bodyParser.apply())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    //console.log("Server is up and running.");
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const firstName = req.body.fn;
    const lastName = req.body.ln;
    const eMail = req.body.em;
    if(firstName === "" || lastName === "" || eMail === ""){
        res.sendFile(__dirname + "/failure.html");
    }

    var data = {
        members: [
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
            
        ]
    }
    
    var url = "https://us20.api.mailchimp.com/3.0/lists/bce28ee213";
    var options = {
        method: "POST",
        auth: "hasan1:e703749ff68b75beddd6f1122b4c2979-us20"
    };
    var jsonData = JSON.stringify(data);
    var code;
    const request = https.request(url, options, (response) => {
        //code = response.statusCode;
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", (data) => {
            //console.log(JSON.parse(data));
        });

    });

    request.write(jsonData);

    request.end();
    //console.log(firstName + " " + lastName + " " + eMail);
    // if(code == 200){
    //     //res.sendFile(__dirname + "/success.html");
    //     console.log(code);
    // }
    // else{
    //     //res.sendFile(__dirname + "/failure.html");
    //     console.log(code);
    // }
    //res.send(jsonData);
    //res.write(request);
    //res.write(jsonData);
    //res.send("catsi");
});

app.post("/failure", (req, res) => {
    res.redirect("/");
})


app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});

//List key: bce28ee213
//API Key: e703749ff68b75beddd6f1122b4c2979-us20
