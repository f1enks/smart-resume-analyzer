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
