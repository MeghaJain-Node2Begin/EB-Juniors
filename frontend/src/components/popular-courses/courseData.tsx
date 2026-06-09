import { Monitor, Code, Palette, Database, LayoutTemplate, Braces } from "lucide-react";
import React from "react";

export interface Course {
  id: string;
  title: string;
  desc: string;
  tag: string;
  duration: string;
  icon: React.ReactNode;
  image: string;
  spanClass: string;
  techStack: string[];
}

export const courses: Course[] = [
  {
    id: "comp-fund",
    title: "Computer Fundamentals",
    desc: "Master the basics of operating systems, hardware, and essential software.",
    tag: "Beginner",
    duration: "4 Weeks",
    icon: <Monitor className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    spanClass: "md:col-span-1 md:row-span-1",
    techStack: ["Windows", "Hardware", "Internet"],
  },
  {
    id: "html-css",
    title: "HTML & CSS",
    desc: "Build structured and beautifully styled responsive websites from scratch.",
    tag: "Beginner",
    duration: "6 Weeks",
    icon: <LayoutTemplate className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=800&auto=format&fit=crop",
    spanClass: "md:col-span-1 md:row-span-1",
    techStack: ["HTML5", "CSS3", "Flexbox"],
  },
  {
    id: "js-essentials",
    title: "JavaScript Essentials",
    desc: "Add logic and interactivity to web pages with modern JavaScript.",
    tag: "Intermediate",
    duration: "8 Weeks",
    icon: <Braces className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=800&auto=format&fit=crop",
    spanClass: "md:col-span-1 md:row-span-1",
    techStack: ["ES6+", "DOM", "Fetch API"],
  },
  {
    id: "ms-excel",
    title: "MS Excel Mastery",
    desc: "Learn data entry, formulas, charts, and advanced spreadsheet management.",
    tag: "Beginner",
    duration: "4 Weeks",
    icon: <Database className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    spanClass: "md:col-span-1 md:row-span-1",
    techStack: ["Formulas", "Charts", "VLOOKUP"],
  },
  {
    id: "python",
    title: "Python Programming",
    desc: "Start your coding journey with Python syntax, loops, and basic algorithms.",
    tag: "Beginner",
    duration: "8 Weeks",
    icon: <Code className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    spanClass: "md:col-span-1 md:row-span-1",
    techStack: ["Python", "Algorithms", "Logic"],
  },
  {
    id: "canva",
    title: "Canva Designing",
    desc: "Create stunning graphics, presentations, and social media posts easily.",
    tag: "Creative",
    duration: "3 Weeks",
    icon: <Palette className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
    spanClass: "md:col-span-1 md:row-span-1",
    techStack: ["Design", "Branding", "Social Media"],
  },
];
