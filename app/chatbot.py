import os
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

CAREER_DATABASE = {
    'Ingeniería': ['Matemáticas', 'Lógica', 'Creatividad', 'Resolución de problemas', 'Tecnología'],
    'Medicina': ['Ciencias Naturales', 'Empatía', 'Trabajo bajo presión', 'Atención al detalle', 'Salud'],
    'Marketing': ['Comunicación', 'Creatividad', 'Negocios', 'Análisis de mercado', 'Redes sociales'],
    'Ciencias de la Computación': ['Lógica', 'Resolución de problemas', 'Programación', 'Innovación', 'Tecnología'],
    'Psicología': ['Empatía', 'Comunicación', 'Observación', 'Análisis del comportamiento', 'Salud mental'],
    'Administración de Empresas': ['Liderazgo', 'Organización', 'Negocios', 'Toma de decisiones', 'Finanzas'],
    'Diseño Gráfico': ['Creatividad', 'Diseño', 'Tecnología', 'Comunicación visual', 'Arte'],
    'Periodismo': ['Comunicación', 'Investigación', 'Escritura', 'Pensamiento crítico', 'Actualidad']
}

def recomendar_carrera(user_profile):
    career_scores = {career: 0 for career in CAREER_DATABASE}
    
    for career, skills in CAREER_DATABASE.items():
        for skill in skills:
            if skill.lower() in user_profile.lower():
                career_scores[career] += 1
    
    top_careers = sorted(career_scores.items(), key=lambda x: x[1], reverse=True)[:3]
    
    if top_careers[0][1] > 0:
        recommendations = [f"{career} (coincidencia: {score})" for career, score in top_careers if score > 0]
        return f"Basado en tu perfil, te recomiendo considerar estas carreras: {', '.join(recommendations)}"
    else:
        return "No se encontró una recomendación clara. Considera explorar más opciones o hablar con un orientador profesional."

def chatbot_vocacional():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("La clave API de Groq no está configurada. Por favor, configura la variable de entorno GROQ_API_KEY.")

    llm = ChatGroq(
        temperature=0.7,
        api_key=api_key,
        model="llama3-70b-8192"
    )

    system = """
    Eres un chatbot especializado en orientación vocacional. Tu tarea es realizar 5 preguntas específicas para descubrir 
    los intereses, habilidades y valores del usuario. Haz preguntas relevantes y variadas para obtener una visión amplia 
    del perfil del usuario. Después de cada respuesta del usuario, haz la siguiente pregunta sin proporcionar análisis 
    o recomendaciones intermedias. Limítate a hacer las preguntas de manera clara y concisa.
    """

    human = "Comienza la entrevista de orientación vocacional haciendo tu primera pregunta."
    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

    llm_chain = LLMChain(llm=llm, prompt=prompt)

    user_profile = ""
    
    print("¡Bienvenido al chatbot de orientación vocacional! Voy a hacerte 5 preguntas para conocer tus intereses y habilidades.")

    for i in range(5):
        response = llm_chain.predict(text=user_profile)
        print(f"\nPregunta {i+1}: {response}")

        user_input = input("Tu respuesta: ")
        user_profile += " " + user_input

    print("\nGracias por compartir tu información. Basado en tus respuestas, aquí está mi recomendación:")
    carrera_recomendada = recomendar_carrera(user_profile)
    print(carrera_recomendada)

if __name__ == "__main__":
    chatbot_vocacional()