var Hapi = require('hapi');

var server = new Hapi.Server(3000);

server.start(function(){
    console.log("Server running at 3000");
});