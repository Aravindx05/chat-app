const socket=io("http://localhost:3000")
const messageform=document.getElementById('send-container')
const messageinput=document.getElementById('message-input')
const name=prompt("Enter your name to join:")
appendMessage("You joined")

socket.on("chat-message",message=>{
    appendMessage(message)
})

messageform.addEventListener('submit',e=>{
    e.preventDefault()
    const message=messageinput.value
    socket.emit('send-chat-message',message)
    messageinput.value=''
})

function appendMessage(message){
    const messageElement=document.createElement('div')
    messageElement.innerText=message
    document.body.append(messageElement)
}