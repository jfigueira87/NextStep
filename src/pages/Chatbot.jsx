import React from 'react'
import Nav from '../components/Nav'
import ChatComponent from '../components/ChatComponent'

const Chatbot = () => {
    return (
        <>
            <Nav />
            <section className="flex flex-col items-center justify-center min-h-screen">
                <div className="relative flex w-full h-auto">
                    <img
                        src={require('../assets/images/ellipseMobileBlue.png')}
                        alt="ellipseBlue"
                        className="w-[80%] absolute left-0 top-0"
                    />
                    <img
                        src={require('../assets/images/ellipseMobileGreen.png')}
                        alt="ellipseGreen"
                        className="w-[50%] absolute right-0 top-0"
                    />
                </div>
                <div className="w-full mt-[7%] px-8 mb-[4%] text-center font-outfit text-lg md:text-xl lg:text-2xl p-4">
                    {' '}
                    <p className="p-4 text-l">
                        ¿Listo para descubrir tu verdadera vocación y
                        encaminarte hacia una carrera que te apasione? Nuestro
                        chatbot inteligente te ayuda a explorar opciones
                        profesionales personalizadas, basadas en tus intereses,
                        habilidades y metas. Recibe orientación clara para tomar
                        decisiones con confianza.
                        <br />
                        Da el primer paso hacia un futuro lleno de oportunidades
                        y encuentra una carrera que te motive. ¡Comienza hoy
                        mismo tu camino hacia el éxito profesional!
                    </p>
                </div>
                <ChatComponent />
            </section>
        </>
    )
}

export default Chatbot
