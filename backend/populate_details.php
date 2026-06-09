<?php
require_once __DIR__ . '/config/database.php';

try {
    // 1. Add detailed sample data for EVENTS
    $eventsQuery = "INSERT INTO events (title, slug, description, event_image, event_date, event_time, location, registration_link, status) VALUES 
    ('Annual Tech Fest 2026', 'annual-tech-fest-2026', 'Join us for our biggest annual tech showcase! This immersive, full-day event brings together our brightest students to demonstrate their incredible coding projects, autonomous robots, and innovative software solutions. \n\nAttendees will enjoy interactive workshops on AI, hands-on game development sessions, and competitive hackathons with amazing prizes. Parents can attend dedicated seminars on the future of tech education and career opportunities for young developers. This is an unparalleled opportunity to witness the skills your children have mastered and engage with a community of forward-thinking educators and tech enthusiasts.', 'event1.jpg', '2026-08-15', '10:00 AM - 4:00 PM', 'ExtraBits Main Campus Auditorium', 'https://example.com/register/1', 'upcoming'),
    
    ('Robotics Summer Bootcamp', 'robotics-summer-bootcamp', 'Dive into the fascinating world of robotics in this intensive 5-day bootcamp. Students will work in teams to design, build, and program their own autonomous robots from scratch using industry-standard kits and programming languages. \n\nThe curriculum covers sensor integration, motor control, algorithmic thinking, and problem-solving under constraints. By the end of the week, teams will compete in a thrilling maze-solving and sumo-bot competition! Perfect for both beginners and intermediate learners who want a hands-on, deeply engaging engineering experience.', 'event2.jpg', '2026-06-20', '09:00 AM - 01:00 PM', 'Downtown STEM Lab', 'https://example.com/register/2', 'upcoming'),

    ('Parent-Child Coding Workshop', 'parent-child-coding-workshop', 'Experience the joy of coding alongside your child! This unique weekend workshop is designed to bridge the generational gap in technology. Parents and children will pair up to create interactive games and simple applications using block-based and text-based coding environments. \n\nOur instructors will guide you step-by-step, ensuring a fun, collaborative, and incredibly rewarding bonding experience. No prior coding experience is required—just bring your creativity and enthusiasm!', 'event3.jpg', '2026-07-10', '02:00 PM - 05:00 PM', 'Online via Zoom', 'https://example.com/register/3', 'upcoming')";

    $pdo->exec("TRUNCATE TABLE events");
    $pdo->exec($eventsQuery);

    // 2. Add detailed sample data for BLOGS
    // Columns: category_id, title, slug, short_description, content, author_name, meta_title, meta_description, is_featured, status, thumbnail_image
    $blogsQuery = "INSERT INTO blogs (category_id, title, slug, short_description, content, author_name, meta_title, meta_description, is_featured, status, thumbnail_image) VALUES 
    (1, '5 Ways to Spark Your Child\'s Interest in Coding', '5-ways-to-spark-childs-interest-in-coding', 'Discover actionable, fun, and creative strategies to introduce your child to the world of programming without making it feel like homework.', '<h3>1. Turn Screen Time into Creation Time</h3>\n<p>Instead of passively consuming content, encourage your child to understand how their favorite games work. Platforms like Scratch or Roblox Studio allow kids to see the mechanics behind the fun.</p>\n\n<h3>2. Connect Coding to Their Existing Hobbies</h3>\n<p>Does your child love art? Introduce them to generative art using Python. Are they into music? Show them Sonic Pi. Coding is a tool that enhances other passions.</p>\n\n<h3>3. Start with Tangible Tech</h3>\n<p>Robotics kits like LEGO Mindstorms or Sphero provide immediate, physical feedback to code. Seeing a robot move exactly as they programmed it is incredibly empowering for a young learner.</p>\n\n<h3>4. Embrace Gamified Learning</h3>\n<p>Use apps that turn learning syntax into a puzzle game. Gamification keeps frustration low and engagement high.</p>\n\n<h3>5. Celebrate the Failures (Debugging)</h3>\n<p>Teach them that bugs aren\'t failures; they are puzzles waiting to be solved. Developing resilience through debugging is one of the most valuable life skills coding provides.</p>', 'Sarah Jenkins', '5 Ways to Spark Your Childs Interest in Coding', 'Discover actionable strategies to introduce your child to programming.', 1, 'published', 'blog1.jpg'),
    
    (2, 'The Future of AI in Education', 'future-of-ai-in-education', 'Explore how Artificial Intelligence is reshaping the classroom, providing personalized learning experiences, and preparing students for the jobs of tomorrow.', '<h3>Personalized Learning at Scale</h3>\n<p>AI algorithms can now adapt in real-time to a student\'s learning pace, identifying areas where they struggle and providing tailored exercises to help them master the concept. This means no student is left behind, and advanced students are consistently challenged.</p>\n\n<h3>AI as a Collaborative Tool</h3>\n<p>We are moving past the fear of AI replacing human thought. Instead, we are teaching students how to collaborate with AI. Prompt engineering, critical evaluation of AI outputs, and ethical AI usage are becoming fundamental pillars of our curriculum.</p>\n\n<h3>Preparing for the Unknown</h3>\n<p>Many of the jobs our students will hold haven\'t been invented yet. By teaching them the underlying principles of AI and machine learning, we are equipping them with the ultimate adaptable toolkit for the future economy.</p>', 'Dr. Alan Turing', 'The Future of AI in Education', 'Explore how AI is reshaping the classroom.', 0, 'published', 'blog2.jpg'),

    (1, 'Why Python is the Perfect First Language', 'why-python-is-perfect-first-language', 'A deep dive into why Python\'s readable syntax and vast ecosystem make it the undisputed champion for beginner programmers.', '<h3>Readability Counts</h3>\n<p>Python reads almost like plain English. This eliminates the steep syntax curve associated with languages like C++ or Java, allowing beginners to focus entirely on learning programming logic and algorithmic thinking.</p>\n\n<h3>Immediate Gratification</h3>\n<p>With Python, a student can write a functional script in three lines of code. This rapid turnaround from thought to execution keeps motivation incredibly high.</p>\n\n<h3>A Language that Grows with You</h3>\n<p>While easy for kids to learn, Python is not a toy language. It is the backbone of modern web applications, data science, and artificial intelligence. The skills they learn today will directly translate to professional environments tomorrow.</p>', 'Mark Zuckerberg', 'Why Python is the Perfect First Language', 'Why Python is the champion for beginner programmers.', 0, 'published', 'blog3.jpg')";

    // Turn off foreign key checks temporarily so we can truncate blogs if needed
    $pdo->exec("SET FOREIGN_KEY_CHECKS=0;");
    $pdo->exec("TRUNCATE TABLE blogs;");
    $pdo->exec($blogsQuery);
    $pdo->exec("SET FOREIGN_KEY_CHECKS=1;");

    // 3. Add sample data for TESTIMONIALS
    $testimonialsQuery = "INSERT INTO testimonials (student_name, parent_name, review, rating, approved) VALUES 
    ('Alex M.', 'David M.', 'Extrabits completely transformed Alex\'s perspective on technology. He went from just playing video games to actively coding his own within three months. The instructors are incredibly patient and know exactly how to keep the kids engaged.', 5, 1),
    ('Sophia R.', 'Maria R.', 'The Robotics bootcamp was the highlight of Sophia\'s summer. She came home every day excited to tell us about circuits and sensors. The hands-on approach is fantastic, and the facility is top-notch. Highly recommended!', 5, 1),
    ('Ethan W.', 'John W.', 'I was hesitant about enrolling my 8-year-old in a coding class, thinking it might be too advanced. But the curriculum is perfectly tailored. Ethan is now building his own web pages and is so proud of his creations. Best investment in his education.', 5, 1)";
    
    $pdo->exec("TRUNCATE TABLE testimonials");
    $pdo->exec($testimonialsQuery);

    echo "Database successfully populated with rich detailed data for events, blogs, and testimonials!\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
