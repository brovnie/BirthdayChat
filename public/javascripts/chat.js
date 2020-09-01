let primus = new Primus();
let chatForm = document.getElementById("chat-form");

primus.on('data', (data) => {
    console.log(data);

    displayMessage(data);
});

// Send text message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let msg = e.target.elements.message.value;
    let data = {
        message: msg,
        username: chatForm.dataset.username
    }
    primus.write(data);
});

let displayMessage = (msg) => {
    const div = document.createElement('div');
    //set time
    let day = new Date();
    let time = day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
    let user = msg.username;
    div.classList.add("chat-messages-item");
    if(msg.username == "system") {
        user = "";
        div.classList.add("system");
    }
    div.innerHTML = `<p class="metadata">${user}  <span>${time}</span></p>
        <p class="text-msg"> ${msg.message} </p>` ;
    document.querySelector('.chat-messages').appendChild(div);
}; 

