import LoginClient from "@/components/auth/LoginClient";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden">
      <div className="flex-grow flex items-center justify-center py-12 px-6 relative z-10">
        <LoginClient />
      </div>
    </main>
  );
}
