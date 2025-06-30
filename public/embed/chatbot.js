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
      background-color: #F58008;
      color: white;
      font-size: 28px;
      border: none;
      cursor: pointer;
      z-index: 10001;
      animation: pulse 3s ease-in-out infinite;
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
        bottom: 80px;
        right: 12px;
        width: 95vw;
        height: 80vh;
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
      // Lukk med animasjon
      container.classList.remove('visible');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300); // matcher transition-duration
    } else {
      // Først vis overlayen (men ikke trigger animasjon enda)
      overlay.style.display = 'block';

      // Vent én "render frame" før vi legger til .visible (trigge animasjon)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.classList.add('visible');
        });
      });
    }

    // Fjern forhåndsvisning
    previewBubble.classList.remove('visible');
    clearTimeout(showPreviewTimeout);
  });


  overlay.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      container.classList.remove('visible');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300); // samme som animasjonsvarighet
    }
  });

})();
