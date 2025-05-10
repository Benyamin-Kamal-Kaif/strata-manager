import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Strata Manager - Building Management Portal',
  description: 'A portal for managing strata properties in New South Wales',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-8">
          <div style={{ backgroundColor: '#D9D9D9' }} className="px-6 py-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-black">Strata</h1>
              </div>
              <nav>
                <ul className="flex space-x-6">
                  <li><a href="/" className="text-black hover:text-gray-600 hover:underline transition-all">Home</a></li>
                  <li><a href="/committee" className="text-black hover:text-gray-600 hover:underline transition-all">Committee</a></li>
                  <li><a href="/documents" className="text-black hover:text-gray-600 hover:underline transition-all">Documents</a></li>
                  <li><a href="/contact" className="text-black hover:text-gray-600 hover:underline transition-all">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="pt-24">
          {children}
        </main>
        <footer className="bg-gray-100 py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Strata Manager Portal | Developed for NSW Strata Buildings
            </p>
            <p className="text-xs text-gray-500 mt-1">
              In accordance with the Strata Schemes Management Act (2015)
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}