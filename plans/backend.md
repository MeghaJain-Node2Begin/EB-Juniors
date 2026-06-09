# Extrabits Junior – Backend Planning Documentation

# Backend Overview

The backend for **Extrabits Junior** will power the complete website and admin panel system.

The backend will handle:

- Authentication
- API management
- Database operations
- Course management
- Blog management
- Inquiry handling
- Events management
- Testimonials
- Gallery uploads
- Admin dashboard
- Future student portal features

The backend will be built using:

- PHP
- MySQL
- REST API Architecture
- JWT Authentication

---

# Backend Technology Stack

| Technology | Purpose |
|---|---|
| PHP 8+ | Backend Development |
| MySQL | Database |
| Apache / Nginx | Web Server |
| JWT | Authentication |
| REST API | API Communication |
| Composer | Dependency Management |
| PHPMailer | Email Sending |
| PDO | Database Connection |
| Firebase JWT | Token Authentication |

---

# Backend Architecture

## Architecture Flow

```text
Next.js Frontend
        ↓
REST API (PHP Backend)
        ↓
Authentication Layer
        ↓
Business Logic Layer
        ↓
MySQL Database
```

---

# Recommended Backend Folder Structure

```bash
backend/
│
├── app/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   ├── helpers/
│   └── validations/
│
├── config/
│   ├── database.php
│   ├── jwt.php
│   └── app.php
│
├── routes/
│   ├── api.php
│   └── admin.php
│
├── uploads/
│   ├── courses/
│   ├── blogs/
│   ├── testimonials/
│   ├── events/
│   ├── gallery/
│   ├── admins/
│   └── students/
│
├── public/
│   ├── index.php
│   └── .htaccess
│
├── storage/
│
├── vendor/
│
├── composer.json
│
└── .env
```

---

# Backend Modules

# Core Modules

| Module | Purpose |
|---|---|
| Authentication Module | Admin login & JWT |
| Courses Module | Manage courses |
| Classes Module | Manage class-wise learning |
| Boards Module | Manage education boards |
| Blogs Module | Manage blogs |
| Testimonials Module | Manage reviews |
| Events Module | Manage workshops/events |
| Inquiry Module | Handle student inquiries |
| Gallery Module | Manage images/videos |
| Settings Module | Website settings |

---

# Database Connection

## Recommended Method

Use:

- PDO (PHP Data Objects)

Advantages:

- Secure
- Prepared statements
- SQL injection protection
- Better maintainability

---

# Example Database Connection

```php
<?php

$host = "localhost";
$dbname = "extrabits_junior_db";
$username = "root";
$password = "";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname",
        $username,
        $password
    );

    $pdo->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

} catch (PDOException $e) {
    die("Connection Failed: " . $e->getMessage());
}
```

---

# Authentication System

# Admin Authentication

## Features

- Admin login
- JWT authentication
- Secure password hashing
- Role-based access
- Protected admin routes
- Session handling

---

# JWT Authentication Flow

```text
Admin Login
      ↓
Validate Credentials
      ↓
Generate JWT Token
      ↓
Send Token to Frontend
      ↓
Frontend Stores Token
      ↓
Protected API Access
```

---

# Password Security

Use:

```php
password_hash()
password_verify()
```

Example:

```php
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
```

---

# API Structure

# API Base URL

```text
/api/v1/
```

---

# Authentication APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /auth/login | Admin login |
| POST | /auth/logout | Logout |
| GET | /auth/profile | Admin profile |

---

# Boards APIs

| Method | Endpoint |
|---|---|
| GET | /boards |
| GET | /boards/{id} |
| POST | /boards |
| PUT | /boards/{id} |
| DELETE | /boards/{id} |

---

# Classes APIs

| Method | Endpoint |
|---|---|
| GET | /classes |
| GET | /classes/{id} |
| POST | /classes |
| PUT | /classes/{id} |
| DELETE | /classes/{id} |

---

# Courses APIs

| Method | Endpoint |
|---|---|
| GET | /courses |
| GET | /courses/{slug} |
| POST | /courses |
| PUT | /courses/{id} |
| DELETE | /courses/{id} |

---

# Blogs APIs

| Method | Endpoint |
|---|---|
| GET | /blogs |
| GET | /blogs/{slug} |
| POST | /blogs |
| PUT | /blogs/{id} |
| DELETE | /blogs/{id} |

---

# Testimonials APIs

| Method | Endpoint |
|---|---|
| GET | /testimonials |
| POST | /testimonials |
| PUT | /testimonials/{id} |
| DELETE | /testimonials/{id} |

