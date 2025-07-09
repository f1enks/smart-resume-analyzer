# 🧠 Smart Resume Analyzer

An intelligent web app that analyzes resumes using AI, built with **Flask (Python)** for the backend and **React + Tailwind CSS** for the frontend. It scores resumes, extracts important fields, matches skills with job roles, and provides AI-generated feedback to help users improve their resumes.

---

## 🚀 Features

- 📄 Upload and analyze PDF resumes
- 🧠 AI-powered suggestions (via Gemini)
- 📊 Resume scoring based on content quality
- 🧪 Skill extraction and job role prediction
- 🔍 Extraction of key fields (email, phone, skills, education, etc.)
- ⚡ Instant feedback with toast notifications and loading spinners
- 💻 Responsive and modern UI using Tailwind CSS

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios
- React Toastify

**Backend:**
- Flask (Python)
- PDFMiner / PyMuPDF
- Regex + NLP
- Google Gemini API (optional)

---

## 🧪 How It Works

1. User uploads a resume in PDF format.
2. Backend parses and extracts data (email, phone, skills, etc.).
3. Resume is scored based on structure, info, and keyword presence.
4. AI (Gemini) provides feedback for improvements.
5. Suggested job role is inferred based on the extracted skills.
6. Results are displayed on the frontend UI.

---

## ⚙️ Getting Started

### API Setup
- Get an API Key:
    - Visit: https://aistudio.google.com/app/apikey
    - Sign in with your Google account
    - Generate a new Gemini API key

- Create a .env file in the backend folder:
    - Content:
        GEMINI_API_KEY=your_api_key_here

- Load the API key in your Python code:
    - In main.py or analyzer.py:
        import os
        from dotenv import load_dotenv

        load_dotenv()
        api_key = os.getenv("GEMINI_API_KEY")

- Install the dotenv library if needed:
    - pip install python-dotenv

- Add .env to .gitignore to keep the key private:
    - .env

### Backend
```bash
cd backend
pip install -r requirements.txt
python run.py   
```

### Frontend
```bash
cd frontend
npm install
npm start
```
