var mongoose = require('mongoose');

//const database = "products"
const database = "vue-meetings"
module.exports.connect = function() {
	mongoose.connect('mongodb://localhost:27017/'+database);
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log(`Connection to ${database} Succeeded`);
	});
	return db;
}