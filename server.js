/**
 * Created by Casimir on 20/10/2020.
 */
/** serveur Express JS*/
const express = require("express");
const app =  express();
const path = require("path");
const request = require("request");

app.use(express.static(__dirname + "/dist/ClientTPM"))