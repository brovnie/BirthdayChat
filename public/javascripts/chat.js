let primus = new Primus();
let chatForm = document.getElementById("chat-form"); 
/*
primus.on('reconnect', function () {
 console.log('primus: reconnect event happend');
});
 primus.on('open', function () {
   console.log('primus: connection established');

 });
 primus.on('error', function (err) {
   console.log('primus: error event', err);
 });
 primus.on('data', function (data) {
   console.log('primus: received data', data);
 });
 primus.on('end', function () {
   console.log('primus: connection closed');
 });*/

 primus.on('data', (data) => {
    console.log(data);
  });

 // Get text message
 chatForm.addEventListener('submit', (e) => {
     e.preventDefault();
     let msg = e.target.elements.message.value;
     console.log(msg);
     primus.write({ message: msg });
 })