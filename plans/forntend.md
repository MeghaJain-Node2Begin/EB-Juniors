# Extrabits Junior – Frontend Planning Documentation

# Project Overview

**Extrabits Junior** is a modern IT coaching and computer training website for students from **Class 8th to 12th**.

The frontend will be developed using:

- Next.js (Client Side Rendering)
- Tailwind CSS
- Framer Motion (animations)
- Responsive Mobile-First Design

The website theme will focus on a modern **Green & White** UI design that feels:

- Student-friendly
- Professional
- Clean
- Modern
- Trustworthy for parents

---

# Frontend Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend Framework |
| React.js | UI Development |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Axios | API Handling |
| React Icons | Icons |
| Swiper.js | Sliders & Carousels |
Lenis 
lazy loading
AOS
Lucid React

---

# Theme & Design System

## Primary Color Palette

| Purpose | Color | Hex |
|---|---|---|
| Primary Green | Emerald Green | `#10B981` |
| Dark Green | Rich Green | `#047857` |
| Accent Green | Lime Green | `#84CC16` |
| Light Background | Mint White | `#ECFDF5` |
| Text Color | Dark Gray | `#1F2937` |
| Pure White | White | `#FFFFFF` |

---

# Typography

## Fonts

| Font | Usage |
|---|---|
| Poppins | Headings |
| Inter | Body Text |

---

# Frontend Folder Structure

```bash
src/
│
├── app/
│   ├── page.jsx
│   ├── about/
│   ├── classes/
│   ├── courses/
│   ├── testimonials/
│   ├── blog/
│   ├── events/
│   ├── contact/
│
├── components/
│   ├── navbar/
│   ├── footer/
│   ├── hero/
│   ├── course-card/
│   ├── testimonial-card/
│   ├── blog-card/
│   ├── event-card/
│   ├── forms/
│   └── common/
│
├── sections/
│   ├── home/
│   ├── about/
│   ├── courses/
│   ├── testimonials/
│   ├── blog/
│   └── contact/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── banners/
│
├── styles/
│
├── services/
│
└── utils/
```

---

# Navbar Structure

The navbar should include:

- Home
- About
- Classes
- Courses
- Testimonials
- Blog
- Events
- Contact

## Navbar Features

- Sticky navbar
- Mobile responsive hamburger menu
- Smooth scrolling
- Active page highlight
- CTA Button:
  - “Join Now”
  - “Free Demo”

---

# Homepage Structure

# Home Page Sections

## 1. Hero Section

### Content

Headline:

> “Learn Computer Skills & Coding From Class 8th to 12th”

Subheading:

- Beginner-friendly IT coaching
- Coding classes for school students
- Practical learning approach

### Buttons

- Join Now
- Book Free Demo

### Hero Design

- Green gradient background
- Students with laptops image
- Floating coding icons
- Animated shapes

---

## 2. Trusted By Students Section

Display:

- Student count
- Parent trust
- Courses completed
- Certifications

---

## 3. Popular Courses Section

Show cards for:

- Computer Fundamentals
- MS Excel
- HTML & CSS
- JavaScript
- Python
- Canva Designing

### Card Design

- Rounded corners
- Hover animations
- Green gradient border
- Learn More button

---

## 4. Why Choose Us Section

### Features

- Practical Learning
- Beginner Friendly
- Experienced Trainers
- Career Guidance
- Creative Environment
- Modern Computer Lab

---

## 5. Classes Section

Separate sections for:

| Class | Focus |
|---|---|
| 8th–9th | Computer Basics |
| 10th | Practical IT Skills |
| 11th–12th | Programming & Career Guidance |

---

## 6. Testimonials Section

Include:

- Student reviews
- Parent feedback
- Success stories

### UI

- Slider/carousel
- Star ratings
- Student images

---

## 7. Blog Preview Section

Show latest blogs:

- Coding tips
- Computer tricks
- IT career guidance
- Student learning tips

---

## 8. Events Section

Display:

- Workshops
- Coding competitions
- Demo sessions
- Student activities

---

## 9. Contact CTA Section

Headline:

> “Start Your Tech Journey Today”

Buttons:

- Contact Us
- WhatsApp

---

## 10. Footer

Footer should contain:

### Quick Links

- Home
- About
- Courses
- Blog
- Contact

