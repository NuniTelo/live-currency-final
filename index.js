var express = require("express");
var app = new express();

app.use(express.static(__dirname+"/dist"));

app.get ("/chart",function(req,res){
	res.redirect("/chart");
});
app.get ("/chartEuLek",function(req,res){
	res.redirect("/chartEuLek");
});
app.listen(process.env.PORT || 8080);

