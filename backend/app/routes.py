from flask import request, jsonify
from app.analyzer.extractor import extract_text_from_pdf
from app.analyzer.parser import extract_info
from app.analyzer.scorer import score_resume, suggest_job_role
from app.ai import analyze_with_gemini

def register_routes(app):
    @app.route("/analyze", methods=["POST"])
    def analyze_resume():
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "Empty filename"}), 400

        filepath = f"uploads/{file.filename}"
        file.save(filepath)

        text = extract_text_from_pdf(filepath)
        extracted_info = extract_info(text)

        score = score_resume(extracted_info)
        job_fit = suggest_job_role(extracted_info["skills"])

        extracted_info["score"] = score
        extracted_info["job_fit"] = job_fit
        extracted_info["ai_feedback"] = analyze_with_gemini(text)

        return jsonify(extracted_info)
