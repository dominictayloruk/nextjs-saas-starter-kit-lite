// Temporarily use minimal page to fix build issues
export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Your SaaS at a glance</p>
      <div className="mt-4">
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold">Welcome</h2>
          <p>Your dashboard is ready!</p>
        </div>
      </div>
    </div>
  );
}
