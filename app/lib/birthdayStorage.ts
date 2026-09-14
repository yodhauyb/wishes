// @ts-nocheck
import { BirthdayData } from '../types/birthday';
import { supabase } from './supabase';

export const DEMO_BIRTHDAY: BirthdayData = {
  id: 'demo-id',
  slug: 'demo',
  eventType: 'birthday',
  name: 'Priya',
  senderName: 'Krishna',
  birthdayDate: new Date().toISOString().split('T')[0],
  intro: 'Today is a very special day...',
  message: 'Wishing you another year of infinite laughter...',
  letter: 'Dear Priya,\n\nHappy Birthday! 🎂✨',
  theme: 'water',
  music: '',
  // 📸 Ek demo photo takii gallery khaali na lage
  photos: [
    { 
      id: 'photo-1', 
      url: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?w=800&q=80', 
      caption: 'Unforgettable moments ✨' 
    }
  ],
  // 🗓️ Ek demo memory takii timeline mast lage
  memories: [
    { 
      id: 'mem-1', 
      date: '2025-10-23', 
      title: 'Our Best Day', 
      description: 'The day we laughed so hard that our stomachs hurt. A memory I will cherish forever!', 
      icon: '🌅' 
    }
  ]
};

// Yahan se neeche tera wo saveBirthday wala function waisa hi rahega jisme Supabase ka code hai...


// ✅ LOCAL STORAGE KI JAGAH AB SUPABASE MEIN DATA SAVE HOGA!
export const saveBirthday = async (data: BirthdayData) => {
  const { error } = await supabase
    .from('surprises')
    .insert([
      {
        slug: data.slug,
        event_type: data.eventType,
        name: data.name,
        sender_name: data.senderName,
        birthday_date: data.birthdayDate,
        intro: data.intro,
        message: data.message,
        letter: data.letter,
        theme: data.theme,
        music: data.music,
        photos: data.photos,
        memories: data.memories
      }
    ]);

  if (error) {
    console.error("Supabase Error 🚨:", error);
    return false;
  }
  return true;
};