# MarkMate - AI-Powered Answer Sheet Evaluation System

MarkMate is a modern web application that leverages artificial intelligence to automate and enhance the process of grading answer sheets. The system provides accurate, consistent, and detailed feedback by analyzing both content and semantic similarity between student answers and reference solutions.

## Features

- *Intelligent Grading*: Utilizes advanced AI algorithms to evaluate answers based on both content and semantic understanding
- *Real-time Processing*: Quick and efficient grading of multiple questions simultaneously
- *Detailed Analytics*: Provides comprehensive scoring breakdown including:
  - Overall score and grade
  - Individual question scores
  - Content similarity scores
  - Semantic similarity scores
  - Detailed feedback for each answer
- *Modern UI/UX*: 
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
bash
git clone [https://github.com/Yashraj-Vanzara/MARK_MATE]
cd markmate-project


2. Install frontend dependencies:
bash
npm install


3. Install backend dependencies:
bash
cd backend
pip install -r requirements.txt


### Running the Application

1. Start the backend server:
bash
cd backend
python app.py


2. In a new terminal, start the frontend development server:
bash
npm run dev


3. Open your browser and navigate to http://localhost:5173

## Usage

1. Upload three text files:
   -Question file containing the questions
   -Demo:
   
1.Why does a moving bicycle stay upright more easily than a stationary one?

2.How does increasing the temperature affect the resistance of a conductor?

3.What is the difference between speed and velocity?

4.Why do astronauts feel weightless in space?

5.How does a transformer change voltage in an electrical circuit?

   - Student's answer file
   - Demo:
   - 
1.As the temperature of a conductor increases, the resistance decreases because the metal atoms vibrate less, allowing free electrons to move more easily.

2.Speed is something I never heard about. Please give me marks sir idk anything

3.Astronauts experience weightlessness in space because they are continuously falling freely while orbiting Earth. Both the spacecraft and the astronauts accelerate toward Earth equally, resulting in the feeling of no gravity. This phenomenon is called microgravity.

   - Reference answer file (correct answers)
   - Demo:

   - 
1.As the temperature of a conductor increases, the resistance also increases because the metal atoms vibrate more, causing more collisions with free electrons. This hinders electron flow, increasing resistivity.

2.Speed is a scalar quantity that measures how fast an object is moving, regardless of direction. Velocity is a vector quantity that includes both speed and direction. An object can have constant speed but changing velocity if its direction changes.

3.Astronauts feel weightless in space because they are in a constant state of free fall while orbiting the Earth. Both the astronauts and the spacecraft accelerate toward Earth at the same rate, creating the sensation of weightlessness. This is known as microgravity.


2. Click the "Grade Me" button to process the files

3. View the detailed results including:
   - Overall score and grade
   - Number of attempted questions
   - Individual question analysis
   - Detailed feedback for each answer

4. Use the "Grade Another" button to evaluate more answer sheets

## Project Structure


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


## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and Python
- Styled with Tailwind CSS
- Powered by AI/ML technologies
