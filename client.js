
let Chain = require("./chain.js");
const readline = require("readline");
const net = require("net");

let chain = new Chain();
const socket = net.connect(8080, "localhost");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Message {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}

let parseToAddedMessage = (buffer, type) => {
    let data = buffer.split(" ")[1];
    let message = new Message(type, null);
    message.data = chain.addBlock(data);

    return message;
}

let parseToReplacedMessage = (type) => {
    let message = new Message(type, null);
    message.data = chain.block_chain;

    return message;
}

socket.on("connect", () => {
    console.log("Connected to Server!");

    rl.on("line", function(line) {
        if(line.indexOf("add ") == 0) {
            socket.write(JSON.stringify(parseToAddedMessage(line, "last")));
        
        } else if(line == "len") {
            console.log("length : " + chain.block_chain.length);
        }
    
    }).on("close", function() {
        // nothing to do
    });      
});

socket.on("data", (data) => {
    console.log("data : ", data.toString());

    let parsed_data = JSON.parse(data.toString());

    if(parsed_data.type == "last") {
        let block = chain.addSentBlock(parsed_data.data);

        if(!block) {
            console.log("added failed.");

            socket.write(JSON.stringify(parseToReplacedMessage("all")));
        }
    
    } else if(parsed_data.type == "all") {
        let block_chain = chain.replaceChain(parsed_data.data);

        if(!block_chain) {
            console.log("replaced failed.");
        }
    }
});

socket.on("close", () => {
    console.log("Disconnected to Server!");
});

socket.on("error", (err) => {
    console.error("error : " + err);
});