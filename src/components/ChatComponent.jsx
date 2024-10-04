import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [context, setContext] = useState('');
    const [isFinalRecommendation, setIsFinalRecommendation] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Iniciar la conversación con el chatbot
        sendMessage('', true);
    }, []);

    const sendMessage = async (message, isInitial = false) => {
        try {
            const response = await axios.post('http://localhost:8000/chat', {
                message: message,
                context: context
            });

            const newMessage = isInitial
                ? { sender: 'bot', text: response.data.response }
                : { sender: 'user', text: message };

            setMessages(prevMessages => [...prevMessages, newMessage]);

            if (!isInitial) {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: response.data.response }
                ]);
            }

            setContext(prevContext => prevContext + '\n' + message);
            setIsFinalRecommendation(response.data.is_final_recommendation);

            if (response.data.is_final_recommendation) {
                // Aquí puedes manejar la recomendación final, por ejemplo, mostrando un mensaje especial
                console.log('Recomendación final recibida');
            }
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.' }
            ]);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() !== '' && !isFinalRecommendation) {
            sendMessage(inputMessage);
            setInputMessage('');
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex flex-col justify-between w-full max-w-5xl h-[80vh] bg-white rounded-lg mb-10 md:mb-20 px-5 font-outfit">
            <div className="flex flex-col space-y-2 overflow-y-auto p-4 h-[70vh] bg-white rounded-lg border border-gray-300 shadow-md">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg max-w-[80%] ${
                            msg.sender === 'user'
                                ? 'bg-blue-200 self-end text-right ml-auto mb-1'
                                : 'bg-gray-200 self-start text-left mr-auto mb-1'
                        } overflow-wrap break-words`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form
                onSubmit={handleSendMessage}
                className="flex items-center rounded-lg border border-gray-300 p-2 bg-white rounded-b-lg shadow-md"
            >
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Escribe tu mensaje"
                    className="flex-grow px-4 py-2 outline-none rounded-lg w-4/5 font-outfit"
                    disabled={isFinalRecommendation}
                />
                <button
                    type="submit"
                    className="rounded-full text-white shadow-lg transition-transform duration-150 ease-in-out transform active:scale-95"
                    disabled={isFinalRecommendation}
                >
                    <img
                        src={require('../assets/images/send-button.png')}
                        alt="send"
                    />
                </button>
            </form>
        </div>
    );
};

export default ChatComponent;