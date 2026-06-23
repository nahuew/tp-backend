const socket = io();

const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const onlineUsers = document.getElementById("onlineUsers");

let mySocketId = null;

socket.on("connect", () => {
    mySocketId = socket.id;
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = input.value.trim();

    if (!message) return;

    socket.emit("chat:message", {
        text: message,
        user: window.currentUser
    });

    input.value = "";
});

socket.on("users-online", (count) => {
    onlineUsers.textContent = `Usuarios conectados: ${count}`;
});

socket.on("chat:message", (data) => {
    const li = document.createElement("li");

    const isMine = data.socketId === mySocketId;

    li.classList.add("message");
    li.classList.add(isMine ? "message-own" : "message-other");

    li.innerHTML = `
        <div class="message-meta">
            <strong>${data.user}</strong>
            <span>${data.time}</span>
        </div>
        <div class="message-text">${data.text}</div>
    `;

    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
});