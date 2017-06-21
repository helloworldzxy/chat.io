/**
 * Created by zhangxinyu on 21/06/2017.
 */
window.onload = function(){
    //io.connect()类似于new WebSocket,且更智能。没有传参则会尝试向页面所在主机发起连接。
    var socket = io.connect();

    //用户一旦连接成功就将聊天窗口显示出来，所以需要监听连接事件
    socket.on('connect', function(){
        //通过join事件发送用户名
        socket.emit('join', prompt('What is your nickname?'));

        //显示聊天窗口
        document.getElementById('chat').style.display = 'block';

        //客户端监听announcement事件，在DOM的消息列表中创建元素显示提示信息
        socket.on('announcement', function(msg){
            var li = document.createElement('li');
            li.className = 'announcement';
            li.innerHTML = msg;
            document.getElementById('messages').appendChild(li);
        });
    });

    function addMessage(form, text){
        var li = document.createElement('li');
        li.className = 'message';
        li.innerHTML = '<b>' + form + ' </b>: ' + text;
        document.getElementById('messages').appendChild(li);

        return li;
    }

    //获取输入框信息，提交时发送（触发text事件把消息内容传给服务器）
    var input = document.getElementById('input');
    document.getElementById('form').onsubmit = function(){

        //因为是自己提交消息，只需直接显示在DOM中，不需要获取服务器的返回消息。
        //获取li元素，以便给它添加确认发送成功的小图标
        var li = addMessage('me', input.value);

        //回调函数用于接收服务器发来的消息收到的确认
        socket.emit('text', input.value, function(date){
            li.className = 'confirmed';
            li.title = date;
        });

        //重置输入框
        input.value = '';
        input.focus();

        return false;
    };

    //如果接收到服务器分发的text事件，说明是服务器广播来的消息，是别的socket发给服务器的消息
    socket.on('text', addMessage);
};