from difflib import SequenceMatcher
import string

def preprocess_text(text):
    """Clean and preprocess text for comparison."""
    # Convert to lowercase
    text = text.lower()
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    # Remove extra whitespace
    text = ' '.join(text.split())
    return text

def calculate_similarity(text1, text2):
    """Calculate similarity ratio between two texts"""
    text1 = preprocess_text(text1)
    text2 = preprocess_text(text2)
    return SequenceMatcher(None, text1, text2).ratio() * 100

def extract_key_terms(text):
    """Extract important terms from text."""
    text = preprocess_text(text)
    # Split into words and remove very short words and common words
    common_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'}
    words = [word for word in text.split() if len(word) > 2 and word not in common_words]
    return set(words)

def analyze_answer_quality(question, reference_answer, student_answer):
    """Analyze the quality of a student's answer"""
    
    # Preprocess texts
    ref_processed = preprocess_text(reference_answer)
    student_processed = preprocess_text(student_answer)
    
    # Calculate semantic similarity
    semantic_score = calculate_similarity(ref_processed, student_processed)
    
    # Calculate content coverage
    ref_words = set(ref_processed.split())
    student_words = set(student_processed.split())
    
    # Find key terms (words in reference answer)
    key_terms = ref_words - student_words
    
    # Calculate content score based on word overlap
    common_words = ref_words.intersection(student_words)
    content_score = (len(common_words) / len(ref_words)) * 100
    
    # Calculate final score (average of semantic and content scores)
    final_score = (semantic_score + content_score) / 2
    
    # Generate feedback
    feedback = []
    if key_terms:
        # Limit to top 5 key terms for concise feedback
        top_terms = list(key_terms)[:5]
        feedback.append(f"Consider including these key terms: {', '.join(top_terms)}")
    
    if content_score < 60:
        feedback.append("Your answer is missing important concepts from the reference answer.")
    elif content_score < 80:
        feedback.append("Your answer includes some key concepts but could be more complete.")
    else:
        feedback.append("Good coverage of key concepts.")
    
    if semantic_score < 60:
        feedback.append("Try to align your answer more closely with the reference answer's structure.")
    elif semantic_score < 80:
        feedback.append("Your answer shows good understanding but could be more precise.")
    else:
        feedback.append("Excellent match with the reference answer.")
    
    return {
        'score': final_score,
        'content_score': content_score,
        'semantic_score': semantic_score,
        'feedback': " ".join(feedback)
    }

def grade_answer(question_path, reference_path, student_path):
    """Grade the student answer using text comparison."""
    try:
        # Read contents
        with open(question_path, 'r', encoding='utf-8') as f:
            question = f.read().strip()
        with open(reference_path, 'r', encoding='utf-8') as f:
            reference_answer = f.read().strip()
        with open(student_path, 'r', encoding='utf-8') as f:
            student_answer = f.read().strip()
        
        # Calculate similarity scores
        overall_similarity = calculate_similarity(reference_answer, student_answer)
        
        # Calculate content score based on term overlap
        student_terms = extract_key_terms(student_answer)
        reference_terms = extract_key_terms(reference_answer)
        content_score = len(student_terms.intersection(reference_terms)) / len(reference_terms) * 100 if reference_terms else 0
        
        # Generate feedback
        feedback = analyze_answer_quality(question, reference_answer, student_answer)
        
        # Calculate final score (weighted average)
        final_score = (overall_similarity * 0.6) + (content_score * 0.4)
        
        # Determine grade
        if final_score >= 90:
            grade = "Excellent"
        elif final_score >= 75:
            grade = "Good"
        elif final_score >= 60:
            grade = "Fair"
        else:
            grade = "Needs Improvement"
        
        return {
            'score': round(final_score, 2),
            'grade': grade,
            'feedback': " ".join(feedback['feedback'].split()),
            'content_score': round(content_score, 2),
            'semantic_score': round(overall_similarity, 2),
            'question': question,
            'reference_answer': reference_answer,
            'student_answer': student_answer
        }
        
    except Exception as e:
        error_message = str(e)
        print(f"Error in grade_answer: {error_message}")
        return {
            'error': error_message,
            'score': 0,
            'grade': 'Error',
            'feedback': f'An error occurred while grading: {error_message}',
            'content_score': 0,
            'semantic_score': 0,
            'question': '',
            'reference_answer': '',
            'student_answer': ''
        } 