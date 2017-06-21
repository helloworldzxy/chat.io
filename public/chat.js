/**
 * Created by zhangxinyu on 21/06/2017.
 */
window.onload = function(){
    //io.connect()类似于new WebSocket,且更智能。没有传参则会尝试向页面所在主机发起连接。
    var socket = io.connect();
}