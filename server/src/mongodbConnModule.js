var mongoose = require('mongoose');

<<<<<<< HEAD
module.exports.connect = function() {
	mongoose.connect('mongodb://localhost:27017/vue-meetings');
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log("Connection Succeeded");
=======
const database = "vue-meetings"
module.exports.connect = function() {
	mongoose.connect('mongodb://localhost:27017/'+database);
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log(`Connection to ${database} Succeeded`);
>>>>>>> 573250f1b5048d92c848a02f3b24dc105c5a3ab3
	});
	return db;
}