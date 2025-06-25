import React, { useState, useRef, useEffect } from 'react';


function App() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hei! Jeg er en kundeservice-robot som er her for å svare på spørsmål. \nHvordan kan jeg bistå deg i dag?',
    },
  ]);


  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { type: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    setTimeout(() => {
      setIsTyping(true);
    }, 300);
    

    try {
      const response = await fetch('https://hook.eu2.make.com/zi5xwux9vtiwkime43bew8epniv4ym95', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput, history: messages }),
      });

      const data = await response.json();
      setTimeout(() => {
        setMessages([...newMessages, { type: 'bot', text: data.reply }]);
        setIsTyping(false);
     }, 200);
    } catch (error) {
      setMessages([...newMessages, { type: 'bot', text: 'Feil ved henting av svar.' }]);
    }

    setIsTyping(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border border-gray-200 rounded-2xl shadow-xl bg-white/95 backdrop-blur-sm h-[90vh] flex flex-col">
      <h1 className="text-xl font-bold text-center mb-4 mt-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-lg shadow-sm inline-block">🤖 AI-Chatbot for Helse i Centrum</h1>
      <div className="flex-1 overflow-y-auto px-2 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={ "animate-fade-in transition-opacity duration-300 max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap break-words shadow-md " + (msg.type === 'user' ? 'bg-blue-600 text-white self-end ml-auto rounded-br-md' : 'bg-gray-100 text-gray-900 self-start mr-auto rounded-bl-md') }  >
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-1200 self-start mr-auto border shadow-sm">
            <span className="animate-fade-in transition-opacity duration-300 typing-dots">Skriver</span>
          </div>
        )}



        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Skriv et spørsmål..."
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl hover:bg-blue-700 shadow-md hover:shadow-lg transition"

        >
          Send
        </button>
      </div>

      {/* Info-knapp og modal */}
      <div className="mt-2 text-center text-sm text-gray-500">
        <button onClick={() => setShowModal(true)} className="text-black-600 text-xs">
          <a href="https://digisaga.no">Digisaga.no   |    </a>ℹ️ Personvern
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
  );
}

export default App;
