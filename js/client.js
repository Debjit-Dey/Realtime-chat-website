const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");


var audio = new Audio('chat.mp3');

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.appendChild(messageElement);
  if(position =='left'){
    audio.play(); 
  }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value= '';
});


let name = prompt("Enter your name to join");
if (!name) {
    name = "Anonymous"; // Fallback if the user cancels or leaves the prompt empty
  }
socket.emit('new-user-joined', name);

socket.on('user-joined',function (name) {
        append(`${name} joined the chat`, 'right');
    })

socket.on('receive',data =>{
        append(`${data.name}: ${data.message}`, 'left');
    })
socket.on('left',name =>{
        append(`${name} left the chat`, 'left');
    })

