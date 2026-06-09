# Extrabits Junior – Final Database Structure Documentation

# Database Overview

The database is designed for the Extrabits Junior website and admin panel.

The system will manage:

- Website content
- Courses
- Classes
- Educational boards & syllabus
- Blogs
- Events
- Testimonials
- Student inquiries
- Admin authentication
- Gallery images
- Future student portal features

---

# Recommended Database

## Database Engine

- MySQL

---

# Database Naming

```sql
Database Name: extrabits_junior_db
```

---

# Main Database Tables

| Table Name | Purpose |
|---|---|
| admins | Admin authentication |
| boards | Educational boards |
| classes | Class-wise categories |
| students | Student records |
| courses | Course details |
| course_features | Skills/features of courses |
| inquiries | Contact & demo form submissions |
| testimonials | Student/parent reviews |
| blogs | Blog articles |
| blog_categories | Blog categories |
| events | Events/workshops |
| gallery | Images/videos |
| settings | Website settings |
| social_links | Social media links |
| faq | Frequently asked questions |

---

# 1. Admins Table

Stores admin login details.

```sql
CREATE TABLE admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,

    full_name VARCHAR(100),

    email VARCHAR(150) UNIQUE,

    password VARCHAR(255),

    profile_image VARCHAR(255),

    role ENUM(
        'super_admin',
        'admin'
    ) DEFAULT 'admin',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 2. Boards Table

Stores educational boards.

```sql
CREATE TABLE boards (
    board_id INT PRIMARY KEY AUTO_INCREMENT,

    board_name VARCHAR(100) UNIQUE,

    board_description TEXT,

    status ENUM(
        'active',
        'inactive'
    ) DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Example Boards

- GSEB
- CBSE
- ICSE
- IB
- NIOS
- State Board

---

# 3. Classes Table

Stores class categories with board and syllabus details.

```sql
CREATE TABLE classes (
    class_id INT PRIMARY KEY AUTO_INCREMENT,

    board_id INT,

    class_name VARCHAR(50) NOT NULL,

    syllabus_type VARCHAR(100),

    focus_area TEXT,

    class_description TEXT,

    recommended_courses TEXT,

    thumbnail_image VARCHAR(255),

    learning_level ENUM(
        'Beginner',
        'Intermediate',
        'Advanced'
    ) DEFAULT 'Beginner',

    age_group VARCHAR(50),

    duration VARCHAR(100),

    status ENUM(
        'active',
        'inactive'
    ) DEFAULT 'active',

    display_order INT DEFAULT 0,

    meta_title VARCHAR(255),

    meta_description TEXT,

    meta_keywords TEXT,

    og_title VARCHAR(255),

    og_description TEXT,

    schema_markup TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (board_id)
    REFERENCES boards(board_id)
);
```

---

# Example Class Data

| Class | Board | Focus |
|---|---|---|
| 8th–9th | GSEB | Computer Basics |
| 10th | CBSE | Practical IT Skills |
| 11th–12th | ICSE | Programming & Career Guidance |

---

# 4. Courses Table

Stores all courses.

```sql
CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,

    class_id INT,

    course_name VARCHAR(150),

    slug VARCHAR(200),

    short_description TEXT,

    full_description LONGTEXT,

    duration VARCHAR(100),

    fees DECIMAL(10,2),

    level ENUM(
        'Beginner',
        'Intermediate',
        'Advanced'
    ),

    thumbnail_image VARCHAR(255),

    is_featured BOOLEAN DEFAULT FALSE,

    status ENUM(
        'active',
        'inactive'
    ) DEFAULT 'active',

    meta_title VARCHAR(255),

    meta_description TEXT,

    meta_keywords TEXT,

    og_title VARCHAR(255),

    og_description TEXT,

    schema_markup TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (class_id)
    REFERENCES classes(class_id)
);
```

---

# 5. Course Features Table

Stores course skills/features.

```sql
CREATE TABLE course_features (
    feature_id INT PRIMARY KEY AUTO_INCREMENT,

    course_id INT,

    feature_name VARCHAR(255),

    FOREIGN KEY (course_id)
    REFERENCES courses(course_id)
);
```

---

# Example Features

| course_id | feature_name |
|---|---|
| 1 | Practical Exercises |
| 1 | Certificate Included |
| 2 | Live Coding Sessions |

---

# 6. Inquiries Table

Stores contact forms and demo class requests.

```sql
CREATE TABLE inquiries (
    inquiry_id INT PRIMARY KEY AUTO_INCREMENT,

    full_name VARCHAR(150),

    phone VARCHAR(20),

    email VARCHAR(150),

    class_id INT,

    course_id INT,

    message TEXT,

    inquiry_type ENUM(
        'contact',
        'demo_class'
    ),

    status ENUM(
        'new',
        'contacted',
        'closed'
    ) DEFAULT 'new',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (class_id)
    REFERENCES classes(class_id),

    FOREIGN KEY (course_id)
    REFERENCES courses(course_id)
);
```

---

# 7. Testimonials Table

Stores student and parent reviews.

```sql
CREATE TABLE testimonials (
    testimonial_id INT PRIMARY KEY AUTO_INCREMENT,

    student_name VARCHAR(150),

    parent_name VARCHAR(150),

    review TEXT,

    rating INT,

    image VARCHAR(255),

    approved BOOLEAN DEFAULT FALSE,

    meta_title VARCHAR(255),

    meta_description TEXT,

    meta_keywords TEXT,

    og_title VARCHAR(255),

    og_description TEXT,

    schema_markup TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 8. Blog Categories Table

```sql
CREATE TABLE blog_categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,

    category_name VARCHAR(100),

    slug VARCHAR(150),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 9. Blogs Table

Stores blog articles.

```sql
CREATE TABLE blogs (
    blog_id INT PRIMARY KEY AUTO_INCREMENT,

    category_id INT,

    title VARCHAR(255),

    slug VARCHAR(255),

    short_description TEXT,

    content LONGTEXT,

    thumbnail_image VARCHAR(255),

    author_name VARCHAR(150),

    meta_title VARCHAR(255),

    meta_description TEXT,

    meta_keywords TEXT,

    og_title VARCHAR(255),

    og_description TEXT,

    schema_markup TEXT,

    views INT DEFAULT 0,

    is_featured BOOLEAN DEFAULT FALSE,

    status ENUM(
        'draft',
        'published'
    ) DEFAULT 'draft',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id)
    REFERENCES blog_categories(category_id)
);
```

---

# Example Blog Categories

- Coding Tips
- Career Guidance
- Computer Tricks
- Student Learning
- Technology News

---

# 10. Events Table

Stores workshops and activities.

```sql
CREATE TABLE events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,

    title VARCHAR(255),

    slug VARCHAR(255),

    description LONGTEXT,

    event_image VARCHAR(255),

    event_date DATE,

    event_time VARCHAR(100),

    location VARCHAR(255),

    registration_link VARCHAR(255),

    status ENUM(
        'upcoming',
        'completed'
    ) DEFAULT 'upcoming',

    meta_title VARCHAR(255),

    meta_description TEXT,

    meta_keywords TEXT,

    og_title VARCHAR(255),

    og_description TEXT,

    schema_markup TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 11. Gallery Table

Stores images and videos.

```sql
CREATE TABLE gallery (
    gallery_id INT PRIMARY KEY AUTO_INCREMENT,

    title VARCHAR(255),

    media_type ENUM(
        'image',
        'video'
    ),

    media_url VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 12. Settings Table

Stores website settings.

```sql
CREATE TABLE settings (
    setting_id INT PRIMARY KEY AUTO_INCREMENT,

    website_name VARCHAR(255),

    logo VARCHAR(255),

    favicon VARCHAR(255),

    contact_email VARCHAR(150),

    contact_phone VARCHAR(20),

    address TEXT,

    opening_time VARCHAR(100),

    closing_time VARCHAR(100),

    hero_title VARCHAR(255),

    hero_subtitle TEXT,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 13. Social Links Table

Stores social media links.

```sql
CREATE TABLE social_links (
    social_id INT PRIMARY KEY AUTO_INCREMENT,

    platform_name VARCHAR(100),

    icon VARCHAR(100),

    url VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Example Platforms

- Instagram
- Facebook
- YouTube
- LinkedIn
- WhatsApp

---

# 14. FAQ Table

Stores frequently asked questions.

```sql
CREATE TABLE faq (
    faq_id INT PRIMARY KEY AUTO_INCREMENT,

    question TEXT,

    answer TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Future Tables (Optional)

These can be added later.

---

# 16. Students Table

```sql
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,

    class_id INT,

    full_name VARCHAR(150),

    email VARCHAR(150),

    phone VARCHAR(20),

    password VARCHAR(255),

    profile_image VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (class_id)
    REFERENCES classes(class_id)
);
```


---

# Database Relationships

## Relationships Overview

| Table | Relationship |
|---|---|
| boards → classes | One-to-Many |
| classes → courses | One-to-Many |
| classes → students | One-to-Many |
| courses → course_features | One-to-Many |
| blog_categories → blogs | One-to-Many |

---

# File Upload Structure

## Suggested Upload Folders

```bash
uploads/
│
├── courses/
├── blogs/
├── testimonials/
├── events/
├── gallery/
├── admins/
└── students/
```

---

# API Modules Needed

# Frontend APIs

- Get Boards
- Get Classes
- Get Courses
- Get Blogs
- Get Testimonials
- Get Events
- Submit Inquiry

---

# Admin APIs

- Admin Login
- CRUD Boards
- CRUD Classes
- CRUD Courses
- CRUD Blogs
- CRUD Testimonials
- CRUD Events
- Manage Inquiries
- Manage Gallery
- Manage Settings

---

# Recommended Backend Structure

## Backend Technologies

| Technology | Purpose |
|---|---|
| PHP | Backend |
| MySQL | Database |
| JWT | Authentication |
| REST API | API communication |

---

# Security Recommendations

## Important Security Features

- Password hashing
- JWT authentication
- Input validation
- SQL injection prevention
- XSS protection
- CSRF protection
- Secure file uploads

---

# Performance Optimization

## Recommendations

- Image compression
- Lazy loading
- Database indexing
- API caching
- CDN for images

---

# Final Architecture Flow

```text
Frontend (Next.js)
        ↓
REST API (PHP Backend)
        ↓
MySQL Database
        ↓
Admin Panel Management
```

---

# Final Goal

The database should support:

- Dynamic content management
- Multiple educational boards
- Class-wise learning structure
- Scalable educational platform
- Future student portal
- Fast performance
- Secure admin management
- Easy frontend integration
- Professional educational workflow