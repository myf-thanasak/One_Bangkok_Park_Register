import RegistrationForm from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-water text-white py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-10 text-6xl animate-float">🌊</div>
          <div className="absolute top-8 right-16 text-5xl animate-float" style={{ animationDelay: "1s" }}>💦</div>
          <div className="absolute bottom-4 left-1/3 text-4xl animate-splash">🏖️</div>
          <div className="absolute top-12 left-2/3 text-5xl animate-float" style={{ animationDelay: "0.5s" }}>☀️</div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
            The Whimsical Water Park
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-1">
            ลงทะเบียนร่วมกิจกรรม
          </p>
          <p className="text-base opacity-80 mb-1">
            วันที่ 10 - 15 เม.ย. 2569 ที่ One Bangkok Park
          </p>
          <p className="text-base opacity-80 mb-1">
            The Whimsical Water Park Registration
          </p>
          <p className="text-sm opacity-70">
            Date 10 - 15 Apr. 2026 at One Bangkok Park
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 py-8 -mt-4">
        <RegistrationForm />
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400 border-t border-water-100">
        © 2026 One Bangkok Park — The Whimsical Water Park
      </footer>
    </main>
  );
}
