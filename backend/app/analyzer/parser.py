import re

KNOWN_SKILLS = [
    "python", "java", "c++", "sql", "javascript", "html", "css", 
    "react", "node", "flask", "fastapi", "pandas", "numpy", "ml"
]

def extract_info(text):
    # Extract email
    email = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", text)
    email = email[0] if email else None

    # Extract phone number
    phone = re.findall(r"\+?\d[\d -]{8,}\d", text)
    phone = phone[0] if phone else None

   # Extract LinkedIn (also catches links without https://)
    linkedin_match = re.findall(r"(https?://)?(www\.)?linkedin\.com/in/[^\s)]+", text, re.IGNORECASE)
    if linkedin_match:
        raw = [m[0] + m[1] + "linkedin.com/in/" + text.split("linkedin.com/in/")[-1].split()[0] for m in linkedin_match]
        linkedin = raw[0]
    else:
        linkedin = None

    # Extract GitHub (also catches links without https://)
    github_match = re.findall(r"(https?://)?(www\.)?github\.com/[^\s)]+", text, re.IGNORECASE)
    if github_match:
        raw = [m[0] + m[1] + "github.com/" + text.split("github.com/")[-1].split()[0] for m in github_match]
        github = raw[0]
    else:
        github = None

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