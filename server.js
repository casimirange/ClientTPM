/**
 * Created by Casimir on 20/10/2020.
 */
/** serveur Express JS*/
const express = require("express");
const app =  express();
const path = require("path");
const request = require("request");

app.use(express.static(__dirname + "/dist/ClientTPM"))

app.listen(process.env.PORT || 4200)

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/ClientTPM/index.html"))
})

console.log("App is listening");
// const wakeUpServerInterval = setInterval(wakeUpServer, 25 * 60 * 1000);
//
// function wakeUpServer() {
//     const now = new Date();
//     var endHour = new Date();
//     endHour.setHours(25, 30, 0);
//
//     if(now < endHour){
//         request(
//
//         )
//     }
// }