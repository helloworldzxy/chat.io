# chat.io
《了不起的Node.js》chap-11 Socket.IO example

1. app initialization

客户端与服务端通过Socket.IO成功建立连接，并在服务端打印日志提示"Someone connected".

2. chat with others successfully

广播用户加入的信息。

非用户发送的信息--通告(利用socket.broadcast)。

客户端先询问用户名字，用户连接成功后再显示聊天窗口。

---

server.js和chat.js中都可以使用`socket.emit`来分发事件传递信息。

如：

客户端在用户连接成功之后分发`join`事件给服务器，

服务器监听`join`事件，收到用户名后广播`announcement`事件给客户端，

客户端监听`announcement`事件，在页面显示出有新用户加入的提示信息。

又如：

客户端通过提交表单来发送消息：所以要给提交表单绑定事件。在绑定的事件中：

自己发送消息，直接调用`addMessage`函数，实现在DOM显示消息内容。同时还要分发`text`事件给服务器以便让服务器广播给其他用户。

服务器监听`text`事件，然后广播分发`text`事件，同时传参用户名和消息内容（客户端回调函数的参数）。

客户端监听`text`事件，设置回调函数为`addMessage`即可在收到服务端广播的`text`事件后用传来的两个参数调用`addMessage`函数展示消息内容到DOM。


3. received ack

WebSocket不强制对每条所发信息做回应。如果要确认消息是否到达，需要在分发事件的时候提供回调函数，而且这个回调函数允许接收数据作为参数，所以考虑在服务器收到数据后，以发送回时间戳的形式放在回调函数参数中传给客户端。

获取`addMessage`函数创建的DOM元素，在收到确认消息后，在它后面显示一个小图标。
