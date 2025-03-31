io.on('connection', (socket) => {
  // Motoboy se conecta
  socket.on('motoboy-login', (data) => {
    console.log(`🛵 ${data.nome} conectado`);
    motoboys[data.motoboyId] = data;
  });

  // Restaurante se conecta
  socket.on('restaurante-login', (restauranteId) => {
    socket.join(restauranteId);
    console.log(`🍣 ${restauranteId} conectado`);
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
});
