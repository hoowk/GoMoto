// install.js
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Mostra botão de instalação (opcional)
  const installBtn = document.createElement('button');
  installBtn.innerHTML = '📲 Instalar App';
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
    font-size: 16px;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
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
