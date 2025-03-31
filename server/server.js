// server/server.js
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*" // Permite todas as origens (apenas para desenvolvimento)
  }
});

// Armazena os motoboys conectados
const motoboys = {};

io.on('connection', (socket) => {
  console.log('Novo dispositivo conectado: ' + socket.id);

  // Recebe localização do app do motoboy
  socket.on('update-location', (data) => {
    motoboys[data.id] = {
      nome: data.nome,
      position: data.position,
      lastUpdate: new Date()
    };
    // Envia para todos os restaurantes
    io.emit('motoboys-update', motoboys);
  });

  // Quando um restaurante se conecta
  socket.on('restaurante-connected', () => {
    // Envia a lista atual de motoboys
    socket.emit('motoboys-update', motoboys);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
