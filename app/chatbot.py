import os
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv

# Ampliamos la base de datos de carreras
CAREER_DATABASE = {
    'Ingeniería': ['Matemáticas', 'Lógica', 'Creatividad', 'Resolución de problemas'],
    'Medicina': ['Ciencias Naturales', 'Empatía', 'Trabajo bajo presión', 'Atención al detalle'],
    'Marketing': ['Comunicación', 'Creatividad', 'Negocios', 'Análisis de mercado'],
    'Ciencias de la Computación': ['Lógica', 'Resolución de problemas', 'Programación', 'Innovación'],
    'Psicología': ['Empatía', 'Comunicación', 'Observación', 'Análisis del comportamiento'],
    'Administración de Empresas': ['Liderazgo', 'Organización', 'Negocios', 'Toma de decisiones'],
    'Diseño Gráfico': ['Creatividad', 'Diseño', 'Tecnología', 'Comunicación visual'],
    'Periodismo': ['Comunicación', 'Investigación', 'Escritura', 'Pensamiento crítico']
}

def recomendar_carrera(user_profile):
    """
    Recomendador mejorado que sugiere carreras basadas en el perfil del usuario.
    """
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
        return "No se encontró una recomendación clara. Por favor, proporciona más información sobre tus intereses y habilidades."

def chatbot_vocacional():
    load_dotenv()
    api_key = os.getenv("GROQ_API_KEY")

    llm = ChatGroq(
        temperature=0.7,
        api_key=api_key,
        model="llama3-70b-8192"
    )

    system = """
    Eres un chatbot especializado en orientación vocacional. Tu tarea es realizar preguntas para descubrir los intereses, 
    habilidades y valores del usuario. Haz preguntas específicas y relevantes para obtener información detallada. 
    Después de cada respuesta del usuario, proporciona un breve resumen de lo que has entendido y haz una nueva pregunta 
    para profundizar en sus intereses o explorar nuevas áreas. No hagas recomendaciones de carreras directamente.
    """

    human = "{text}"
    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

    memory = ConversationBufferMemory(return_messages=True)
    llm_chain = LLMChain(llm=llm, prompt=prompt, memory=memory)

    user_profile = ""
    
    print("¡Bienvenido al chatbot de orientación vocacional! Estoy aquí para ayudarte a descubrir tus intereses y habilidades.")
    print("Por favor, responde a mis preguntas para que pueda conocerte mejor. Escribe 'salir' en cualquier momento para terminar.")

    while True:
        response = llm_chain.predict(text=user_profile)
        print("\nChatbot:", response)

        user_input = input("\nTú: ")
        if user_input.lower() == 'salir':
            break

        user_profile += " " + user_input

    print("\nGracias por compartir tu información. Basado en nuestra conversación, aquí está mi recomendación:")
    carrera_recomendada = recomendar_carrera(user_profile)
    print(carrera_recomendada)

if __name__ == "__main__":
    chatbot_vocacional()