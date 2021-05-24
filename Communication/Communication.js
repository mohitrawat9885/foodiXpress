const { promisify } = require("util");
const jwt = require("jsonwebtoken");

global.channels = [];

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return;
    }
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    socket.tokenId = decodedToken.id;
    next();
  } catch (err) {
    console.log("Token Error", err);
  }
});

io.on("connection", (socket) => {
  global.channels[socket.tokenId] = socket.id;
  console.log("Client Connected", channels);
  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});
