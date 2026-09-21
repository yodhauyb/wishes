import type { Metadata } from 'next';
import Link from 'next/link';
import { WISH_PAGES } from '@/lib/wishes-data';

export const metadata: Metadata = {
  title: 'Birthday & Anniversary Wishes - Free Collections | WishMaker',
  description: 'Free birthday wishes, anniversary messages, good morning and good night messages. Copy your favourite wish and turn it into a digital surprise gift.',
};

export default function WishesIndexPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-black mb-3">
          Birthday &amp; Anniversary Wishes
        </h1>
        <p className="text-zinc-400 mb-10">
          Free, ready-to-copy wish collections for every person and every occasion.
          Found the perfect one? Turn it into a{' '}
          <Link href="/" className="text-pink-500 font-bold hover:underline">
            digital surprise gift
          </Link>{' '}
          they will never forget.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {WISH_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/wishes/${p.slug}`}
              className="block rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-pink-500/60 hover:bg-zinc-900 transition-colors"
            >
              <h2 className="font-bold text-lg mb-1">{p.title}</h2>
              <p className="text-sm text-zinc-400 line-clamp-2">{p.metaDescription}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