### Contact Information

- Address
- Phone
- Email

### Social Media Links

- Instagram
- Facebook
- YouTube
- LinkedIn

---

# About Page

## Sections

- Institute Introduction
- Mission & Vision
- Why Extrabits Junior
- Teaching Method
- Student Growth Journey
- Future Opportunities

---

# Classes Page

## Display Class-Wise Learning Paths

### 8th–9th

- Basic Computer Skills
- Internet Basics
- Canva Designing

### 10th

- MS Office
- Practical Computer Applications

### 11th–12th

- HTML
- CSS
- JavaScript
- Python
- Career Guidance

---

# Courses Page

## Course Cards

Each course card should include:

- Course Image
- Course Name
- Duration
- Skills Learned
- Beginner/Intermediate Tag
- Enroll Button

---

# Testimonials Page

## Features

- Video testimonials
- Parent feedback
- Student success stories
- Slider section

---

# Blog Page

## Features

- Blog cards
- Search functionality
- Categories
- Featured blogs
- Recent posts

---

# Events Page

## Features

- Upcoming workshops
- Demo classes
- Coding competitions
- Student activities gallery

---

# Contact Page

## Sections

### Contact Form

Fields:

- Name
- Phone
- Email
- Class
- Interested Course
- Message

### Contact Information

- Address
- Phone Number
- Email

### Embedded Google Map

### WhatsApp Floating Button

---

# UI Design Guidelines

## Design Style

- Rounded cards
- Smooth animations
- Soft shadows
- Green gradients
- Minimal modern layout
- Large CTA buttons
- White spacing focused design

---

# Animation Suggestions

Use Framer Motion for:

- Fade-in sections
- Card hover effects
- Scroll animations
- Floating hero elements
- Smooth transitions

---

# Mobile Responsive Planning

## Breakpoints

| Device | Width |
|---|---|
| Mobile | < 768px |
| Tablet | 768px – 1024px |
| Desktop | > 1024px |

---

# SEO Planning

## Include

- Meta titles
- Meta descriptions
- Open Graph tags
- Optimized images
- Sitemap
- Fast page speed

---

# Frontend Features

## Must-Have Features

- Fully responsive UI
- WhatsApp integration
- Inquiry forms
- Fast loading
- Smooth navigation
- SEO optimized pages
- Modern animations

---

# Admin Panel Frontend Planning

# Admin Panel Overview

The admin panel frontend will be built separately in Next.js for managing website content dynamically.

---

# Admin Panel Features

## Dashboard

Display:

- Total inquiries
- Total students
- Total blogs
- Upcoming events
- Website statistics

---

## Manage Courses

Admin can:

- Add courses
- Edit courses
- Delete courses
- Upload course images

---

## Manage Blogs

Features:

- Create blog posts
- Edit blogs
- Delete blogs
- Upload thumbnails

---

## Manage Testimonials

Admin can:

- Add testimonials
- Approve reviews
- Delete testimonials

---

## Manage Events

Admin can:

- Add event details
- Upload event images
- Set event dates

---

## Inquiry Management

Admin can view:

- Student inquiries
- Contact form submissions
- Demo class requests

---

## Authentication System

### Features

- Admin login
- Protected routes
- JWT authentication
- Session handling

---

# Admin Panel UI Theme

## Design Style

- Clean dashboard
- Sidebar navigation
- Green accent colors
- White cards
- Responsive admin layout

---

# Suggested Admin Sidebar

- Dashboard
- Courses
- Blogs
- Testimonials
- Events
- Inquiries
- Settings
- Logout

---

# Recommended Frontend Libraries

| Library | Purpose |
|---|---|
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Hook Form | Form handling |
| Axios | API calls |
| React Toastify | Notifications |
| Swiper.js | Sliders |
| React Icons | Icons |
Lucid React
Lenis 
lazy loading
AOS

---

# Future Frontend Features

## Future Enhancements

- Student login system
- Online classes
- Video lectures
- Online quizzes
- Attendance tracking
- Certificates
- Online payments
- AI chatbot support

---

# Final Goal

The website should create:

- Trust among parents
- Excitement among students
- Easy inquiry process
- Professional educational branding
- Modern learning experience

The overall frontend should feel modern, engaging, fast, and highly student-friendly while maintaining a premium educational look with the green & white theme.