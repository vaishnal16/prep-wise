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
        "model": "llama-3.2-90b-vision-preview",
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

def generate_question(topic, pdf_content=None):
    system_message = """You are an expert technical interviewer. Generate questions in the following formats:

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

    Ensure questions are challenging and test deep understanding."""

    prompt = f"""Topic: {topic}
    Content: {pdf_content if pdf_content else 'General knowledge about the topic.'}
    Generate an MCQ question."""

    return call_consolegroq_api(prompt, system_message)

def evaluate_answer(question_data, user_answer):
    correct_option = question_data.get('correct', '').lower()
    score = 10 if user_answer.lower() == correct_option else 0

    feedback = f"Score: {score}\n"
    feedback += "Analysis:\n"
    feedback += "• Excellent answer\n" if score == 10 else "• Incorrect answer\n"
    feedback += "• Your choice matched the correct answer." if score == 10 else f"• The correct answer was {correct_option}."
    return feedback

def parse_question(response):
    lines = response.split('\n')
    question = next((line.split(': ')[1] for line in lines if line.startswith('Question:')), '')

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

def recognize_speech():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        with st.spinner("Listening..."):
            audio = recognizer.listen(source)
            try:
                recognized_text = recognizer.recognize_google(audio)
                if recognized_text.lower().startswith("option"):
                    return recognized_text.split()[1].lower()
                else:
                    return recognized_text
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

col1, col2 = st.columns(2)
with col1:
    if st.button("Generate MCQ from Topic"):
        question_response = generate_question(topic)
        if question_response:
            st.session_state.current_question = parse_question(question_response)
            st.session_state.questions.append(question_response)

with col2:
    if st.button("Generate MCQ from PDF"):
        if st.session_state.pdf_content:
            question_response = generate_question(topic, st.session_state.pdf_content)
            if question_response:
                st.session_state.current_question = parse_question(question_response)
                st.session_state.questions.append(question_response)
        else:
            st.error("Please upload study material first.")

if st.session_state.current_question:
    st.markdown(f"### Question")
    st.write(st.session_state.current_question['question'])

    options = st.session_state.current_question['options']
    selected_option = st.radio("Select answer:", options)

    col1, col2 = st.columns(2)
    with col1:
        if st.button("Submit Answer"):
            feedback = evaluate_answer(st.session_state.current_question, selected_option)
            st.markdown(feedback)

    with col2:
        if st.button("Speak Answer"):
            spoken_option = recognize_speech()
            if spoken_option:
                st.info(f"Your answer: {spoken_option}")
                feedback = evaluate_answer(st.session_state.current_question, spoken_option)
                st.markdown(feedback)

    if st.button("Next Question"):
        if st.session_state.pdf_content:
            question_response = generate_question(topic, st.session_state.pdf_content)
        else:
            question_response = generate_question(topic)
        
        if question_response:
            st.session_state.current_question = parse_question(question_response)
            st.session_state.questions.append(question_response)