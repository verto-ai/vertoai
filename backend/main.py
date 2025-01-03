from flask import Flask, request, jsonify
from phi.agent import Agent
import os
from datetime import datetime, timedelta
from phi.agent import RunResponse
from phi.utils.pprint import pprint_run_response
from model import model
from dotenv import load_dotenv
from flask_cors import CORS
load_dotenv()

from agents import perplexity_agent
from agents.portfolio_analysis_agent import portfolio_analysis

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    user_input = data.get('message')
    
    if not user_input:
        return jsonify({'error': 'No message provided'}), 400

    # Get portfolio analysis response
    portfolio_analysis_response = portfolio_analysis(user_input)

    # Generate response from the perplexity agent
    response = perplexity_agent.perplexity_agent(user_input, portfolio_analysis_response)

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)








