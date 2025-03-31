// install.js
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Impede o prompt automático
  e.preventDefault();
  deferredPrompt = e;
  
  // Mostra um botão de instalação (opcional)
  const installButton = document.createElement('button');
  installButton.textContent = 'Instalar App';
  installButton.style.position = 'fixed';
  installButton.style.bottom = '20px';
  installButton.style.left = '50%';
  installButton.style.transform = 'translateX(-50%)';
  installButton.style.padding = '10px 20px';
  installButton.style.background = '#4CAF50';
  installButton.style.color = 'white';
  installButton.style.border = 'none';
  installButton.style.borderRadius = '5px';
  installButton.style.zIndex = '1000';
  
  installButton.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
    });
  });
  
  document.body.appendChild(installButton);
});

window.addEventListener('appinstalled', () => {
  console.log('App instalado com sucesso!');
});
