import os
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

CAREER_DATABASE = {
    'Ingeniería': ['Matemáticas', 'Lógica', 'Resolución de problemas', 'Tecnología', 'Innovación'],
    'Medicina': ['Ciencias Naturales', 'Empatía', 'Trabajo bajo presión', 'Atención al detalle', 'Salud'],
    'Derecho': ['Análisis', 'Argumentación', 'Leyes', 'Ética', 'Comunicación oral'],
    'Psicología': ['Empatía', 'Análisis del comportamiento', 'Comunicación', 'Salud mental', 'Investigación'],
    'Economía': ['Matemáticas', 'Análisis de datos', 'Finanzas', 'Mercados', 'Estadística'],
    'Arquitectura': ['Diseño', 'Creatividad', 'Matemáticas', 'Dibujo técnico', 'Planificación espacial'],
    'Biología': ['Ciencias Naturales', 'Investigación', 'Laboratorio', 'Medio ambiente', 'Genética'],
    'Química': ['Ciencias Naturales', 'Laboratorio', 'Investigación', 'Análisis', 'Industria'],
    'Física': ['Matemáticas', 'Investigación', 'Análisis', 'Tecnología', 'Teoría'],
    'Informática': ['Programación', 'Lógica', 'Resolución de problemas', 'Tecnología', 'Innovación'],
    'Periodismo': ['Comunicación', 'Investigación', 'Escritura', 'Actualidad', 'Ética'],
    'Filología': ['Lingüística', 'Literatura', 'Análisis de textos', 'Comunicación', 'Idiomas'],
    'Bellas Artes': ['Creatividad', 'Arte', 'Diseño', 'Expresión visual', 'Historia del arte'],
    'Historia': ['Investigación', 'Análisis', 'Cultura', 'Escritura', 'Patrimonio'],
    'Filosofía': ['Pensamiento crítico', 'Ética', 'Análisis', 'Argumentación', 'Historia del pensamiento'],
    'Matemáticas': ['Lógica', 'Abstracción', 'Resolución de problemas', 'Estadística', 'Teoría'],
    'Farmacia': ['Química', 'Salud', 'Investigación', 'Atención al cliente', 'Biología'],
    'Veterinaria': ['Ciencias Naturales', 'Salud animal', 'Empatía', 'Cirugía', 'Diagnóstico'],
    'Odontología': ['Salud', 'Destreza manual', 'Atención al detalle', 'Tecnología médica', 'Anatomía'],
    'Enfermería': ['Salud', 'Empatía', 'Atención al paciente', 'Trabajo en equipo', 'Ciencias Naturales'],
    'Técnico en Cuidados Auxiliares de Enfermería': ['Salud', 'Atención al paciente', 'Higiene', 'Primeros auxilios'],
    'Técnico en Sistemas Microinformáticos y Redes': ['Informática', 'Redes', 'Hardware', 'Software', 'Soporte técnico'],
    'Técnico en Gestión Administrativa': ['Administración', 'Organización', 'Ofimática', 'Contabilidad básica'],
    'Técnico en Electromecánica de Vehículos': ['Mecánica', 'Electricidad', 'Diagnóstico', 'Reparación de vehículos'],
    'Técnico en Cocina y Gastronomía': ['Cocina', 'Nutrición', 'Higiene alimentaria', 'Creatividad culinaria'],
    'Técnico Superior en Administración y Finanzas': ['Contabilidad', 'Finanzas', 'Gestión empresarial', 'Recursos humanos'],
    'Técnico Superior en Desarrollo de Aplicaciones Web': ['Programación web', 'Bases de datos', 'Diseño web', 'Seguridad informática'],
    'Técnico Superior en Educación Infantil': ['Pedagogía', 'Psicología infantil', 'Didáctica', 'Desarrollo infantil'],
    'Técnico Superior en Marketing y Publicidad': ['Marketing digital', 'Publicidad', 'Investigación de mercados', 'Comunicación'],
    'Técnico Superior en Animación Sociocultural y Turística': ['Turismo', 'Animación', 'Gestión cultural', 'Ocio y tiempo libre']
}

