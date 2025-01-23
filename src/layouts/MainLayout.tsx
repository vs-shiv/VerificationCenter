import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={"/RAII.png"}
                alt="Responsible AI Institute"
                className="h-8 object-contain"
              />
              <div className="ml-4 h-6 w-px bg-gray-300" />
              <span className="ml-4 text-lg font-semibold">
                Verification Center
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