---

# Events APIs

| Method | Endpoint |
|---|---|
| GET | /events |
| GET | /events/{slug} |
| POST | /events |
| PUT | /events/{id} |
| DELETE | /events/{id} |

---

# Inquiry APIs

| Method | Endpoint |
|---|---|
| POST | /inquiries |
| GET | /admin/inquiries |
| PUT | /admin/inquiries/{id} |

---

# File Upload System

# Upload Features

- Course thumbnails
- Blog images
- Event banners
- Testimonial photos
- Gallery images
- Admin profile images

---

# Recommended Upload Validation

## Validation Rules

| Validation | Recommendation |
|---|---|
| File Type | JPG, PNG, WEBP |
| Max Size | 2MB |
| Secure Name | Random filename |
| MIME Validation | Required |

---

# Example Upload Structure

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

# Middleware Planning

# Required Middleware

| Middleware | Purpose |
|---|---|
| Auth Middleware | JWT verification |
| Admin Middleware | Admin-only access |
| Validation Middleware | Request validation |
| Upload Middleware | File handling |
| CORS Middleware | Frontend communication |

---

# Validation System

# Validation Features

- Required field validation
- Email validation
- Phone validation
- File validation
- Password validation

---

# Example Validation

```php
if (empty($email)) {
    return response(false, "Email is required");
}
```

---

# Response Format

# Standard API Response

## Success Response

```json
{
  "success": true,
  "message": "Courses fetched successfully",
  "data": []
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

# Email System

# Email Features

Use PHPMailer for:

- Inquiry notifications
- Demo class confirmations
- Admin alerts

---

# Example Email Flow

```text
Student submits inquiry
        ↓
Backend validates data
        ↓
Store inquiry in database
        ↓
Send admin email notification
        ↓
Send confirmation to student
```

---

# Security Planning

# Important Security Features

## Authentication Security

- JWT token expiry
- Refresh token support
- Password hashing
- Secure sessions

---

## API Security

- SQL injection prevention
- XSS protection
- CSRF protection
- Input sanitization
- Rate limiting

---

## File Upload Security

- File MIME validation
- File size limits
- Secure upload folders
- Random filenames

---

# Performance Optimization

# Optimization Features

- Database indexing
- API caching
- Lazy image loading
- Optimized SQL queries
- Pagination support

---

# Pagination Planning

# Example Pagination

```text
GET /blogs?page=1&limit=10
```

---

# Search & Filtering APIs

# Example Features

## Courses

- Filter by class
- Filter by board
- Filter by level

## Blogs

- Search by keyword
- Filter by category

## Events

- Upcoming events
- Completed events

---

# Example Query

```text
GET /courses?board=CBSE&level=Beginner
```

---

# Logging System

# Logging Features

Store logs for:

- Login attempts
- API errors
- File uploads
- Admin activities

---

# Admin Panel Backend Planning

# Admin Features

## Dashboard APIs

Provide:

- Total inquiries
- Total students
- Total blogs
- Total courses
- Upcoming events

---

# Content Management APIs

## Admin Can Manage

- Boards
- Classes
- Courses
- Blogs
- Testimonials
- Events
- Gallery
- FAQ
- Settings

---

# Future Backend Features

# Future Enhancements

- Student login system
- Online classes
- Video streaming
- Quiz management
- Attendance management
- Online payments
- AI chatbot APIs
- Push notifications
- Certificates generation

---

# Suggested PHP Packages

# Composer Packages

```bash
composer require firebase/php-jwt
composer require phpmailer/phpmailer
```

---

# Environment Variables

# .env Example

```env
APP_NAME=ExtrabitsJunior
APP_URL=http://localhost

DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=extrabits_junior_db
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=your_secret_key
```

---

# Deployment Recommendations

# Recommended Hosting

| Hosting | Recommendation |
|---|---|
| Hostinger | Good for beginners |
| DigitalOcean | VPS hosting |
| AWS | Scalable solution |
| cPanel Hosting | Easy deployment |

---

# Recommended Server

- Apache
OR
- Nginx

---

# Final Backend Workflow

```text
Student Visits Website
          ↓
Frontend Calls REST API
          ↓
PHP Backend Processes Request
          ↓
Database Operations
          ↓
JSON Response Sent Back
          ↓
Frontend Updates UI
```

---

# Final Goal

The backend should provide:

- Secure authentication
- Fast API responses
- Dynamic content management
- Scalable architecture
- Easy frontend integration
- Secure file handling
- Professional educational workflow

The backend architecture should remain modular, scalable, secure, and future-ready for advanced educational features.