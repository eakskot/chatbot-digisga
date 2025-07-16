import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const isInIframe = window !== window.parent;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      console.log("det funka med velskomstbeskjed")
      const timeout = setTimeout(() => {
        setMessages([
          {
            type: 'bot',
            text: 'Hei! Jeg er en kundeservice chatbot. Hvordan kan jeg hjelpe deg?',
          },
        ]);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, []);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { type: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    setIsTyping(true);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);

    const cleanedInput = userInput.replace(/"/g, "'");

    try {
      const response = await fetch('https://hook.eu2.make.com/vd46caf61dc0pjn6p63g5sm6fuzbd98t', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cleanedInput, history: messages }),
      });

      const data = await response.json();

      setTimeout(() => {
        setIsTyping(false);
        setMessages([...newMessages, { type: 'bot', text: data.reply }]);
      }, 200);

    } catch (error) {
      setIsTyping(false);
      setMessages([...newMessages, { type: 'bot', text: 'Feil ved henting av svar.' }]);
    }
  };

  return (
    <div className="p-4 bg-transparent min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full border border-gray-200 rounded-2xl drop-shadow-lg bg-white h-[90vh] flex flex-col px-4 py-6 relative">
        
        {isInIframe && (
          <button
            onClick={() => window.parent.postMessage({ type: 'close-chatbot' }, '*')}
            className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold z-50"
            aria-label="Lukk chatbot"
          >
            &times;
          </button>
        )}

        <h1 className="text-xl font-bold text-center mb-4 mt-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-lg shadow-sm inline-block">
          🤖 AI-Chatbot for Digisaga
        </h1>
        <div className="flex-1 overflow-y-auto px-2 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={"animate-fade-in transition-opacity duration-300 max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap break-words shadow-md " + (msg.type === 'user' ? 'bg-blue-600 text-white self-end ml-auto rounded-br-md' : 'bg-gray-100 text-gray-900 self-start mr-auto rounded-bl-md')}
            >
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div className="animate-fade-in transition-opacity duration-300 max-w-[80%] px-4 py-3 rounded-2xl bg-gray-100 text-gray-900 self-start mr-auto shadow-md">
              <span className="animate-fade-in transition-opacity duration-300 typing-dots">Skriver</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={userInput}
            aria-label="Skriv meldingen din"
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Skriv et spørsmål..."
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Send
          </button>
        </div>

        {/* Info-knapp og modal */}
        <div className="mt-2 text-center text-sm text-gray-500">
          <button onClick={() => setShowModal(true)} className="text-black-600 text-xs">
            <a href="https://digisaga.no" target="_blank" rel="noopener noreferrer">Digisaga.no   |    </a>ℹ️ Personvern
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-sm relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
              >
                &times;
              </button>
              <p className="mb-2">
                Denne chatten lagrer ikke sensitive personopplysninger og brukes kun for å svare på generelle spørsmål. Informasjonen slettes når du forlater siden. Svarene er kun ment som generell informasjon.
              </p>
              <p className="text-xs text-gray-400">
                🤖 Chatboten er utviklet av <a href="https://digisaga.no" className="underline">Digisaga.no</a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
