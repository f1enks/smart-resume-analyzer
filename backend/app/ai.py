import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()  # Load the Gemini API key from .env

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_with_gemini(text):
    try:
        model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")
        prompt = f"""
    You're an AI resume reviewer. Analyze the following resume and return feedback using **markdown format**. Follow this structure exactly:

    **1. Overall Score:** Write a score like "78/100".

    **2. Key Strengths:**
    - **Point Title:** Clear explanation of why it's a strength.
    - **Another Strength:** Reason for its value.

    **3. Suggestions for Improvement:**
    - **Issue or Weakness:** Explain clearly what can be improved, why it matters, and how to fix it. Give concrete examples where possible.
    - **Another Suggestion:** Do the same here.

    **4. Suitable Job Role Recommendation (with Match %):**
    List job roles along with a percentage score showing how well the resume matches based on current skills, education, and experience. Format like this:
    - **Web Developer** — 88% match: Strong web stack experience and related projects.
    - **Data Science Intern** — 72% match: Good foundation in ML, but lacks quantified project outcomes.

    Only use markdown formatting — no tables, no HTML. Keep language concise but helpful.

    Resume Text:
    {text}
    """


        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"AI feedback error: {str(e)}"
