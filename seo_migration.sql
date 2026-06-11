USE extrabits_junior_db;

-- 1. Courses Table Migration
-- Rename existing columns if they exist (we need to be careful if they don't, but let's assume they do based on previous DESCRIBE)
ALTER TABLE courses CHANGE meta_title seo_title VARCHAR(255) DEFAULT NULL;
ALTER TABLE courses CHANGE meta_description seo_description TEXT DEFAULT NULL;
ALTER TABLE courses CHANGE meta_keywords seo_keywords TEXT DEFAULT NULL;
ALTER TABLE courses CHANGE schema_markup schema_json JSON DEFAULT NULL;

-- Add the new fields
ALTER TABLE courses ADD COLUMN twitter_title VARCHAR(255) DEFAULT NULL;
ALTER TABLE courses ADD COLUMN twitter_description TEXT DEFAULT NULL;
ALTER TABLE courses ADD COLUMN primary_keyword VARCHAR(255) DEFAULT NULL;
ALTER TABLE courses ADD COLUMN secondary_keywords TEXT DEFAULT NULL;
ALTER TABLE courses ADD COLUMN canonical_url VARCHAR(255) DEFAULT NULL;
ALTER TABLE courses ADD COLUMN city VARCHAR(100) DEFAULT NULL;
ALTER TABLE courses ADD COLUMN area VARCHAR(100) DEFAULT NULL;
ALTER TABLE courses ADD COLUMN local_seo_enabled TINYINT(1) DEFAULT 0;

-- 2. Classes Table Migration
-- Check if classes has meta_title, etc. If not, add them directly as seo_title
ALTER TABLE classes ADD COLUMN seo_title VARCHAR(255) DEFAULT NULL;
ALTER TABLE classes ADD COLUMN seo_description TEXT DEFAULT NULL;
ALTER TABLE classes ADD COLUMN seo_keywords TEXT DEFAULT NULL;
ALTER TABLE classes ADD COLUMN og_title VARCHAR(255) DEFAULT NULL;
ALTER TABLE classes ADD COLUMN og_description TEXT DEFAULT NULL;
ALTER TABLE classes ADD COLUMN twitter_title VARCHAR(255) DEFAULT NULL;
ALTER TABLE classes ADD COLUMN twitter_description TEXT DEFAULT NULL;
ALTER TABLE classes ADD COLUMN primary_keyword VARCHAR(255) DEFAULT NULL;
ALTER TABLE classes ADD COLUMN secondary_keywords TEXT DEFAULT NULL;
ALTER TABLE classes ADD COLUMN canonical_url VARCHAR(255) DEFAULT NULL;
ALTER TABLE classes ADD COLUMN schema_json JSON DEFAULT NULL;
ALTER TABLE classes ADD COLUMN city VARCHAR(100) DEFAULT NULL;
ALTER TABLE classes ADD COLUMN area VARCHAR(100) DEFAULT NULL;
ALTER TABLE classes ADD COLUMN local_seo_enabled TINYINT(1) DEFAULT 0;
