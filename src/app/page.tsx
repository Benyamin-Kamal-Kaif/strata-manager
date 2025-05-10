export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="max-w-5xl w-full">
      <h1 className="text-4xl font-bold mb-6 text-center" style={{ color: '#D9D9D9' }}>
          {process.env.NEXT_PUBLIC_BUILDING_NAME || 'Strata Manager'} Portal
        </h1>
        
        <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome to {process.env.NEXT_PUBLIC_BUILDING_NAME}</h2>
          <p className="mb-4">
            This portal is designed to help the Strata Committee manage {process.env.NEXT_PUBLIC_BUILDING_NAME} in accordance
            with the Strata Schemes Management Act (2015) of New South Wales.
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Strata Plan Number: {process.env.NEXT_PUBLIC_STRATA_NUMBER}
          </p>
          <p>
            As a member of the Strata Committee, you can use this website to:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Access important strata documents</li>
            <li>Manage maintenance requests</li>
            <li>Coordinate committee meetings</li>
            <li>Communicate with building residents</li>
            <li>Track levy payments and building finances</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Upcoming Events</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Annual General Meeting</p>
                <p className="text-sm text-gray-600">May 15, 2025 - 7:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Building Inspection</p>
                <p className="text-sm text-gray-600">April 20, 2025 - 10:00 AM</p>
              </div>
              <div>
                <p className="font-medium">Quarterly Levy Due</p>
                <p className="text-sm text-gray-600">June 1, 2025</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Important Notices</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-red-600">Scheduled Water Shutdown</p>
                <p className="text-sm">April 12, 2025, 9:00 AM - 2:00 PM</p>
                <p className="text-xs text-gray-500">For maintenance of main water pipes</p>
              </div>
              <div>
                <p className="font-medium">Parking Area Cleaning</p>
                <p className="text-sm">April 18, 2025, 8:00 AM - 12:00 PM</p>
                <p className="text-xs text-gray-500">Please remove vehicles from visitor spaces</p>
              </div>
              <div>
                <p className="font-medium">New Access System</p>
                <p className="text-sm">Coming May 1, 2025</p>
                <p className="text-xs text-gray-500">Details in your mailbox</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}