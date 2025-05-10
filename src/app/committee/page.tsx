export default function CommitteePage() {
    return (
      <main className="flex min-h-screen flex-col items-center p-8">
        <div className="max-w-4xl w-full">
          <h1 className="text-3xl font-bold mb-6">Strata Committee</h1>
          
          <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-3">About the Committee</h2>
            <p className="mb-4">
              The Strata Committee is elected to represent all owners in the management of the building.
              In accordance with the Strata Schemes Management Act (2015), the committee includes a Chairperson,
              Secretary, and Treasurer, along with additional members up to a maximum of 9 people.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Current Committee Members</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">Chairperson</h3>
              <p className="text-lg">Sarah Johnson</p>
              <p className="text-gray-600">Unit 12</p>
              <p className="text-sm mt-2">
                Responsible for chairing meetings and ensuring the committee fulfills its responsibilities.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">Secretary</h3>
              <p className="text-lg">Michael Chen</p>
              <p className="text-gray-600">Unit 8</p>
              <p className="text-sm mt-2">
                Responsible for keeping records, preparing notices, and maintaining the strata roll.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">Treasurer</h3>
              <p className="text-lg">Emma Thompson</p>
              <p className="text-gray-600">Unit 23</p>
              <p className="text-sm mt-2">
                Responsible for financial management, levy notices, and budget planning.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }