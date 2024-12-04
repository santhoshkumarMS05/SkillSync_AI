from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
from sklearnex import patch_sklearn  # Intel extension for Scikit-learn

# Patch Scikit-learn with Intel optimizations
patch_sklearn()

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Example: Allow requests from React app

# Home route
@app.route('/')
def home():
    return 'Welcome to the Job Recommendation System with Intel AI Toolkit!'

# Load and preprocess the dataset
file_path = "jobss_cleaned.csv" 
try:
    df = pd.read_csv(file_path)
    print(f"Data loaded successfully from {file_path}")
except FileNotFoundError:
    print("CSV file not found! Please ensure the file is in the correct path.")
    exit()

# Function to preprocess the data
def preprocess_data(df):
    df['Combined_Skills'] = df['key_skills'].fillna('') + ' ' + df['job_title'].fillna('')
    return df

df = preprocess_data(df)

def recommend_jobs(skills_input, df, num_recommendations=5):
    try:
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(df['Combined_Skills'])
        user_vector = vectorizer.transform([skills_input])

        cosine_sim = cosine_similarity(user_vector, tfidf_matrix).flatten()
        similar_indices = cosine_sim.argsort()[::-1]  

        recommended_jobs = []
        for idx in similar_indices[:num_recommendations]:
            job = {
                "Job Title": df.iloc[idx]['job_title'],
                "Skills Required": df.iloc[idx]['key_skills'],
            }
            recommended_jobs.append(job)

        return recommended_jobs
    except Exception as e:
        print(f"Error in recommend_jobs: {e}")
        return []

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract input data from the POST request
        data = request.json
        print(f"Received data: {data}") 

        skills = data.get('skills', '')
        desired_role = data.get('desiredRole', '')

        # Log the received data
        print(f"Received skills: {skills}")
        print(f"Received desired role: {desired_role}")

        if not skills or not desired_role:
            return jsonify({"error": "Both skills and desiredRole are required"}), 400

        # Combine the skills and desired role for input
        combined_input = desired_role + ' ' + skills

        # Get job recommendations
        recommendations = recommend_jobs(combined_input, df)

        # If no recommendations found, return a helpful message
        if not recommendations:
            return jsonify({"message": "No matching jobs found for the given skills and role."}), 404

        # Return the recommendations as JSON
        return jsonify(recommendations)

    except Exception as e:
        print(f"Error: {e}")  # Log the error
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '_main_':
    app.run(debug=True)