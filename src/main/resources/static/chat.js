var stompClient = null;

function connect() {
    var socket = new SockJS('/ws-chat');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/public', function (chatMessage) {
            showMessage(JSON.parse(chatMessage.body).content);
        });
    });
}

function showMessage(message) {
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    document.getElementById('messages').appendChild(messageDiv);
}

document.getElementById('message-form').addEventListener('submit', function (event) {
    event.preventDefault();
    sendMessage(document.getElementById('message-input').value);
    document.getElementById('message-input').value = '';
});

function sendMessage(message) {
    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify({'content': message}));
}

window.onload = function () {
    connect();
};
