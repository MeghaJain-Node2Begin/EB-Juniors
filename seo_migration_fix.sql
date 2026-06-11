USE extrabits_junior_db;

-- Drop the incorrectly added columns from previous run
ALTER TABLE classes DROP COLUMN seo_title;
ALTER TABLE classes DROP COLUMN seo_description;
ALTER TABLE classes DROP COLUMN seo_keywords;

-- Rename existing columns properly
ALTER TABLE classes CHANGE meta_title seo_title VARCHAR(255) DEFAULT NULL;
ALTER TABLE classes CHANGE meta_description seo_description TEXT DEFAULT NULL;
ALTER TABLE classes CHANGE meta_keywords seo_keywords TEXT DEFAULT NULL;
ALTER TABLE classes CHANGE schema_markup schema_json JSON DEFAULT NULL;

-- Add the missing fields (og_title and og_description already exist)
ALTER TABLE classes ADD COLUMN twitter_title VARCHAR(255) DEFAULT NULL;
ALTER TABLE classes ADD COLUMN twitter_description TEXT DEFAULT NULL;
ALTER TABLE classes ADD COLUMN primary_keyword VARCHAR(255) DEFAULT NULL;
ALTER TABLE classes ADD COLUMN secondary_keywords TEXT DEFAULT NULL;
ALTER TABLE classes ADD COLUMN canonical_url VARCHAR(255) DEFAULT NULL;
ALTER TABLE classes ADD COLUMN city VARCHAR(100) DEFAULT NULL;
ALTER TABLE classes ADD COLUMN area VARCHAR(100) DEFAULT NULL;
ALTER TABLE classes ADD COLUMN local_seo_enabled TINYINT(1) DEFAULT 0;
