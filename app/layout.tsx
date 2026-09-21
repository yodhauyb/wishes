import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // ✨ Google Font Import kiya
import './globals.css';
import Script from 'next/script'; 

// ✨ Local font ki jagah direct Inter font setup
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YODHAAI Surprises - Magical Digital Gifts',
  description: 'Create aesthetic and personalized digital gifts in minutes.',
  openGraph: {
    url: 'https://wishmaker.sbs',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ✨ Yahan inter.className laga diya
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        
        {/* 👇 GOOGLE ANALYTICS PROPER NEXT.JS INTEGRATION 👇 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-9NQKY0SM0Z`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9NQKY0SM0Z');
            `,
          }}
        />
        {/* 👆 GOOGLE ANALYTICS END 👆 */}

        {children}
      </body>
    </html>
  );
}