export default function AboutPage() {
    return (
      <>
        {/* HTML5 Semantic Elements Demonstration */}
        <main className="flex min-h-screen flex-col items-center p-8">
          <article className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-4">About Strata Manager</h1>
              <time dateTime="2025-05-10" className="text-sm text-gray-600">
                Last updated: May 10, 2025
              </time>
            </header>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Purpose</h2>
              <p className="mb-4">
                Strata Manager is a comprehensive portal designed to streamline the management 
                of strata-titled properties in New South Wales. Our platform adheres to the 
                Strata Schemes Management Act (2015) and provides essential tools for Owners 
                Corporations and Strata Committees.
              </p>
              
              <figure className="my-6">
                <img 
                  src="/building.jpg" 
                  alt="Strata building management" 
                  className="w-full rounded-lg"
                />
                <figcaption className="mt-2 text-sm text-gray-600 text-center">
                  Modern strata management for NSW buildings
                </figcaption>
              </figure>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Digital document management</li>
                <li>Automated levy calculations</li>
                <li>Online maintenance request system</li>
                <li>Committee meeting scheduling</li>
                <li>Financial reporting dashboard</li>
              </ul>
            </section>
            
            <aside className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold mb-2">Legal Compliance</h3>
              <p className="text-sm">
                All features comply with the NSW Strata Schemes Management Act (2015) 
                and Department of Customer Service guidelines for strata management.
              </p>
            </aside>
            
            <footer className="mt-8 pt-4 border-t">
              <address className="text-sm text-gray-600">
                Developed by Strata Technology Solutions<br />
                Contact: <a href="mailto:info@stratamanager.com" className="text-blue-600">
                  info@stratamanager.com
                </a>
              </address>
            </footer>
          </article>
          
          <nav className="w-full max-w-4xl mt-8">
            <h2 className="sr-only">Related pages</h2>
            <ul className="flex space-x-4 justify-center">
              <li>
                <a href="/committee" className="text-blue-600 hover:underline">
                  Committee Info
                </a>
              </li>
              <li>
                <a href="/documents" className="text-blue-600 hover:underline">
                  Legal Documents
                </a>
              </li>
              <li>
                <a href="/contact" className="text-blue-600 hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </main>
      </>
    );
  }