(function () {
  const style = document.createElement('style');
  style.textContent = `
    #chatbot-toggle {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background-color: #4f46e5;
      color: white;
      font-size: 28px;
      border: none;
      cursor: pointer;
      z-index: 10001;
    }

    #chatbot-toggle:hover{
      background-color: #3730a3; 
      transform: scale(1.1); 
      transition: background-color 0.2s ease, transform 0.2s ease;
    
    }

    #chatbot-overlay {
      position: fixed;
      inset: 0;
      background: transparent;
      z-index: 10000;
      display: none;
    }

    #chatbot-container {
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 400px;
      height: 620px;
      max-width: 90vw;
      max-height: 90vh;
      z-index: 10001;
      padding: 0;
      margin: 0;
      background: transparent;
      border-radius: 16px;
      overflow: hidden;
      opacity: 0;
      transform: scale(0.95);
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    #chatbot-container.visible {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }

    #chatbot-frame {
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
      display: block;
    }

    #chatbot-preview {
      position: fixed;
      bottom: 90px;
      right: 24px;
      background-color: white;
      color: #1f2937;
      padding: 8px 12px;
      font-size: 14px;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 10001;
      white-space: nowrap;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    #chatbot-preview.visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 600px) {
      #chatbot-container {
        top: 4px;
        left: 4px;
        bottom: 4px;
        right: 4px;
        width: calc(100vw - 8px) !important;
        height: calc(100dvh - 8px) !important;
        max-width: calc(100vw - 8px) !important;
        max-height: calc(100dvh - 8px) !important;
        border-radius: 16px;
      }

      #chatbot-overlay {
          background: rgba(0, 0, 0, 0.3);
      }

      #chatbot-preview {
        bottom: 80px;
        right: 12px;
        font-size: 13px;
      }

      
    }

  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'chatbot-overlay';

  const container = document.createElement('div');
  container.id = 'chatbot-container';

  const iframe = document.createElement('iframe');
  iframe.id = 'chatbot-frame';
  iframe.src = 'https://chatbotdigisaga.netlify.app/';
  iframe.title = 'AI Chatbot';
  iframe.allow = 'clipboard-write';

  container.appendChild(iframe);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'chatbot-toggle';
  toggleBtn.textContent = '💬';
  document.body.appendChild(toggleBtn);

  const previewBubble = document.createElement('div');
  previewBubble.id = 'chatbot-preview';
  previewBubble.textContent = 'Hei, trenger du hjelp?';
  document.body.appendChild(previewBubble);

  const showPreviewTimeout = setTimeout(() => {
    previewBubble.classList.add('visible');
    const hideTimeout = setTimeout(() => {
      previewBubble.classList.remove('visible');
    }, 8000);

    toggleBtn.addEventListener('click', () => {
      previewBubble.classList.remove('visible');
      clearTimeout(hideTimeout);
    });
  }, 2000);

  toggleBtn.addEventListener('click', () => {
    const isVisible = container.classList.contains('visible');

    if (isVisible) {
      container.classList.remove('visible');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 200);
    } else {
      overlay.style.display = 'block';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.classList.add('visible');
        });
      });

      // 🚨 Skjul knapp på mobil etter åpning
      if (window.innerWidth <= 600) {
        toggleBtn.style.display = 'none';
      }
    }

    previewBubble.classList.remove('visible');
    clearTimeout(showPreviewTimeout);
  });

  overlay.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      container.classList.remove('visible');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 200);
    }
  });

  iframe.onerror = () => {
    previewBubble.textContent = "Beklager, vi får ikke kontakt med chatten akkurat nå.";
  };
})();

// Lytter etter meldinger fra iframe (f.eks. for å lukke chatboten med X)
window.addEventListener('message', (event) => {
  if (event.data?.type === 'close-chatbot') {
    const container = document.getElementById('chatbot-container');
    const overlay = document.getElementById('chatbot-overlay');
    const toggleBtn = document.getElementById('chatbot-toggle');
    
    if (container && overlay) {
      container.classList.remove('visible');
      setTimeout(() => {
        overlay.style.display = 'none';

        // ✅ Vis knapp igjen hvis mobil
        if (window.innerWidth <= 600 && toggleBtn) {
          toggleBtn.style.display = 'block';
        }
      }, 200);
    }
  }
});

