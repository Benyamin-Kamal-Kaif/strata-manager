import Image from 'next/image';
import Link from 'next/link';

export default function DocumentsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6">Important Documents</h1>
        
        <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-3">Strata Documents Repository</h2>
          <p>
            Access important strata documents, including by-laws, meeting minutes, and financial reports.
            All documents are available for download by current building residents and owners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Building Information</h2>
            <div className="relative h-60 w-full mb-4">
              <Image
                src="/building.jpg"
                alt="Building Exterior"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-md"
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Our building was constructed in 2010 and consists of 36 residential units across 12 floors.
            </p>
            <Link 
              href="/bylaws.pdf" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Building By-Laws
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Legal Documents</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <Link href="/bylaws.pdf" className="text-blue-600 hover:underline">Strata By-Laws (PDF)</Link>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <Link href="/bylaws.pdf" className="text-blue-600 hover:underline">Insurance Certificate (PDF)</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}