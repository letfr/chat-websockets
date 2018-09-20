const socket = io.connect("https://chat-maluco.herokuapp.com/"||"http://localhost:3003");

let elements = {
  message: document.getElementById("message"),
  handle: document.getElementById("handle"),
  btn: document.getElementById("send"),
  output: document.getElementById("output"),
  feedback: document.getElementById("feedback")
};

elements.btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: elements.message.value,
    handle: elements.handle.value
  });
  elements.message.value = "";
});

elements.message.addEventListener("keypress", () => {
  socket.emit("typing", elements.handle.value);
})

socket.on("chat", (data) => {
  elements.feedback.innerHTML = "";
  elements.output.innerHTML += `<p class="msg"><strong>${data.handle}:</strong> ${data.message}</p>`;
});

socket.on("typing", (data) => {
  elements.feedback.innerHTML = `<p><em>${data} is typing...</em></p>`;
})
