'use client';

import * as React from 'react';
import { supabase } from '../../lib/supabase';
import { BirthdayExperience } from '../../components/birthday/Birthdayexperience';
import { NotFoundSurprise } from '../../components/birthday/NotFoundSurprise';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BirthdaySlugPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchSurprise() {
      if (!slug) return;
      
      // 🚀 Supabase Cloud se data fetch kar rahe hain
      const { data: surpriseData, error } = await supabase
        .from('surprises')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !surpriseData) {
        console.error("Data fetch error 🚨:", error);
        setLoading(false);
        return;
      }

      // Supabase ke snake_case data ko wapas Frontend wale camelCase mein badalna
      const formattedData = {
        ...surpriseData,
        eventType: surpriseData.event_type,
        senderName: surpriseData.sender_name,
        birthdayDate: surpriseData.birthday_date,
      };

      setData(formattedData);
      setLoading(false);
    }

    fetchSurprise();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6">
        <div className="animate-spin text-5xl mb-4 select-none">🎂</div>
        <p className="text-zinc-400 text-xs tracking-wider uppercase font-bold">Unlocking Surprise...</p>
      </div>
    );
  }

  if (!data) {
    return <NotFoundSurprise />;
  }

  return <BirthdayExperience data={data} />;
}