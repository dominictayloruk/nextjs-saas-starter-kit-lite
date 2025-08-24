// Temporarily use minimal layout to fix build issues
function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-semibold">SaaS App</h1>
            <nav className="space-x-4">
              <a href="/home" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a
                href="/home/settings"
                className="text-gray-600 hover:text-gray-900"
              >
                Settings
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

export default HomeLayout;
