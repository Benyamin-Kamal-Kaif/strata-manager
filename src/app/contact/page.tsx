export default function ContactPage() {
    return (
      <main className="flex min-h-screen flex-col items-center p-8">
        <div className="max-w-4xl w-full">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Committee Contact Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">General Inquiries</h3>
                <p>Email: committee@stratamanager.example.com</p>
                <p>Phone: (02) 9123 4567</p>
              </div>
              
              <div>
                <h3 className="font-medium">Urgent Maintenance Issues</h3>
                <p>Phone: (02) 9123 4567 (24/7)</p>
              </div>
              
              <div>
                <h3 className="font-medium">Building Manager</h3>
                <p>Name: Robert Jenkins</p>
                <p>Hours: Monday-Friday, 8:00 AM - 4:00 PM</p>
                <p>Phone: (02) 9123 4568</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">Unit Number</label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }