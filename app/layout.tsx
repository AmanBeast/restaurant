import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { MenuProvider } from './context/MenuContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUXE BISTRO | Modern Gastronomy Reimagined',
  description: 'Experience fine dining, seasonal gastronomy, artisan cocktails, and curated wine pairings at Luxe Bistro.',
  keywords: ['Fine Dining', 'Gastronomy', 'Restaurant', 'Wagyu', 'Michelin', 'Table Reservation', 'Luxe Bistro'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#1C1B1A] font-sans">
        <AuthProvider>
          <MenuProvider>
            <CartProvider>
              <Navbar />
              <CartDrawer />
              <AuthModal />
              <main className="flex-grow">{children}</main>
              <Footer />
            </CartProvider>
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
