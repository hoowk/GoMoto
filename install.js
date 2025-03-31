let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Opcional: Mostrar botão de instalação
  const installBtn = document.createElement('button');
  installBtn.textContent = 'Instalar App';
  installBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    z-index: 1000;
  `;
  
  installBtn.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      installBtn.remove();
    });
  });
  
  document.body.appendChild(installBtn);
});

window.addEventListener('appinstalled', () => {
  console.log('App instalado com sucesso!');
});
