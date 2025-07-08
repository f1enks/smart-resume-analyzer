import fitz  # PyMuPDF: for opening and reading PDFs
import re  # Regex module for finding patterns like email/phone

# Predefined list of common tech skills to match in resumes
KNOWN_SKILLS = [
    "python", "java", "c++", "sql", "javascript", "html", "css", 
    "react", "node", "flask", "fastapi", "pandas", "numpy", "ml"
]

# Function to extract all text from a PDF file
def extract_text_from_pdf(pdf_path):
    text = ""  # Start with empty string
    with fitz.open(pdf_path) as doc:  # Open the PDF using PyMuPDF
        for page in doc:  # Loop through each page
            text += page.get_text()  # Append the extracted text
    return text  # Return the full text from the PDF

# Function to extract useful info (email, phone, name, skills) from text
def extract_info(text):
    # Extract email
    email = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", text)
    email = email[0] if email else None

    # Extract phone number
    phone = re.findall(r"\+?\d[\d -]{8,}\d", text)
    phone = phone[0] if phone else None

    # Extract LinkedIn
    linkedin = re.findall(r"https?://(www\.)?linkedin\.com/in/[^\s)]+", text)
    linkedin = linkedin[0] if linkedin else None

    # Extract GitHub
    github = re.findall(r"https?://(www\.)?github\.com/[^\s)]+", text)
    github = github[0] if github else None

    # Extract skills
    skills_found = []
    for skill in KNOWN_SKILLS:
        if skill.lower() in text.lower():
            skills_found.append(skill)

    # Extract education keywords
    education_keywords = ["b.tech", "bachelor", "m.sc", "master", "ph.d", "degree", "university", "college"]
    education_found = [line for line in text.lower().split('\n') if any(edu in line for edu in education_keywords)]

    # Extract experience-related lines
    experience_keywords = ["experience", "worked", "intern", "developer", "company", "job", "software engineer"]
    experience_found = [line for line in text.lower().split('\n') if any(exp in line for exp in experience_keywords)]

    # Extract project lines
    project_keywords = ["project", "developed", "built", "designed", "created"]
    projects_found = [line for line in text.lower().split('\n') if any(p in line for p in project_keywords)]

    # Extract certification-related lines
    cert_keywords = ["certified", "certification", "completed", "course"]
    certifications_found = [line for line in text.lower().split('\n') if any(c in line for c in cert_keywords)]

    # Dummy name: first non-empty line
    name = next((line for line in text.strip().split('\n') if line.strip()), "Unknown")

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "linkedin": linkedin,
        "github": github,
        "skills": skills_found,
        "education": education_found[:5],       # Top 5 lines
        "experience": experience_found[:5],
        "projects": projects_found[:5],
        "certifications": certifications_found[:5]
    }

# Function to add scoring
def score_resume(info):
    score = 0

    if info.get("email"):
        score += 10
    if info.get("phone"):
        score += 10
    if info.get("linkedin"):
        score += 10
    if info.get("github"):
        score += 10

    skills_count = len(info.get("skills", []))
    if skills_count >= 5:
        score += 20
    elif skills_count >= 3:
        score += 10

    if info.get("education"):
        score += 10
    if info.get("experience"):
        score += 10
    if info.get("projects"):
        score += 10
    if info.get("certifications"):
        score += 10

    return score

# Function to suggest job role  
def suggest_job_role(skills):
    role_map = {
        "Data Scientist": {"python", "pandas", "numpy", "sklearn", "ml", "matplotlib"},
        "Frontend Developer": {"html", "css", "javascript", "react", "tailwind"},
        "Backend Developer": {"python", "flask", "fastapi", "node", "sql"},
        "Fullstack Developer": {"html", "css", "javascript", "react", "node", "sql", "flask"},
        "AI/ML Engineer": {"tensorflow", "keras", "deep learning", "ml"},
        "DevOps Engineer": {"docker", "kubernetes", "aws", "ci/cd"}
    }

    max_match = 0
    best_role = "General Developer"  # fallback

    for role, required_skills in role_map.items():
        match_count = len(set(skills).intersection(required_skills))
        if match_count > max_match:
            max_match = match_count
            best_role = role

    return best_role
