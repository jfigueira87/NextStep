import os
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv

# Modelo que asigna carreras a perfiles de usuarios (aquí podrías usar un modelo más avanzado)
CAREER_DATABASE = {
    'Ingeniería': ['Matemáticas', 'Lógica', 'Creatividad'],
    'Medicina': ['Ciencias Naturales', 'Empatía', 'Trabajo bajo presión'],
    'Marketing': ['Comunicación', 'Creatividad', 'Negocios'],
    # Añadir más carreras con sus habilidades correspondientes
}

def recomendar_carrera(user_profile):
    """
    Recomendador simple que sugiere una carrera basada en el perfil del usuario.
    """
    for career, skills in CAREER_DATABASE.items():
        if any(skill in user_profile for skill in skills):
            return career
    return "No se encontró una recomendación clara. Por favor, responde más preguntas."

def chatbot_vocacional(user_input):
    # Cargar variables de entorno
    load_dotenv()

    # Obtener clave API para el modelo de lenguaje
    api_key = os.getenv("GROQ_API_KEY")

    # Configurar LLM
    llm = ChatGroq(
        temperature=0.7,  # Más creativo para recomendaciones
        api_key=api_key,
        model="llama3-70b-8192"
    )

    # Definir mensajes para la conversación vocacional
    system = """
    Eres un chatbot especializado en orientación vocacional. 
    Tu tarea es realizar preguntas para descubrir los intereses y habilidades del usuario, 
    y luego recomendarle carreras profesionales o áreas de estudio basadas en esa información.
    """

    # Prompt adaptativo con el input del usuario
    human = "{text}"
    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

    # Memoria para guardar el contexto de la conversación
    memory = ConversationBufferMemory()

    # Crear una cadena de LLM para el proceso
    llm_chain = prompt | llm

    # Obtener respuesta del chatbot
    response = llm_chain.invoke(user_input)

    # Simulación de la lógica para recomendar carrera según la respuesta
    carrera_recomendada = recomendar_carrera(response.content)

    return carrera_recomendada

if __name__ == "__main__":
    while True:
        # Obtener input del usuario
        user_input = input("¿Cuáles son tus intereses y habilidades? (por favor, responde en español o escribe 'salir' para terminar): ")
        
        if user_input.lower() == 'salir':
            break

        # Generar recomendación vocacional
        carrera_recomendada = chatbot_vocacional(user_input)
        
        # Mostrar la recomendación
        print("Recomendación de carrera:")
        print(carrera_recomendada)

