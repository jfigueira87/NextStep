import React from 'react'
import Nav from '../components/Nav'
import ChatComponent from '../components/ChatComponent'

const Chatbot = () => {
    return (
        <>
            <Nav />
            <section className="flex flex-col items-center justify-center min-h-screen">
                <img
                    src={require('../assets/images/ellipseMobileBlue.png')}
                    alt="Ellipse Blue"
                    className="absolute top-0 left-0"
                />

                <img
                    src={require('../assets/images/ellipseMobileGreen.png')}
                    alt="Ellipse Green"
                    className="absolute top-0 right-0"
                />
                <div className="w-full  px-8 mb-4 mt-20 text-center font-outfit text-lg md:text-xl lg:text-2xl p-4">
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
