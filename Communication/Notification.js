// const server = require("../app");
// const Authentication = require("./Authentication");
// const cors = require("cors");
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// io.use(Authentication.checkToken);

// io.on("connection", (socket) => {
//   console.log("Client Connected", socket.id);
//   socket.emit("message", "hello");
//   socket.on("disconnect", () => {
//     console.log("Client Disconnected");
//   });
// });

// exports.Notify = () => {
//   io.sockets.emit("message", "Order");
//   console.log("Notified");
// };
