const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: "*" }
});

const motoboys = {};

io.on('connection', (socket) => {
  console.log('🔌 Nova conexão:', socket.id);

  // Vincula motoboy ao restaurante
  socket.on('motoboy-login', (data) => {
    motoboys[data.motoboyId] = {
      ...data,
      socketId: socket.id
    };
    console.log(`🛵 ${data.nome} conectado ao Jap Sushi`);
  });

  // Atualiza localização
  socket.on('update-location', (data) => {
    const motoboy = motoboys[data.motoboyId];
    if (motoboy) {
      io.to(motoboy.restauranteId).emit('location-update', {
        motoboyId: data.motoboyId,
        nome: motoboy.nome,
        position: data.position
      });
    }
  });

  // Restaurante conectado
  socket.on('restaurante-login', (restauranteId) => {
    socket.join(restauranteId);
    console.log(`🍣 ${restauranteId} pronto para receber dados`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor ouvindo na porta ${PORT}`);
});
