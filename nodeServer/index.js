// const io = require('socket.io')(8000)
const io = require('socket.io')(8000, {
    cors: {
      origin: "https://realtime-chat-website.vercel.app/", // Allow your front-end origin
      methods: ["GET", "POST"]
      }
    })



const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id] = name;
        console.log(name);
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})

