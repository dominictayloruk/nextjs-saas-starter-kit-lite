// Temporarily use minimal layout to fix build issues
function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold">SaaS App</h1>
            <nav className="space-x-4">
              <a href="/home" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/home/settings" className="text-gray-600 hover:text-gray-900">Settings</a>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export default HomeLayout;
