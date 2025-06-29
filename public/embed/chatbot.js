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
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
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
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      overflow: hidden;
    }

    #chatbot-frame {
      width: 100%;
      height: 100%;
      border: none;
      margin: 0;
      padding: 0;
      display: block;
      background: transparent;
    }

    #chatbot-preview {
      position: fixed;
      bottom: 160px;
      right: 24px;
      background-color: white;
      color: #1f2937;
      padding: 8px 12px;
      font-size: 14px;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 10001;
      white-space: nowrap;
      animation: fadeIn 0.3s ease;
      display: none;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 600px) {
      #chatbot-container {
        bottom: 80px;
        right: 12px;
        width: 95vw;
        height: 80vh;
      }

      #chatbot-preview {
        bottom: 150px;
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

  // Legg til forhåndsvisningsboble
  const previewBubble = document.createElement('div');
  previewBubble.id = 'chatbot-preview';
  previewBubble.textContent = 'Hei, trenger du hjelp?';
  document.body.appendChild(previewBubble);

  // Vis preview etter 2 sekunder, skjul etter 8 sekunder
  const showPreviewTimeout = setTimeout(() => {
    previewBubble.style.display = 'block';

    const hideTimeout = setTimeout(() => {
      previewBubble.style.display = 'none';
    }, 8000);

    toggleBtn.addEventListener('click', () => {
      previewBubble.style.display = 'none';
      clearTimeout(hideTimeout);
    });
  }, 2000);

  // Toggle-visning av selve chatboten
  toggleBtn.addEventListener('click', () => {
    const isVisible = overlay.style.display === 'block';
    overlay.style.display = isVisible ? 'none' : 'block';
    previewBubble.style.display = 'none';
    clearTimeout(showPreviewTimeout);
  });

  overlay.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      overlay.style.display = 'none';
    }
  });
})();