import RegisterClient from "@/components/auth/RegisterClient";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden">
      <div className="flex-grow flex items-center justify-center py-12 px-6 relative z-10">
        <RegisterClient />
      </div>
    </main>
  );
}
