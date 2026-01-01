const socket = io();

const messageform = document.getElementById("send-container");
const messageinput = document.getElementById("message-input");
const messsagecontainer = document.getElementById("message-container");

const name = prompt("Enter your name to join:");
socket.emit("new-user-joined", name);
appendSystemMessage("You joined the chat");

// Receive chat messages
socket.on("chat-message", data => {
  appendMessage(`${data.name}: ${data.message}`, "other");
});

// User joined
socket.on("user-joined", name => {
  appendSystemMessage(`${name} joined the chat`);
});

// User left
socket.on("user-left", name => {
  appendSystemMessage(`${name} left the chat`);
});

// Send message
messageform.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageinput.value;
  socket.emit("send-chat-message", { name, message });
  appendMessage(`You: ${message}`, "self");
  messageinput.value = "";
});

// Chat message UI
function appendMessage(text, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);
  messageElement.innerText = text;
  messsagecontainer.append(messageElement);
  messsagecontainer.scrollTop = messsagecontainer.scrollHeight;
}

// System message UI
function appendSystemMessage(text) {
  const msg = document.createElement("div");
  msg.classList.add("system-message");
  msg.innerText = text;
  messsagecontainer.append(msg);
  messsagecontainer.scrollTop = messsagecontainer.scrollHeight;
}
