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
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      z-index: 10000;
      display: none;
      overscroll-behavior: contain; /* Hindrer scrolling i iOS */
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
      border-radius: 16px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      background: transparent;
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

    @media (max-width: 600px) {
      #chatbot-container {
        bottom: 80px;
        right: 12px;
        left: auto;
        width: 95vw;
        height: 80vh;
        max-height: 80vh;
      }
    }
  `;
  document.head.appendChild(style);

  // Lag elementene
  const overlay = document.createElement('div');
  overlay.id = 'chatbot-overlay';

  const container = document.createElement('div');
  container.id = 'chatbot-container';

  const iframe = document.createElement('iframe');
  iframe.id = 'chatbot-frame';
  iframe.src = 'https://chatbotdigisaga.netlify.app'; // <- React-appen
  iframe.title = 'AI Chatbot';
  iframe.allow = 'clipboard-write';

  container.appendChild(iframe);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'chatbot-toggle';
  toggleBtn.innerText = '💬';
  document.body.appendChild(toggleBtn);

  // Toggle visning + lås scroll
  toggleBtn.addEventListener('click', () => {
    const isVisible = overlay.style.display === 'block';
    overlay.style.display = isVisible ? 'none' : 'block';
    document.body.style.overflow = isVisible ? 'auto' : 'hidden';
    document.documentElement.style.overflow = isVisible ? 'auto' : 'hidden';
  });

  overlay.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      overlay.style.display = 'none';
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
  });
})();
