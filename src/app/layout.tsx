import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_BUILDING_NAME || 'Strata Manager'} - Management Portal`,
  description: `Management portal for ${process.env.NEXT_PUBLIC_BUILDING_NAME || 'NSW Strata Building'} (SP: ${process.env.NEXT_PUBLIC_STRATA_NUMBER || 'N/A'})`,
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
                <h1 className="text-2xl font-bold text-black">
                  {process.env.NEXT_PUBLIC_BUILDING_NAME || 'Strata'}
                </h1>
              </div>
              <nav>
                <ul className="flex space-x-6">
                  <li><Link href="/" className="text-black hover:text-gray-600 hover:underline transition-all">Home</Link></li>
                  <li><Link href="/committee" className="text-black hover:text-gray-600 hover:underline transition-all">Committee</Link></li>
                  <li><Link href="/documents" className="text-black hover:text-gray-600 hover:underline transition-all">Documents</Link></li>
                  <li><Link href="/maintenance" className="text-black hover:text-gray-600 hover:underline transition-all">Maintenance</Link></li>
                  <li><Link href="/meetings" className="text-black hover:text-gray-600 hover:underline transition-all">Meetings</Link></li>
                  <li><Link href="/financial" className="text-black hover:text-gray-600 hover:underline transition-all">Financial</Link></li>
                  <li><Link href="/contact" className="text-black hover:text-gray-600 hover:underline transition-all">Contact</Link></li>
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
              © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_BUILDING_NAME || 'Strata Manager Portal'} | Developed for NSW Strata Buildings
            </p>
            <p className="text-xs text-gray-500 mt-1">
              In accordance with the Strata Schemes Management Act (2015)
            </p>
            <p className="text-xs text-gray-500">
              {process.env.NEXT_PUBLIC_STRATA_NUMBER && `Strata Plan: ${process.env.NEXT_PUBLIC_STRATA_NUMBER}`}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}