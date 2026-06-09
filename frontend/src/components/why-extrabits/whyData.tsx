import { Briefcase, UserCheck, Star, Target, Lightbulb, MonitorCheck } from "lucide-react";
import React from "react";

export interface StoryCardType {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  image: string;
}

export const storyCards: StoryCardType[] = [
  {
    id: "practical-learning",
    title: "Practical Learning",
    desc: "We focus on hands-on projects rather than just theoretical knowledge. Build real-world applications from day one.",
    icon: <Briefcase className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "beginner-friendly",
    title: "Beginner Friendly",
    desc: "Step-by-step guidance designed specifically for school students. We break down complex concepts into digestible pieces.",
    icon: <UserCheck className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "experienced-trainers",
    title: "Experienced Trainers",
    desc: "Learn directly from industry professionals with years of real-world software development and coaching experience.",
    icon: <Star className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "career-guidance",
    title: "Career Guidance",
    desc: "Get absolute clarity on future IT career paths, college degrees, and which technology stack fits your passion.",
    icon: <Target className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "creative-environment",
    title: "Creative Environment",
    desc: "A highly supportive and energetic space that encourages out-of-the-box innovation, teamwork, and problem-solving.",
    icon: <Lightbulb className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "modern-labs",
    title: "Modern Computer Labs",
    desc: "Train in our state-of-the-art facilities equipped with high-speed internet, premium workstations, and the latest software.",
    icon: <MonitorCheck className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
];
