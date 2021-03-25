
let sockets = new Set();

const net = require("net");
const server = net.createServer((socket) => {
    console.log("Connected!");
    
    sockets.add(socket);

    socket.on("error", (err) => {
        console.log("Disconnected!");
    })

    socket.on("end", () => {
        console.log("Disconnected!");

        sockets.delete(socket);
    });

    socket.on("data", (data) => {
        console.log("data : " + data);

        for(let soc of sockets) {
            soc.write(data);
        }
    });
});

server.on("error", (err) => {
    console.log("error : " + err);
})

server.listen(8080, () => {
    console.log("Server started!");
});