const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
      origin:'http://localhost:3000',
      allow:["GET","POST"]  }
});

io.on('connection', socket => {
  socket.on('message', ({name,message}) => {
    io.emit('message', { name, message })
  })
})

httpServer.listen(4000);