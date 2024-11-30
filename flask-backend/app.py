# Importing necessary modules
from sklearnex import patch_sklearn  # Intel extension for Scikit-learn
patch_sklearn()  # Apply Intel optimizations to Scikit-learn

from flask import Flask, request, jsonify  # Flask for building the API
import pandas as pd  # For handling the dataset
from sklearn.feature_extraction.text import TfidfVectorizer  # For text vectorization
from sklearn.metrics.pairwise import cosine_similarity  # For calculating similarity
from flask_cors import CORS  # For handling Cross-Origin Resource Sharing (CORS)

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes (or specify a more restricted policy)

# Load and preprocess the dataset
file_path = "jobss_cleaned.csv"  # Ensure this file is in the same directory as the script
try:
    df = pd.read_csv(file_path)
    print(f"Data loaded successfully from {file_path}")
except FileNotFoundError:
    print("CSV file not found! Please ensure the file is in the correct path.")
    exit()

# Function to preprocess the data
def preprocess_data(df):
    # Fill missing values and combine skills and job title
    df['Combined_Skills'] = df['key_skills'].fillna('') + ' ' + df['job_title'].fillna('')  # Combining skills and job title
    return df

df = preprocess_data(df)

# Function to recommend job titles based on input skills
def recommend_jobs(skills_input, df, num_recommendations=5):
    try:
        # Vectorize the combined skills and the user's input skills
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(df['Combined_Skills'])  # Vectorizing the dataset
        user_vector = vectorizer.transform([skills_input])  # Vectorizing the user's input

        # Compute cosine similarity between user input and job data
        cosine_sim = cosine_similarity(user_vector, tfidf_matrix).flatten()
        similar_indices = cosine_sim.argsort()[::-1]  # Sort the indices based on similarity

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
        print(f"Received data: {data}")  # Add this line to see the incoming data
        
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
if __name__ == '__main__':
    app.run(debug=True)
