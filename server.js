var mosca = require('mosca')
 
 
//here we start mosca
var http     = require('http')
  , httpServ = http.createServer()
  , mosca    = require('mosca')
  , server = new mosca.Server({});

server.attachHttpServer(httpServ);

httpServ.listen(3000);

server.on('ready', setup);

var authenticate = function(client, username, password, callback) {
	var authorized = (username === 'user' && password.toString() === 'password');
	if (authorized) client.user = username;
	callback(null, authorized);
} 

// fired when the mqtt server is ready
function setup() {
	// Accepts the connection if the username and password are valid
	server.authenticate = authenticate;
	console.log('Mosca server is up and running')
}
 
// fired whena  client is connected
server.on('clientConnected', function(client) {
	console.log('client connected', client.id);
	});
 
// fired when a message is received
server.on('published', function(packet, client) {
	console.log('Published : ', packet.payload.toString());
	});
 
// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
	console.log('subscribed : ', topic);
	});
 
// fired when a client subscribes to a topic
server.on('unsubscribed', function(topic, client) {
	console.log('unsubscribed : ', topic);
	});
 
// fired when a client is disconnecting
server.on('clientDisconnecting', function(client) {
	console.log('clientDisconnecting : ', client.id);
	});
 
// fired when a client is disconnected
server.on('clientDisconnected', function(client) {
	console.log('clientDisconnected : ', client.id);
	});

