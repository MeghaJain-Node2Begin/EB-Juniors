import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminAuthProvider from '@/components/admin/AdminAuthProvider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <div className="fixed -inset-4 bg-[#FDFBF7] -z-50 pointer-events-none"></div>
      <div className="flex min-h-screen bg-[#FDFBF7] relative">
        <AdminSidebar />
        <div className="flex-1 flex flex-col pl-28">
          <div className="sticky top-0 z-40">
            <AdminHeader />
          </div>
          <main className="flex-1 bg-[#F4F8F4] p-8">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminAuthProvider>
  );
}

