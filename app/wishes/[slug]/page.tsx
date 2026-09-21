import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WISH_PAGES } from '@/lib/wishes-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return WISH_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = WISH_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/wishes/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://wishmaker.sbs/wishes/${page.slug}`,
      type: 'article',
    },
  };
}

export default async function WishPage({ params }: PageProps) {
  const { slug } = await params;
  const page = WISH_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const total = page.sections.reduce((n, s) => n + s.wishes.length, 0);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <nav className="text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-pink-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/wishes" className="hover:text-pink-500">Wishes</Link>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-black mb-3">{page.heading}</h1>
        <p className="text-zinc-400 mb-8">{page.intro}</p>

        {page.sections.map((section) => (
          <section key={section.name} className="mb-10">
            <h2 className="text-xl font-bold text-pink-500 mb-4">{section.name}</h2>
            <ul className="space-y-3">
              {section.wishes.map((w, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-zinc-100 leading-relaxed"
                >
                  {w}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="rounded-2xl border border-pink-500/40 bg-gradient-to-br from-pink-500/15 to-transparent p-6 text-center">
          <h2 className="text-2xl font-black mb-2">Make it a surprise they will keep</h2>
          <p className="text-zinc-300 mb-4">
            All {total} of these wishes are better delivered as a personalized digital
            gift - a page only they can open, with your message inside.
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-pink-500 px-6 py-3 font-bold text-white hover:bg-pink-600 transition-colors"
          >
            Create Your Surprise Gift →
          </Link>
        </div>

        <div className="mt-10">
          <h2 className="font-bold text-zinc-400 mb-3 text-sm uppercase tracking-wide">
            More wish collections
          </h2>
          <div className="flex flex-wrap gap-2">
            {WISH_PAGES.filter((p) => p.slug !== slug).map((p) => (
              <Link
                key={p.slug}
                href={`/wishes/${p.slug}`}
                className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-pink-500/60 hover:text-white transition-colors"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
