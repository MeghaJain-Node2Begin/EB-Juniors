import { HelpCircle, Users, BookOpen } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-black mb-8 text-zinc-900 tracking-tight">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-between group hover:border-teal-200 transition-colors">
          <div>
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Inquiries</h2>
            <p className="text-4xl font-black text-teal-600">0</p>
          </div>
          <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
            <HelpCircle className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-between group hover:border-teal-200 transition-colors">
          <div>
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Students</h2>
            <p className="text-4xl font-black text-teal-600">0</p>
          </div>
          <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-between group hover:border-teal-200 transition-colors">
          <div>
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Courses</h2>
            <p className="text-4xl font-black text-teal-600">0</p>
          </div>
          <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

