import { BookMarked, Compass, GraduationCap, Lightbulb, Rocket, Target, Award } from 'lucide-react';

export const CLASSES = [
  {
    id: "standard-6",
    grade: "Standard 6",
    number: "6",
    title: "Foundation Builder",
    description: "Build strong fundamentals in Mathematics, Science, and Languages through interactive learning, practical understanding, and personalized attention.",
    highlights: ["Concept-Based Learning", "Activity-Driven Classes", "Strong Academic Foundation"],
    icon: Compass
  },
  {
    id: "standard-7",
    grade: "Standard 7",
    number: "7",
    title: "Knowledge Explorer",
    description: "Encouraging curiosity and deeper understanding through structured learning, skill development, and problem-solving techniques.",
    highlights: ["Advanced Concept Clarity", "Regular Assessments", "Interactive Learning Methods"],
    icon: Lightbulb
  },
  {
    id: "standard-8",
    grade: "Standard 8",
    number: "8",
    title: "Future Ready Learner",
    description: "Preparing students for higher academic challenges while strengthening analytical thinking and subject expertise.",
    highlights: ["Concept Reinforcement", "Exam-Oriented Preparation", "Individual Progress Tracking"],
    icon: Target
  },
  {
    id: "standard-9",
    grade: "Standard 9",
    number: "9",
    title: "Academic Accelerator",
    description: "A crucial transition year focused on strengthening core concepts and building confidence for upcoming board-level studies.",
    highlights: ["Advanced Subject Coverage", "Weekly Practice Tests", "Performance Monitoring"],
    icon: Rocket
  },
  {
    id: "standard-10",
    grade: "Standard 10",
    number: "10",
    title: "Board Exam Excellence",
    description: "Comprehensive preparation strategies, expert guidance, and intensive practice sessions designed for outstanding board results.",
    highlights: ["Board-Focused Curriculum", "Previous Year Papers", "Doubt-Solving Sessions"],
    icon: Award
  },
  {
    id: "standard-11",
    grade: "Standard 11",
    number: "11",
    title: "Stream Specialization",
    description: "Focused learning programs tailored to Science, Commerce, and Arts streams with strong conceptual understanding.",
    highlights: ["Stream-Specific Guidance", "Competitive Exam Foundation", "Expert Faculty Support"],
    icon: BookMarked
  },
  {
    id: "standard-12",
    grade: "Standard 12",
    number: "12",
    title: "Success Beyond Boards",
    description: "Strategic preparation for board examinations and future academic goals through advanced mentoring and personalized coaching.",
    highlights: ["Intensive Board Preparation", "Career-Oriented Guidance", "High-Performance Learning"],
    icon: GraduationCap
  }
];

export const BOARDS = [
  {
    name: "GSEB",
    description: "Gujarat Secondary and Higher Secondary Education Board curriculum with comprehensive subject coverage and board-focused preparation."
  },
  {
    name: "CBSE",
    description: "National curriculum designed for conceptual learning, competitive exam readiness, and academic excellence."
  },
  {
    name: "ICSE",
    description: "Detailed subject understanding with strong emphasis on analytical thinking, language proficiency, and practical knowledge."
  },
  {
    name: "NIOS",
    description: "Flexible learning support with structured guidance and exam preparation strategies."
  },
  {
    name: "International Curriculum",
    description: "Selected support for international academic frameworks and specialized learning requirements."
  }
];

export const COURSES = [
  {
    id: "web-dev-basics",
    name: "Web Development Basics",
    duration: "3 Months",
    level: "Beginner",
    skills: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1618477247222-ac60c2294c64?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "python-mastery",
    name: "Python Mastery",
    duration: "4 Months",
    level: "Intermediate",
    skills: ["Python", "Data Structures", "Algorithms"],
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "robotics-iot",
    name: "Robotics & IoT",
    duration: "6 Months",
    level: "Advanced",
    skills: ["Arduino", "Sensors", "C++"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "app-development",
    name: "Mobile App Development",
    duration: "5 Months",
    level: "Intermediate",
    skills: ["React Native", "UI/UX", "API Integration"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "game-design",
    name: "Game Design Essentials",
    duration: "3 Months",
    level: "Beginner",
    skills: ["Unity", "C#", "Level Design"],
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ai-fundamentals",
    name: "AI & Machine Learning",
    duration: "6 Months",
    level: "Advanced",
    skills: ["TensorFlow", "Neural Networks", "Python"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
  }
];
