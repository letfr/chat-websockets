const socket = io.connect("http://localhost:3003");

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
});

elements.message.addEventListener("keypress", () => {
  socket.emit("typing", elements.handle.value);
})

socket.on("chat", (data) => {
  elements.feedback.innerHTML = "";
  elements.output.innerHTML += `<p><strong>${data.handle}:</strong>${data.message}</p>`;
});

socket.on("typing", (data) => {
  elements.feedback.innerHTML = `<p><em>${data} is typing...</em></p>`;
})
