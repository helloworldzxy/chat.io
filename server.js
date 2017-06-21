//reference to  https://socket.io/docs/

/**
 * module dependencies
 */
var http = require('http'),
    express = require('express'),
    sio = require('socket.io'),
    bodyParser = require('body-parser');

/**
 * create server
 */
var app = express();

/**
 * add middlewares
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

/**
 * attach socket.io to app
 * => any URLs started with /socket.io will be intercepted by socket.io
 */
var server = http.Server(app);
var io = sio(server);

server.listen(3000);

/**
 * set listeners for connection
 */
io.on('connection', function (socket) {
    console.log('Someone connected');

    //监听join事件，将收到的用户昵称通告其他用户(socket.broadcast)，提示有新用户连接进来了。
    socket.on('join', function(name){
        socket.nickname = name;
        //如果使用socket.emit: 仅将消息返回给客户端。
        //broadcast改变了emit函数的行为，将消息广播给其他所有用户。
        socket.broadcast.emit('announcement', name + ' joined the chat.');
    });

    socket.on('text', function(msg){
        socket.broadcast.emit('text', socket.nickname, msg);
    });
});

