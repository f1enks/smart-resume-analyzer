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
