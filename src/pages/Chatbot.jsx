import React, { useState, useEffect, useRef } from 'react'
import { MdSend } from 'react-icons/md'

const Chatbot = () => {
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const messagesEndRef = useRef(null)

    const handleSendMessage = (e) => {
        e.preventDefault()

        if (inputMessage.trim() !== '') {
            setMessages([...messages, { sender: 'user', text: inputMessage }])
            setInputMessage('')
        }
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <div className="flex flex-col justify-between w-[80%] max-w-5xl mx-auto h-[80vh] bg-white rounded-lg m-5 px-5 font-outfit">
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
                />
                <button
                    type="submit"
                    className="bg-blue-200 p-2 rounded-full text-white shadow-lg transition-transform duration-150 ease-in-out transform active:scale-95"
                >
                    <div className="bg-blue-200 p-2 rounded-full flex items-center justify-center">
                        <MdSend className="text-black" size={20} />
                    </div>
                </button>
            </form>
        </div>
    )
}

export default Chatbot
