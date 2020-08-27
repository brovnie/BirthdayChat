const Message = require("../modules/message");

const go = server => { 
    const Primus = require("primus");
    let primus = new Primus(server, {});
    
    primus.on('connection', spark => {
        //  here goes text?
        console.log("Connection...");
        let user = spark.id;
        spark.write({username:"system", message: "Welcome to chat!"});
        //for rest of the users
        primus.forEach( (spark, id, connections) => {
          if (spark.id == user) return;
          spark.write({username:"system", message: "New user!"});
        });
        //send data
        spark.on("data", function (data) {
          primus.write(data);
          saveInDB(data);
        });
      });
      let saveInDB = (data) => {
        let msg = { username: data.username, message: data.message }
        Message.create(msg, (err, message) => {
            if (err) {
                console.log(err);
            }
        });
      };
};

module.exports.go = go;
