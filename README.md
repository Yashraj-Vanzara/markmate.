# MarkMate - AI-Powered Answer Sheet Evaluation System

MarkMate is a modern web application that leverages artificial intelligence to automate and enhance the process of grading answer sheets. The system provides accurate, consistent, and detailed feedback by analyzing both content and semantic similarity between student answers and reference solutions.

## Features

- **Intelligent Grading**: Utilizes advanced AI algorithms to evaluate answers based on both content and semantic understanding
- **Real-time Processing**: Quick and efficient grading of multiple questions simultaneously
- **Detailed Analytics**: Provides comprehensive scoring breakdown including:
  - Overall score and grade
  - Individual question scores
  - Content similarity scores
  - Semantic similarity scores
  - Detailed feedback for each answer
- **Modern UI/UX**: 
  - Sleek, cyber-themed design with animated elements
  - Responsive layout that works on all devices
  - Interactive components with smooth transitions
  - Real-time feedback and progress indicators

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- GSAP for animations
- Vite for build tooling
- React Icons for UI elements

### Backend
- Python Flask server
- AI/ML libraries for text processing and analysis
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd markmate-project
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### Running the Application

1. Start the backend server:
```bash
cd backend
python app.py
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Upload three text files:
   - Question file containing the questions
   - Student's answer file
   - Reference answer file (correct answers)

2. Click the "Grade Me" button to process the files

3. View the detailed results including:
   - Overall score and grade
   - Number of attempted questions
   - Individual question analysis
   - Detailed feedback for each answer

4. Use the "Grade Another" button to evaluate more answer sheets

## Project Structure

```
markmate-project/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── assets/            # Static assets
│   └── styles/            # CSS and styling files
├── backend/               # Python backend
│   ├── app.py            # Flask server
│   └── grading_system.py # Grading logic
├── public/               # Public assets
└── package.json          # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and Python
- Styled with Tailwind CSS
- Powered by AI/ML technologies
# markmate.
