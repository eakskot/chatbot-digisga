(function () {
  try {
    // --- CSS ---
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
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }

      #chatbot-container.visible {
        opacity: 1;
        transform: scale(1);
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
        display: none;
        animation: fadeIn 0.3s ease;
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
          right: 12px;
          font-size: 13px;
        }
      }
    `;
    document.head.appendChild(style);
    console.log("[Chatbot] Style tag added.");

    // --- DOM ---
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
    toggleBtn.textContent = '😁';
    document.body.appendChild(toggleBtn);

    console.log("[Chatbot] Toggle button and iframe injected.");

    // --- Preview Bubble ---
    const previewBubble = document.createElement('div');
    previewBubble.id = 'chatbot-preview';
    previewBubble.textContent = 'Hei, trenger du hjelp?';
    document.body.appendChild(previewBubble);

    setTimeout(() => {
      previewBubble.style.display = 'block';
      console.log("[Chatbot] Preview bubble shown.");

      const hideTimeout = setTimeout(() => {
        previewBubble.style.display = 'none';
        console.log("[Chatbot] Preview bubble hidden.");
      }, 8000);

      toggleBtn.addEventListener('click', () => {
        previewBubble.style.display = 'none';
        clearTimeout(hideTimeout);
      });
    }, 2000);

    // --- Toggle-visning ---
    toggleBtn.addEventListener('click', () => {
      const isVisible = overlay.style.display === 'block';

      if (!isVisible) {
        overlay.style.display = 'block';
        requestAnimationFrame(() => {
          container.classList.add('visible');
        });
        console.log("[Chatbot] Opened");
      } else {
        container.classList.remove('visible');
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 300);
        console.log("[Chatbot] Closed");
      }
    });

    // --- Klikk utenfor lukker ---
    overlay.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        container.classList.remove('visible');
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 300);
        console.log("[Chatbot] Closed by clicking outside.");
      }
    });
  } catch (err) {
    console.error("[Chatbot] Feil under oppsett:", err);
  }
})();