SALARY_RANGES = {
    "Grado Medio": {
        "rango": "15.000 - 22.000 euros brutos anuales",
        "promedio": "18.447 euros brutos anuales"
    },
    "Grado Superior": {
        "rango": "18.000 - 30.000 euros brutos anuales",
        "promedio": "19.610 euros brutos anuales"
    },
    "Universidad": {
        "rango": "22.000 - 40.000 euros brutos anuales",
        "promedio_inicial": "22.134 euros brutos anuales",
        "promedio_4_años": "29.559 euros brutos anuales"
    }
}

def recomendar_carrera(user_profile):
    career_scores = {career: 0 for career in CAREER_DATABASE}
    
    for career, skills in CAREER_DATABASE.items():
        for skill in skills:
            if skill.lower() in user_profile.lower():
                career_scores[career] += 1
    
    top_careers = sorted(career_scores.items(), key=lambda x: x[1], reverse=True)[:3]
    
    if top_careers[0][1] > 0:
        recommendations = []
        for career, score in top_careers:
            if score > 0:
                if "Técnico Superior" in career:
                    salary_info = SALARY_RANGES["Grado Superior"]
                elif "Técnico en" in career:
                    salary_info = SALARY_RANGES["Grado Medio"]
                else:
                    salary_info = SALARY_RANGES["Universidad"]
                
                recommendations.append(f"{career} (coincidencia: {score}, rango salarial: {salary_info['rango']})")
        
        return f"Basado en tu perfil, te recomiendo considerar estas carreras:\n" + "\n".join(recommendations)
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

    preguntas = [
        "¿Cuáles son tus asignaturas favoritas y por qué te interesan?",
        "¿En qué actividades o tareas prácticas sientes que destacas?",
        "¿Qué valores personales consideras importantes en tu futura carrera profesional?",
        "Describe tu ambiente de trabajo ideal. ¿Prefieres trabajar en equipo o de forma individual?",
        "¿Qué expectativas tienes en cuanto al salario en tu futura profesión?",
        "¿Estás dispuesto a realizar estudios universitarios largos o prefieres una formación más corta y práctica?",
        "¿Tienes hobbies o intereses extracurriculares que te gustaría relacionar con tu carrera?",
        "¿Has tenido alguna experiencia laboral, de voluntariado o proyecto personal significativo? ¿Qué aprendiste de ello?",
        "¿Qué habilidades blandas (como comunicación, liderazgo, resolución de problemas) consideras que son tus puntos fuertes?",
        "¿Cómo te ves profesionalmente en 5-10 años? ¿Qué metas te gustaría alcanzar?"
    ]

    system = """
    Eres un chatbot especializado en orientación laboral para jóvenes. Tu tarea es realizar una serie de preguntas predefinidas 
    para obtener información sobre los intereses, habilidades y expectativas profesionales del usuario. Mantén un tono amigable 
    y motivador, y adapta ligeramente las preguntas si es necesario basándote en las respuestas anteriores del usuario.

    No hagas recomendaciones de carreras durante el proceso de preguntas. Tu objetivo es recopilar información para una 
    recomendación de carrera precisa y personalizada al final de la entrevista.
    """

    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", "{pregunta}")])
    llm_chain = LLMChain(llm=llm, prompt=prompt)

    user_profile = ""
    
    print("¡Bienvenido al chatbot de orientación vocacional! Voy a hacerte 10 preguntas para conocer tus intereses, habilidades y aspiraciones profesionales.")

    for i, pregunta_base in enumerate(preguntas, 1):
        pregunta_adaptada = llm_chain.predict(pregunta=pregunta_base)
        print(f"\nPregunta {i}: {pregunta_adaptada}")

        user_input = input("Tu respuesta: ")
        user_profile += " " + user_input

    print("\nGracias por compartir tu información. Basado en tus respuestas, aquí está mi recomendación:")
    recomendacion = recomendar_carrera(user_profile)
    print(recomendacion)

if __name__ == "__main__":
    chatbot_vocacional()