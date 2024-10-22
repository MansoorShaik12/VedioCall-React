// ------------------------------  video call start ------------------------------
const http = require('http');

const socketIo = require('socket.io');

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(3001, { cors: true });



const rooms = {};

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId, userName) => {
    const isAdmin = !rooms[roomId];
    if (!rooms[roomId]) {
      rooms[roomId] = { admin: userId, participants: [] };
    }
    rooms[roomId].participants.push({ userId, userName, muted: false, videoOn: false });
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected', { userId, userName, isAdmin: false });
    socket.emit('admin-status', { userId, isAdmin });
    io.to(roomId).emit('participant-list', rooms[roomId].participants);
    socket.on('toggle-mic', (userId, muted) => {
      if (rooms[roomId]) {
        const participant = rooms[roomId].participants.find(p => p.userId === userId);
        if (participant) {
          participant.muted = muted;
          io.to(roomId).emit('participant-list', rooms[roomId].participants);
        }
      }
    });
    socket.on('toggle-video', (userId, videoOn) => {
      if (rooms[roomId]) {
        const participant = rooms[roomId].participants.find(p => p.userId === userId);
        if (participant) {
          participant.videoOn = videoOn;
          io.to(roomId).emit('participant-list', rooms[roomId].participants);
        }
      }
    });

    socket.on('send-message', ({ roomId, userName, message }) => {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const msg = { sender: userName, text: message, time };
      io.to(roomId).emit('receive-message', msg);
    });

    socket.on('disconnect', () => {
      if (rooms[roomId] && rooms[roomId].admin === userId) {
        io.to(roomId).emit('end-call');
        delete rooms[roomId];
      } else {
        socket.broadcast.to(roomId).emit('user-disconnected', userId);
        if (rooms[roomId]) {
          rooms[roomId].participants = rooms[roomId].participants.filter(participant => participant.userId !== userId);
          io.to(roomId).emit('participant-list', rooms[roomId].participants);
        }
      }
    });

    socket.on('sending-signal', (payload) => {
      io.to(payload.userToSignal).emit('receiving-signal', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on('returning-signal', (payload) => {
      io.to(payload.callerID).emit('receiving-returned-signal', { signal: payload.signal, id: socket.id });
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// ------------------------------  video call end ------------------------------
