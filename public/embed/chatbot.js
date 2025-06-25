(function () {
  // Lag knapp (widget)
  const button = document.createElement('div');
  button.innerText = '💬';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.width = '56px';
  button.style.height = '56px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#4f46e5';
  button.style.color = 'white';
  button.style.fontSize = '28px';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.cursor = 'pointer';
  button.style.zIndex = '9999';
  button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';

  // Fade-in animasjon
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .chatbot-fade-in {
      animation: fadeIn 0.25s ease-out;
    }

    @media (max-width: 600px) {
      iframe.chatbot-frame {
        right: 10px !important;
        left: 10px !important;
        width: calc(100vw - 20px) !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Lag iframe (selve chatboten)
  const iframe = document.createElement('iframe');
  iframe.src = 'https://chatbotdigisaga.netlify.app';
  iframe.classList.add('chatbot-frame');
  iframe.style.position = 'fixed';
  iframe.style.bottom = '90px';
  iframe.style.right = '20px';
  iframe.style.width = 'min(100vw - 40px, 360px)';
  iframe.style.height = 'min(100vh - 80px, 600px)'; // høyere boks
  iframe.style.border = 'none';
  iframe.style.borderRadius = '16px';
  iframe.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)'; // myk men ikke "underplate"
  iframe.style.zIndex = '9998';
  iframe.style.display = 'none';
  iframe.style.backgroundColor = 'white';
  iframe.style.margin = '0'; // viktig for mobil

  // Toggle visning
  let isOpen = false;
  function toggleChatbot() {
    isOpen = !isOpen;
    if (isOpen) {
      iframe.classList.add('chatbot-fade-in');
      iframe.style.display = 'block';
    } else {
      iframe.style.display = 'none';
      iframe.classList.remove('chatbot-fade-in');
    }
  }

  // Klikk utenfor = lukk
  document.addEventListener('click', function (e) {
    if (isOpen && !iframe.contains(e.target) && !button.contains(e.target)) {
      toggleChatbot();
    }
  });

  button.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleChatbot();
  });

  document.body.appendChild(button);
  document.body.appendChild(iframe);
})();
