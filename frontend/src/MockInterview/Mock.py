import streamlit as st
import os
import requests
import json
import PyPDF2
import speech_recognition as sr
from dotenv import load_dotenv

load_dotenv()
CONSOLEGROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
CONSOLEGROQ_API_KEY = os.getenv("CONSOLEGROQ_API_KEY")

def extract_text_from_pdf(pdf_file, max_characters=7000):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
        if len(text) >= max_characters:
            break
    return text[:max_characters]

def call_consolegroq_api(prompt, system_message, temperature=0.7):
    
    headers = {
        "Authorization": f"Bearer {CONSOLEGROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "llama-3.2-3b-preview",
        "temperature": temperature,
        "max_tokens": 2048,
        "messages": [
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    }
    response = requests.post(CONSOLEGROQ_API_URL, headers=headers, json=payload)
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        st.error(f"Error: {response.status_code} {response.text}")
        return None

def generate_question(topic, pdf_content, prev_questions=None):
    system_message = """You are an expert technical interviewer. Also ask atleast 10 questions testing the users subject knowledge based on the PDF,it can be higher order thinking type questions as well.Generate questions in the following formats:

    For MCQ:
    Type: MCQ
    Question: [Detailed question text]
    Options:
    a) [Detailed option]
    b) [Detailed option]
    c) [Detailed option]
    d) [Detailed option]
    Correct: [a/b/c/d]
    Explanation: [Detailed explanation]

    For Theory:
    Type: Theory
    Question: [Detailed technical question]
    Expected Answer Points:
    • [Key point 1]
    • [Key point 2]
    • [Key point 3]

    Ensure questions are challenging and test deep understanding."""

    prev_q_text = "\nPrevious questions:" + "\n".join(prev_questions) if prev_questions else ""
    prompt = f"""Topic: {topic}
    Content: {pdf_content}
    Generate a {'theory' if prev_questions and len(prev_questions) % 2 == 0 else 'MCQ'} question.
    {prev_q_text}"""

    return call_consolegroq_api(prompt, system_message)

def evaluate_answer(question_data, user_answer):
    system_message = """Provide detailed technical feedback in this format and also ensure each subpoint starts with a bullet point and .Also write the response like a professional interviewer and in a one-to-one conversation format.Provide references links in the additional resources section as well:

    Score: [0-10]

    Analysis:(Write each of these on a new line)
    • [Main point about the answer]
    • [Technical accuracy assessment]
    • [Completeness evaluation]

    Key Strengths:(Write each of these on a new line)
    • [Strong point 1]
    • [Strong point 2]

    Areas for Improvement:(Write these on a new line for better readibility)
    • [Specific improvement 1]
    • [Specific improvement 2]

    Additional Resources:
    • [Relevant topic/concept to study]
    • [Specific area to practice]"""

    prompt = f"""Question: {question_data}
    User Answer: {user_answer}
    Provide comprehensive technical feedback."""

    return call_consolegroq_api(prompt, system_message)

def parse_question(response):
    lines = response.split('\n')
    question_type = next((line.split(': ')[1] for line in lines if line.startswith('Type:')), '')
    question = next((line.split(': ')[1] for line in lines if line.startswith('Question:')), '')

    if question_type == 'MCQ':
        options_start = lines.index('Options:')
        options = [line.strip() for line in lines[options_start+1:options_start+5]]
        correct = next((line.split(': ')[1] for line in lines if line.startswith('Correct:')), '')
        explanation = next((line.split(': ')[1] for line in lines if line.startswith('Explanation:')), '')
        return {
            'type': 'MCQ',
            'question': question,
            'options': options,
            'correct': correct,
            'explanation': explanation
        }
    else:
        expected_points_start = lines.index('Expected Answer Points:')
        points = [line.strip() for line in lines[expected_points_start+1:] if line.strip().startswith('•')]
        return {
            'type': 'Theory',
            'question': question,
            'expected_points': points
        }

def recognize_speech():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        with st.spinner("Listening..."):
            audio = recognizer.listen(source)
            try:
                return recognizer.recognize_google(audio)
            except:
                st.error("Speech recognition failed. Please try again.")
                return None

# Initialize session state
if 'questions' not in st.session_state:
    st.session_state.questions = []
if 'current_question' not in st.session_state:
    st.session_state.current_question = None
if 'pdf_content' not in st.session_state:
    st.session_state.pdf_content = None

st.title("Technical Interview Practice")

topic = st.selectbox("Select Topic:", ["Algorithms", "Data Structures", "Machine Learning", "Operating Systems", "Networking"])
uploaded_file = st.file_uploader("Upload Study Material (PDF)", type="pdf")

if uploaded_file and not st.session_state.pdf_content:
    st.session_state.pdf_content = extract_text_from_pdf(uploaded_file)

if st.button("Generate Question") or (st.session_state.current_question and st.button("Next Question")):
    if st.session_state.pdf_content:
        question_response = generate_question(
            topic, 
            st.session_state.pdf_content, 
            st.session_state.questions
        )
        if question_response:
            st.session_state.current_question = parse_question(question_response)
            st.session_state.questions.append(question_response)
    else:
        st.error("Please upload study material first.")

if st.session_state.current_question:
    st.markdown(f"### Question")
    st.write(st.session_state.current_question['question'])

    if st.session_state.current_question['type'] == 'MCQ':
        selected_option = st.radio("Select answer:", st.session_state.current_question['options'])

        col1, col2 = st.columns(2)
        with col1:
            if st.button("Submit Answer"):
                feedback = evaluate_answer(str(st.session_state.current_question), selected_option)
                st.markdown(feedback)

        with col2:
            if st.button("Speak Answer"):
                spoken = recognize_speech()
                if spoken:
                    st.info(f"Your answer: {spoken}")
                    feedback = evaluate_answer(str(st.session_state.current_question), spoken)
                    st.markdown(feedback)

    else:  # Theory question
        text_answer = st.text_area("Your answer:", height=150)

        col1, col2 = st.columns(2)
        with col1:
            if st.button("Submit Answer"):
                feedback = evaluate_answer(str(st.session_state.current_question), text_answer)
                st.markdown(feedback)

        with col2:
            if st.button("Speak Answer"):
                spoken = recognize_speech()
                if spoken:
                    st.info(f"Your answer: {spoken}")
                    feedback = evaluate_answer(str(st.session_state.current_question), spoken)
                    st.markdown(feedback)