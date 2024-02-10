var stompClient = null;

function connect() {
    var socket = new SockJS('/ws-chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/public', function (chatMessage) {
            showMessage(chatMessage.body, 'chat');
        });
 /*       stompClient.subscribe('/topic/summarization', function (summarizationMessage) {
            showMessage(summarizationMessage.body, 'summarization');
        });
        stompClient.subscribe('/topic/extractEntities', function (extractEntitiesMessage) {
            showMessage(extractEntitiesMessage.body, 'extract-entities');
        });*/
    });
}

function showMessage(message, topic) {
    var messageDiv = document.createElement('div');
    var messageData = JSON.parse(message);
    var messageContentElement = document.createElement('p');
    messageContentElement.classList.add('message-content');
    messageContentElement.textContent = messageData.content;
    messageDiv.appendChild(messageContentElement);
    document.getElementById(topic).appendChild(messageDiv);
}

document.getElementById('message-form').addEventListener('submit', function (event) {
    event.preventDefault();
    sendMessage(document.getElementById('message-input').value, 'chat');
    document.getElementById('message-input').value = '';
});

/*document.getElementById('summarization-message-form').addEventListener('submit', function (event) {
    event.preventDefault();
    sendMessage(document.getElementById('summarization-message-input').value, 'summarization');
    document.getElementById('summarization-message-input').value = '';
});*/

/*document.getElementById('extract-entities-message-form').addEventListener('submit', function (event) {
    event.preventDefault();
    sendMessage(document.getElementById('extract-entities-message-input').value, 'extract-entities');
    document.getElementById('extract-entities-message-input').value = '';
});*/

function sendMessage(message, topic) {
    console.log(message);
    if (topic === 'chat') {
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify({'content': message}));
    } else if (topic === 'summarization') {
        stompClient.send("/app/summarization.sendMessage", {}, JSON.stringify({'content': message}));
    } else if (topic === 'extract-entities') {
        stompClient.send("/app/extractEntities.sendMessage", {}, JSON.stringify({'content': message}));
    }
}

window.onload = function () {
    connect();
};
