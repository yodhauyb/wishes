import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // ✨ Google Font Import kiya
import './globals.css';
import Script from 'next/script'; 

// ✨ Local font ki jagah direct Inter font setup
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // Site is served on www; use the same everywhere to avoid canonical mismatches
  metadataBase: new URL('https://www.wishmaker.sbs'),
  title: {
    default: 'WishMaker - Create Digital Birthday & Anniversary Surprise Gifts',
    template: '%s | WishMaker',
  },
  description:
    'Create beautiful personalized digital birthday and anniversary surprise gifts in minutes. Add your photos, message and wishes - they open a page made just for them.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: 'https://www.wishmaker.sbs',
    siteName: 'WishMaker',
    type: 'website',
    // 1200x630 is the 1.91:1 ratio WhatsApp/Twitter need for a large preview.
    // A square image silently downgrades to a small thumbnail.
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'WishMaker - a gift they open on their phone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
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