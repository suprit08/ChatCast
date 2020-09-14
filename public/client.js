const socket = io()

//to accept username
let name;
do{
    name = prompt('Please enter your name :');
}while(!name);

//to send msg
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');


textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
});

function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }

    //append
    appendMessage(msg, 'outgoing');
    textarea.value='';
    scrollToBottom();

    //send to server via socket
    socket.emit('message', msg);
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markup; 
    messageArea.appendChild(mainDiv);
}


//Receive Messages

socket.on('message', ()=>{
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

//autoscroll to bottom while sending messages
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}