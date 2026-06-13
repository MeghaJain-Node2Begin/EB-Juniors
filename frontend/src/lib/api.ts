export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ClassData {
  class_id: number;
  board_id: number;
  class_name: string;
  slug_title?: string;
  syllabus_type: string;
  focus_area: string;
  class_description: string;
  recommended_courses: string;
  thumbnail_image: string | null;
  learning_level: string;
  age_group: string;
  duration: string;
  status: string;
  display_order: number;
  created_at: string;
  updated_at: string;
  board_name: string;
}

export interface CourseData {
  course_id: number;
  class_id: number;
  course_name: string;
  slug_title: string;
  short_description: string;
  full_description: string;
  duration: string;
  fees: string;
  level: string;
  thumbnail_image: string | null;
  is_featured: number;
  status: string;
  created_at: string;
  class_name: string;
  primary_slug?: string;
}

export async function fetchClasses(): Promise<ClassData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/classes/read.php`, {
      cache: 'no-store', // Always fetch fresh data from the API
    });
    const data = await response.json();
    if (data.success) {
      // Filter for active classes only
      return data.data.filter((item: ClassData) => item.status === 'active');
    }
    return [];
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
}

export async function fetchCourses(): Promise<CourseData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/read.php`, {
      cache: 'no-store',
    });
    const data = await response.json();
    if (data.success) {
      // Filter for active courses only
      return data.data.filter((item: CourseData) => item.status === 'active');
    }
    return [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export interface BlogData {
  blog_id: number;
  category_id: number;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  thumbnail_image: string | null;
  author_name: string;
  meta_title: string;
  meta_description: string;
  views: number;
  is_featured: number;
  status: string;
  created_at: string;
  category_name?: string;
}

export interface EventData {
  event_id: number;
  title: string;
  slug: string;
  description: string;
  event_image?: string;
  gallery_images?: string;
  event_date: string;
  event_time: string;
  location: string;
  registration_link?: string;
  status: 'upcoming' | 'completed';
  created_at: string;
}

export interface TestimonialData {
  testimonial_id: number;
  student_name: string;
  parent_name: string;
  review: string;
  rating: number;
  image?: string;
  approved: number;
  created_at: string;
}

export async function fetchBlogs(): Promise<BlogData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/read.php`, {
      cache: 'no-store',
    });
    const data = await response.json();
    if (data.success) {
      return data.data.filter((item: BlogData) => item.status === 'published');
    }
    return [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function fetchBlogById(id: string): Promise<BlogData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/read_single.php?id=${id}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function fetchEvents(): Promise<EventData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/events/read.php`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}


export async function registerStudent(userData: FormData) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register.php`, {
      method: 'POST',
      body: userData,
    });
    return await response.json();
  } catch (error) {
    console.error('Error registering student:', error);
    return { success: false, message: 'Network error occurred.' };
  }
}

export async function loginStudent(credentials: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'Network error occurred.' };
  }
}
export async function createInquiry(inquiryData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries/create.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inquiryData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return { success: false, message: 'Network error occurred.' };
  }
}

export async function adminLogin(credentials: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/admin_login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error('Error in admin login:', error);
    return { success: false, message: 'Network error occurred.' };
  }
}

export async function fetchTestimonials(): Promise<TestimonialData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials/read.php`, {
      cache: 'no-store',
    });
    const data = await response.json();
    if (data.success) {
      return data.data.filter((item: TestimonialData) => item.approved === 1);
    }
    return [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function fetchEventBySlug(slug: string): Promise<EventData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/events/read_single.php?id=${slug}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching event by slug:', error);
    return null;
  }
}
