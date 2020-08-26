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

    //get user
    let user = chatForm.dataset.firstname;

    div.classList.add("message-container");
    div.innerHTML = `<p><span>${user} </span>${time}</p>
        <p> ${msg.message} </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}; 

