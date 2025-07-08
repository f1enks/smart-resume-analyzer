from flask import Flask, request, jsonify  # Import Flask core functions
from flask_cors import CORS
import os  # To handle file saving and folders
from analyzer import extract_text_from_pdf, extract_info, score_resume, suggest_job_role    # Import functions from analyzer.py

app = Flask(__name__)  # Create Flask app instance
CORS(app)  # This allows cross-origin requests from your frontend


UPLOAD_FOLDER = "uploads"  # Folder where resumes will be saved temporarily
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create 'uploads/' if it doesn't exist

# Route to handle resume analysis
@app.route("/analyze", methods=["POST"])
def analyze_resume():
    # Check if a file was uploaded in the request
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']  # Get the uploaded file from the request

    # If the file has no name (i.e., it's empty), return error
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    # Build the full path where the file will be saved
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    
    file.save(filepath)  # Save the file to the uploads/ folder

    # Extract text from the saved PDF
    text = extract_text_from_pdf(filepath)
    extracted_info = extract_info(text)

    score = score_resume(extracted_info)
    job_fit = suggest_job_role(extracted_info["skills"])

    extracted_info["score"] = score
    extracted_info["job_fit"] = job_fit


    # Just add score as a new key
    extracted_info["score"] = score

    return jsonify(extracted_info)

    # Return the extracted information as a JSON response
    return jsonify(extracted_info)

# Run the app locally on port 5000
if __name__ == "__main__":
    app.run(debug=True)
