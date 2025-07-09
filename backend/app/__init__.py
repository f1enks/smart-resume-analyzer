from flask import Flask
from flask_cors import CORS
import os
import google.generativeai as genai
from dotenv import load_dotenv

def create_app():
    load_dotenv()
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    app = Flask(__name__)
    CORS(app)

    from app.routes import register_routes
    register_routes(app)

    return app
