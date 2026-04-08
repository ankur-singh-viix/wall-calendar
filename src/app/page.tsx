import CalendarPage from "@/components/CalendarPage";

export default function Home() {
  return (
    <main className="min-h-screen flex items-start justify-center
      pt-6 pb-12 px-3 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <CalendarPage />
      </div>
    </main>
  );
}