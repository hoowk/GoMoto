const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*"
  }
});

// Armazena os dados
const motoboys = {};
const restaurantes = {};

io.on('connection', (socket) => {
  // Login do Motoboy
  socket.on('motoboy-login', (data) => {
    const { motoboyId, restauranteId } = data;
    motoboys[motoboyId] = {
      ...data,
      socketId: socket.id,
      restauranteId
    };
    console.log(`Motoboy ${motoboyId} conectado ao restaurante ${restauranteId}`);
  });

  // Login do Restaurante
  socket.on('restaurante-login', (restauranteId) => {
    socket.join(restauranteId);
    restaurantes[restauranteId] = socket.id;
    console.log(`Restaurante ${restauranteId} conectado`);
  });

  // Atualização de localização
  socket.on('update-location', (data) => {
    const motoboy = motoboys[data.motoboyId];
    if (motoboy) {
      io.to(motoboy.restauranteId).emit('location-update', {
        motoboyId: data.motoboyId,
        position: data.position
      });
    }
  });

  // Desconexão
  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
