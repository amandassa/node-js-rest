const consign = require("consign");
const express = require("express");

module.exports = () => {
    const app = express();
    consign().include("controllers").into(app);
    return app;    
}