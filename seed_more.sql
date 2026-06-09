USE extrabits_junior_db;

-- 1. Insert Sample Testimonials
INSERT INTO testimonials (student_name, parent_name, review, rating, approved, created_at) VALUES 
('Aarav Patel', 'Priya Patel', 'ExtraBits has completely transformed my child’s understanding of computers. The practical approach makes learning so much fun!', 5, 1, NOW()),
('Riya Sharma', 'Anil Sharma', 'The programming basics course gave my daughter the confidence to build her own small applications. Highly recommended!', 5, 1, NOW()),
('Kabir Singh', 'Meera Singh', 'We are very happy with the curriculum. The teachers are supportive and the hands-on projects are very engaging.', 4, 1, NOW());

-- 2. Insert Sample Events
INSERT INTO events (title, slug, description, event_date, event_time, location, registration_link, status, created_at) VALUES 
('Annual Tech Fest 2026', 'annual-tech-fest-2026', 'Join us for a spectacular showcase of student projects, coding competitions, and interactive tech workshops. This event is open to all students and parents.', '2026-08-15', '10:00 AM - 4:00 PM', 'ExtraBits Main Campus Auditorium', 'https://example.com/register/tech-fest', 'upcoming', NOW()),
('Parent-Teacher Interaction Meet', 'parent-teacher-meet-july-2026', 'A comprehensive session to discuss student progress, upcoming curriculums, and strategies to support technical learning at home.', '2026-07-10', '09:00 AM - 1:00 PM', 'ExtraBits Block B, Room 104', 'https://example.com/register/ptm', 'upcoming', NOW()),
('Winter Coding Bootcamp', 'winter-coding-bootcamp-2025', 'An intensive one-week coding bootcamp focused on web development and game design for junior students. Lots of fun and learning!', '2025-12-20', '10:00 AM - 2:00 PM', 'Virtual Event (Zoom)', 'https://example.com/register/winter-bootcamp', 'completed', NOW());

-- 3. Insert Sample Blogs (Assuming category_id = 1 or NULL is allowed, if it fails we will add a category)
-- Let's try inserting without category_id if possible, or just use 1.
-- Wait, the schema shows category_id is YES (Nullable). So we can use NULL to be safe.
INSERT INTO blogs (category_id, title, slug, short_description, content, author_name, is_featured, status, created_at) VALUES 
(NULL, '5 Ways to Spark Your Child''s Interest in Coding', '5-ways-to-spark-childs-interest-in-coding', 'Discover simple, fun, and effective strategies to introduce your child to the world of programming without making it feel like homework.', '<p>Coding is the literacy of the 21st century. But how do you get kids excited about it? Start by making it relatable. Use visual block-based languages like Scratch before jumping into syntax. Connect coding to their hobbies—if they love video games, show them how to mod or build one!</p><p>Remember to keep screen time balanced and emphasize the creative aspects of technology rather than just the consumption side.</p>', 'Pooja Verma', 1, 'published', NOW()),
(NULL, 'Why Digital Literacy is Essential Before High School', 'why-digital-literacy-essential-before-high-school', 'Understanding the internet, digital footprints, and basic software tools is no longer optional. Here’s why starting early matters.', '<p>By the time students reach high school, they are expected to research online, format documents, and present data. A strong foundation in digital literacy ensures they don’t fall behind. Furthermore, understanding online safety, phishing, and digital footprints at a younger age protects them from common internet hazards.</p>', 'Rahul Desai', 0, 'published', NOW()),
(NULL, 'The Future of AI in Junior Education', 'future-of-ai-in-junior-education', 'Artificial Intelligence isn’t just for experts. See how AI concepts are being introduced in junior tech curriculums.', '<p>AI is rapidly changing how we live and work. Introducing basic AI concepts, like how recommendation algorithms work or how chatbots generate text, helps demystify the technology. At ExtraBits, we focus on helping students become conscious creators rather than passive consumers of AI tools.</p>', 'ExtraBits Editorial Team', 1, 'published', NOW());
