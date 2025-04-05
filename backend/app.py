from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from grading_system import analyze_answer_quality

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure upload folder
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def split_questions_and_answers(text):
    """Split text into individual questions/answers based on numbered format."""
    items = []
    current_item = []
    
    for line in text.split('\n'):
        line = line.strip()
        if line:  # Skip empty lines
            if line.startswith(('1.', '2.', '3.', '4.', '5.')) and current_item:
                items.append('\n'.join(current_item))
                current_item = [line]
            else:
                current_item.append(line)
    
    if current_item:  # Add the last item
        items.append('\n'.join(current_item))
    
    return items

@app.route('/grade', methods=['POST'])
def grade():
    try:
        if 'questionFile' not in request.files or 'referenceFile' not in request.files or 'studentFile' not in request.files:
            return jsonify({'error': 'Missing required files'}), 400

        question_file = request.files['questionFile']
        reference_file = request.files['referenceFile']
        student_file = request.files['studentFile']

        # Read file contents
        questions_text = question_file.read().decode('utf-8').strip()
        reference_text = reference_file.read().decode('utf-8').strip()
        student_text = student_file.read().decode('utf-8').strip()

        # Split into individual questions and answers
        questions_list = questions_text.split('\n\n')
        reference_answers_list = reference_text.split('\n\n')
        student_answers_list = student_text.split('\n\n')

        # Create dictionaries for questions and answers
        questions = {}
        reference_answers = {}
        student_answers = {}
        
        # Process each question and answer
        for i, question in enumerate(questions_list, 1):
            q_num = str(i)
            questions[q_num] = question.strip()
            
            # Match reference answers to questions
            if i <= len(reference_answers_list):
                reference_answers[q_num] = reference_answers_list[i-1].strip()
            else:
                reference_answers[q_num] = "No reference answer provided"
            
            # Match student answers to questions
            if i <= len(student_answers_list):
                student_answers[q_num] = student_answers_list[i-1].strip()
            else:
                student_answers[q_num] = "Not attempted"

        # Grade each question
        question_results = {}
        total_score = 0
        attempted_count = 0

        for q_num in questions.keys():
            student_ans = student_answers.get(q_num, "").strip()
            if student_ans and student_ans != "Not attempted":
                result = analyze_answer_quality(
                    questions[q_num],
                    reference_answers[q_num],
                    student_ans
                )
                attempted_count += 1
                total_score += result['score']
                
                question_results[q_num] = {
                    'attempted': True,
                    'score': result['score'],
                    'content_score': result['content_score'],
                    'semantic_score': result['semantic_score'],
                    'feedback': result['feedback']
                }
            else:
                question_results[q_num] = {
                    'attempted': False,
                    'score': 0,
                    'content_score': 0,
                    'semantic_score': 0,
                    'feedback': 'Question not attempted'
                }

        # Calculate final score and grade
        final_score = total_score / len(questions) if questions else 0
        
        # Determine grade based on score
        if final_score >= 90:
            grade = 'Excellent'
        elif final_score >= 80:
            grade = 'Very Good'
        elif final_score >= 70:
            grade = 'Good'
        elif final_score >= 60:
            grade = 'Satisfactory'
        else:
            grade = 'Needs Improvement'

        response = {
            'score': final_score,
            'grade': grade,
            'question_results': question_results,
            'attempted_count': attempted_count,
            'total_questions': len(questions),
            'questions': questions,
            'student_answers': student_answers,
            'reference_answers': reference_answers
        }

        print("Response being sent:", response)  # Debug print
        return jsonify(response)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            'error': str(e),
            'score': 0,
            'grade': 'Error',
            'question_results': {},
            'attempted_count': 0,
            'total_questions': 0,
            'questions': {},
            'student_answers': {},
            'reference_answers': {}
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)