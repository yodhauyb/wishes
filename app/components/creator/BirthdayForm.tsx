// @ts-nocheck
'use client';
import Script from 'next/script'; // Razorpay script loader

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, ImageIcon, Calendar, BookOpen, 
  Palette, Music, Eye, CheckCircle, ArrowLeft, ArrowRight, Smartphone, Sparkles
} from 'lucide-react';

import { createClient } from '@/app/utils/supabase/client';
import { GoogleLogin } from '../ui/GoogleLogin';

import { BirthdayData, Photo, Memory, ThemeType, EventType } from '../../types/birthday';
import { THEME_CONFIGS } from '@/app/lib/themes';
import { saveBirthday, DEMO_BIRTHDAY } from '@/app/lib/birthdayStorage';

// Import builder parts
import { ThemeSelector } from './ThemeSelector';
import { PhotoUploader } from './PhotoUploader';
import { MemoryEditor } from './MemoryEditor';
import { QRGenerator } from './QRGenerator';

// Import preview scenes & Player
import { MusicPlayer } from '../birthday/MusicPlayer'; 
import { PreIntro } from '../birthday/PreIntro'; 
import { BirthdayIntro } from '../birthday/BirthdayIntro';
import { NameReveal } from '../birthday/NameReveal';
import { BirthdayMessage } from '../birthday/BirthdayMessage';
import { PhotoGallery } from '../birthday/PhotoGallery';
import { MemoryTimeline } from '../birthday/MemoryTimeline';
import { LetterSection } from '../birthday/LetterSection';
import { GiftBox } from '../birthday/GiftBox';
import { FinalSurprise } from '../birthday/FinalSurprise';

const MUSIC_OPTIONS = [
  { id: 'pal-special', label: '🌟 Our Special Song (Pal)', url: 'https://rixmnakgfxrfrdumdjwe.supabase.co/storage/v1/object/public/music/vidssave.com%20Pal%20(Female%20Version)%20-%20Lyrical%20Video%20_%20Shreya%20Ghoshal%20_%20Varun%20_%20Rhea%20_%20Javed-Mohsin%20256kbps.mp3' },
  { id: 'none', label: '🔇 No Music (Silent)', url: '' },
  { id: 'tune-1', label: '✨ Magical & Soft', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'tune-2', label: '❤️ Sweet Acoustic Vibe', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'tune-3', label: '🎧 Happy & Upbeat', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'tune-4', label: '☕ Chill Lofi Instrumental', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
];

export const BirthdayForm: React.FC = () => {
  // 🔐 1. Auth States & User Profile
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const supabase = createClient();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    const fetchProfileAndSetUser = async (currentUser: any) => {
      if (!currentUser) {
        setUser(null);
        setUserProfile(null);
        setIsAuthLoading(false);
        return;
      }

      setUser(currentUser);
      
      let { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (!profile) {
        const { data: newProfile } = await supabase
          .from('user_profiles')
          .insert([{ id: currentUser.id, email: currentUser.email }])
          .select()
          .single();
        profile = newProfile;
      }
      
      setUserProfile(profile);
      setIsAuthLoading(false);
    };

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await fetchProfileAndSetUser(session?.user);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthLoading(true);
      fetchProfileAndSetUser(session?.user);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 📝 2. Form States
  const [eventType, setEventType] = useState<EventType>('birthday');
  const [name, setName] = useState('Priya');
  const [senderName, setSenderName] = useState('Krishna');
  const [birthdayDate, setBirthdayDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]
  );
  const [intro, setIntro] = useState("");
  const [message, setMessage] = useState("");
  const [letter, setLetter] = useState("");
  
  const [theme, setTheme] = useState<ThemeType>('water' as ThemeType);
  const [musicUrl, setMusicUrl] = useState(MUSIC_OPTIONS[0].url);
  const [photos, setPhotos] = useState<Photo[]>(DEMO_BIRTHDAY.photos);
  const [memories, setMemories] = useState<Memory[]>(DEMO_BIRTHDAY.memories);

  const [activeStep, setActiveStep] = useState(1);
  const [generatedSlug, setGeneratedSlug] = useState<string | null>(null);
  const [tabView, setTabView] = useState<'edit' | 'preview'>('edit');
  const [previewScene, setPreviewScene] = useState<number>(0);

  useEffect(() => {
    switch (eventType) {
      case 'anniversary':
        setIntro("Today marks another beautiful year together...");
        setMessage("Happy Anniversary! Thank you for the endless love, patience, and magic you bring into my life. ❤️");
        setLetter(`My Dearest ${name},\n\nHappy Anniversary! 🥂\n\nEvery moment spent with you feels like a dream. Here's to a lifetime of memories...`);
        break;
      case 'rakshabandhan':
        setIntro("Celebrating the most annoying yet most loving person!");
        setMessage("Happy Raksha Bandhan! Promise to always protect you (and steal your chocolates). 🏵️✨");
        setLetter(`Dear ${name},\n\nHappy Rakhi! \n\nNo matter how much we fight, you will always be my first best friend...`);
        break;
      case 'valentines':
        setIntro("To the one who holds my heart...");
        setMessage("Happy Valentine's Day! You are my today and all of my tomorrows. 🌹");
        setLetter(`My Love ${name},\n\nHappy Valentine's Day! ❤️\n\nWords fall short when I try to explain how much you mean to me...`);
        break;
      default:
        setIntro("Today is a very special day... Let's look back at our wonderful moments!");
        setMessage("Wishing you another year of infinite laughter, magic moments, and dreams coming true. 🎂");
        setLetter(`Dear ${name},\n\nHappy Birthday! 🎂✨\n\nYou bring so much joy into my life...`);
        break;
    }
  }, [eventType, name]);

  const getCurrentData = (): BirthdayData => ({
    id: `birthday-${Date.now()}`,
    slug: generatedSlug || 'preview-slug',
    eventType, name, senderName, birthdayDate, intro, message, letter, theme, music: musicUrl, photos, memories
  });

  const activeThemeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS['water'];

  const handleGenerate = async () => {
    const formattedName = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = `${formattedName}-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalData: BirthdayData = { ...getCurrentData(), id: `birthday-${Date.now()}`, slug };
    
    await saveBirthday(finalData);

    await supabase
      .from('user_profiles')
      .update({ surprises_created: (userProfile?.surprises_created || 0) + 1 })
      .eq('id', user.id);
      
    setUserProfile((prev: any) => ({ ...prev, surprises_created: (prev?.surprises_created || 0) + 1 }));
    setGeneratedSlug(slug);
    setActiveStep(7); 
  };

  // RAZORPAY PAYMENT LOGIC
  const handlePayment = async () => {
    try {
      const loadScript = () => {
        return new Promise((resolve) => {
          if ((window as any).Razorpay) {
            resolve(true);
            return;
          }
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };
      
      const isLoaded = await loadScript();
      if (!isLoaded) {
        alert("Razorpay SDK fail to load. Please check your network.");
        return;
      }

      const res = await fetch('/api/create-order', { method: 'POST' });
      const data = await res.json();
      
      if (!res.ok || !data.orderId) {
         console.error("Order creation failed", data);
         alert("Backend error: Order ID create nahi ho pa rahi hai.");
         return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: 4900, 
        currency: "INR",
        name: "YODHAAI Pro",
        description: "1 Year Unlimited Surprises",
        order_id: data.orderId,
        handler: async function (response: any) {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });
          const verifyData = await verifyRes.json();
          
          if (verifyData.success) {
            await supabase
              .from('user_profiles')
              .update({ is_premium: true })
              .eq('id', user.id);
              
            setUserProfile((prev: any) => ({ ...prev, is_premium: true }));
            alert("Payment Successful! You are now a PRO user. ✨");
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: { email: user?.email },
        theme: { color: "#ec4899" } 
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment setup error:", error);
      alert("Something went wrong loading payment gateway.");
    }
  };

  // 🚪 3. THE GATEKEEPER LOGIC
  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="animate-pulse text-xl font-bold text-pink-500">Loading YODHAAI Magic... ✨</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] w-full">
        <GoogleLogin />
      </div>
    );
  }

  // 👑 BOSS & TRIAL LOGIC
  const isBoss = user.email === adminEmail;
  const isPremium = userProfile?.is_premium;
  
  // 👇 3-DAY TRIAL LOGIC 👇
  const signupDate = new Date(userProfile?.created_at || Date.now());
  const currentDate = new Date();
  const diffInDays = (currentDate.getTime() - signupDate.getTime()) / (1000 * 3600 * 24);
  const isTrialActive = diffInDays <= 3;
  const trialDaysLeft = Math.max(0, Math.ceil(3 - diffInDays));
  // 👆 3-DAY TRIAL LOGIC 👆

  // Agar Boss nahi hai, Premium nahi hai, AUR Trial bhi khatam ho gaya -> Paywall dikhao
  if (!isBoss && !isPremium && !isTrialActive) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 w-full">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-1 rounded-3xl shadow-2xl max-w-md w-full">
          <div className="bg-white dark:bg-zinc-900 rounded-[1.3rem] p-8 text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-pink-100 dark:bg-pink-900/30 rounded-full text-pink-500">
                <Sparkles size={40} />
              </div>
            </div>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Trial Expired 🥺</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Your 3-day free VIP trial has ended! Upgrade to YODHAAI Pro to continue crafting unlimited magical surprises.
            </p>
            
            {/* 👇 FOMO BANNER START 👇 */}
            <div className="mb-6 mt-4 text-center p-5 border border-pink-500/30 rounded-2xl bg-gradient-to-b from-pink-500/10 to-transparent backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-semibold text-pink-600 dark:text-pink-400 bg-pink-500/10 rounded-full border border-pink-500/20">
                <span className="animate-pulse">🔥</span> Limited Time Offer
              </div>
              
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-zinc-400 dark:text-zinc-500 line-through text-lg font-medium">₹199</span>
                <span className="text-pink-500 font-black text-5xl drop-shadow-sm">
                  ₹49<span className="text-lg font-medium text-pink-400">/yr</span>
                </span>
              </div>
              
              <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1 font-medium mt-3">
                <span>✨</span> Trusted by 500+ happy users <span>✨</span>
              </p>
            </div>
            {/* 👆 FOMO BANNER END 👆 */}
            
            <button 
              onClick={handlePayment} 
              className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-black rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              Unlock Pro Now (₹49)
            </button>
            
            <p className="text-xs text-zinc-400 mt-4">Secure payment powered by Razorpay</p>
          </div>
        </div>
      </div>
    );
  }

  // 🎨 4. Main Form UI 
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative pb-20 lg:pb-0">
      
      {/* 📱 MOBILE STICKY TAB SWAPPER */}
      <div className="col-span-12 lg:hidden sticky top-4 z-50 mx-4">
        <div className="flex bg-zinc-900/90 backdrop-blur-xl p-1.5 rounded-2xl border border-zinc-700 shadow-2xl">
          <button onClick={() => setTabView('edit')} className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 ${tabView === 'edit' ? 'bg-pink-500 text-white shadow-lg scale-[1.02]' : 'text-zinc-400 hover:text-zinc-200'}`}>
            ✏️ Edit Surprise
          </button>
          <button onClick={() => setTabView('preview')} className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 ${tabView === 'preview' ? 'bg-pink-500 text-white shadow-lg scale-[1.02]' : 'text-zinc-400 hover:text-zinc-200'}`}>
            <Eye size={16} /> Live Preview
          </button>
        </div>
      </div>

      {/* LEFT PANE - BUILDER FORM */}
      <div className={`col-span-12 lg:col-span-7 space-y-6 ${tabView === 'preview' ? 'hidden lg:block' : 'block px-4 lg:px-0'}`}>
        
        {/* 👑 ADMIN BADGE HIGHLIGHT */}
        {isBoss && (
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 p-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold font-mono shadow-sm">
            👑 BOSS MODE ACTIVE - YOU HAVE UNLIMITED FREE ACCESS
          </div>
        )}

        {/* 🔥 TRIAL BADGE HIGHLIGHT */}
        {!isBoss && !isPremium && isTrialActive && (
          <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 text-pink-600 dark:text-pink-400 p-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold shadow-sm">
            ⏳ PRO TRIAL ACTIVE: {trialDaysLeft} Days Left! Create unlimited surprises.
          </div>
        )}
        
        {activeStep < 7 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider">Build Progress</span>
              <span className="text-[10px] md:text-xs font-black text-pink-500 bg-pink-500/10 px-3 py-1 rounded-full">Step {activeStep} of 6</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <button key={s} onClick={() => s < activeStep ? setActiveStep(s) : null} className={`h-2.5 flex-grow rounded-full transition-all duration-500 ${s <= activeStep ? 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-md shadow-pink-500/20' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
              ))}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-5 md:p-8 rounded-[2rem] shadow-xl min-h-[500px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CHOOSE OCCASION */}
            {activeStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6 flex-grow">
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-950 dark:text-white">What are we celebrating? 🎉</h3>
                  <p className="text-sm text-zinc-500 mt-2">Choose an occasion to load the perfect theme.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { id: 'birthday', icon: '🎂', label: 'Birthday', color: 'bg-pink-500' },
                    { id: 'anniversary', icon: '💍', label: 'Anniversary', color: 'bg-rose-500' },
                    { id: 'rakshabandhan', icon: '🏵️', label: 'Raksha Bandhan', color: 'bg-orange-500' },
                    { id: 'valentines', icon: '❤️', label: 'Valentine\'s', color: 'bg-red-500' },
                  ].map((event) => (
                    <button key={event.id} onClick={() => setEventType(event.id as EventType)} className={`relative flex flex-col items-center justify-center p-5 md:p-6 rounded-3xl border-2 transition-all duration-300 ${eventType === event.id ? `border-${event.color.split('-')[1]}-500 bg-${event.color.split('-')[1]}-50/10 dark:bg-zinc-800 scale-[1.02] shadow-xl` : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}>
                      <span className="text-4xl md:text-5xl mb-3 drop-shadow-md">{event.icon}</span>
                      <span className="font-bold text-xs md:text-sm text-zinc-800 dark:text-zinc-200 text-center">{event.label}</span>
                      {eventType === event.id && (<motion.div layoutId="activeEvent" className={`absolute -top-2 -right-2 w-7 h-7 ${event.color} rounded-full flex items-center justify-center text-white shadow-lg`}><CheckCircle size={14} /></motion.div>)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: GENERAL INFO */}
            {activeStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-5 flex-grow">
                <h3 className="text-xl font-black flex items-center gap-2"><User className="text-pink-500" /><span>Basic Info</span></h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-2">Recipient's Name *</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pink-500 font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-2">Your Name (Sender) *</label>
                    <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pink-500 font-bold" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2">Intro Sparkle Text</label>
                  <textarea value={intro} onChange={(e) => setIntro(e.target.value)} rows={2} className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pink-500 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2">Main Greeting Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pink-500 resize-none" />
                </div>
              </motion.div>
            )}

            {/* STEP 3: LETTER */}
            {activeStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4 flex-grow">
                <h3 className="text-xl font-black flex items-center gap-2"><BookOpen className="text-pink-500" /><span>Personal Letter</span></h3>
                <textarea value={letter} onChange={(e) => setLetter(e.target.value)} rows={12} className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-3xl text-sm focus:ring-2 focus:ring-pink-500 leading-relaxed font-mono resize-none" />
              </motion.div>
            )}

            {/* STEP 4: PHOTOS */}
            {activeStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4 flex-grow">
                <h3 className="text-xl font-black flex items-center gap-2"><ImageIcon className="text-pink-500" /><span>Photo Gallery</span></h3>
                <PhotoUploader photos={photos} onChange={setPhotos} />
              </motion.div>
            )}

            {/* STEP 5: TIMELINE */}
            {activeStep === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4 flex-grow">
                <h3 className="text-xl font-black flex items-center gap-2"><Calendar className="text-pink-500" /><span>Memory Timeline</span></h3>
                <MemoryEditor memories={memories} onChange={setMemories} />
              </motion.div>
            )}

            {/* STEP 6: THEME & MUSIC */}
            {activeStep === 6 && (
              <motion.div key="step6" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6 flex-grow">
                <h3 className="text-xl font-black flex items-center gap-2"><Palette className="text-pink-500" /><span>Theme & Music</span></h3>
                
                <ThemeSelector selected={theme} onChange={setTheme} />
                
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-3xl space-y-4 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    <Music size={18} className="text-pink-500" /> Select Background Music
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MUSIC_OPTIONS.map((track) => (
                      <button
                        key={track.id}
                        onClick={() => setMusicUrl(track.url)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-3 ${
                          musicUrl === track.url 
                            ? 'border-pink-500 bg-pink-500/10 shadow-md' 
                            : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${musicUrl === track.url ? 'border-pink-500' : 'border-zinc-400'}`}>
                          {musicUrl === track.url && <div className="w-2 h-2 bg-pink-500 rounded-full" />}
                        </div>
                        <span className={`text-sm font-semibold ${musicUrl === track.url ? 'text-pink-600 dark:text-pink-400' : 'text-zinc-700 dark:text-zinc-300'}`}>
                          {track.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 7: QR DASHBOARD */}
            {activeStep === 7 && generatedSlug && (
              <motion.div key="step7" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 flex-grow">
                <QRGenerator slug={generatedSlug} />
                <div className="text-center pt-6">
                  <button onClick={() => { setGeneratedSlug(null); setActiveStep(1); }} className="text-sm font-bold text-pink-500 hover:text-pink-600 underline">✏️ Create another surprise</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {activeStep < 7 && (
            <div className="flex justify-between items-center pt-6 mt-8 border-t border-zinc-100 dark:border-zinc-800">
              <button onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))} disabled={activeStep === 1} className="flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 disabled:opacity-30 transition-all">
                <ArrowLeft size={16} /><span>Back</span>
              </button>
              {activeStep < 6 ? (
                <button onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))} className="flex items-center gap-2 text-sm font-black px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 active:scale-95 transition-all">
                  <span>Continue</span><ArrowRight size={16} />
                </button>
              ) : (
                <button onClick={handleGenerate} className="flex items-center gap-2 text-sm font-black px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 active:scale-95 transition-all animate-pulse">
                  <CheckCircle size={16} /><span>Generate!</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANE - SMARTPHONE SIMULATOR */}
      <div className={`col-span-12 lg:col-span-5 ${tabView === 'edit' ? 'hidden lg:block' : 'block px-4 lg:px-0'}`}>
        <div className="sticky top-24 lg:top-6 flex flex-col items-center w-full">
          
          <div className="w-full max-w-[400px] flex items-center justify-between mb-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-1.5 text-xs font-black text-zinc-800 dark:text-white uppercase tracking-wider">
              <Smartphone size={16} className="text-pink-500" /><span>Preview</span>
            </div>
            <select value={previewScene} onChange={(e) => setPreviewScene(parseInt(e.target.value))} className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-bold border-none focus:ring-2 focus:ring-pink-500 outline-none cursor-pointer">
              <option value={0}>0: Gatekeeper</option>
              <option value={1}>1: Intro Gift</option><option value={2}>2: Name Reveal</option>
              <option value={3}>3: Greeting</option><option value={4}>4: Gallery</option>
              <option value={5}>5: Timeline</option><option value={6}>6: Letter</option>
              <option value={7}>7: Gift</option><option value={8}>8: Final</option>
            </select>
          </div>

          <div className="relative w-full max-w-[400px] lg:max-w-[340px] h-[70vh] lg:h-auto lg:aspect-[9/18] bg-zinc-950 rounded-[2rem] lg:rounded-[3rem] p-1.5 lg:p-3 shadow-2xl border-4 lg:border-[8px] border-zinc-800 overflow-hidden flex flex-col">
            
            <div className="hidden lg:flex absolute top-4 left-1/2 -translate-x-1/2 h-5 w-32 bg-zinc-900 rounded-full z-30 items-center justify-center gap-2">
              <span className="w-2 h-2 bg-zinc-800 rounded-full" /><span className="w-10 h-1.5 bg-zinc-800 rounded-full" />
            </div>

            <div className={`flex-grow rounded-[1.5rem] lg:rounded-[2.2rem] overflow-hidden relative overflow-y-auto scrollbar-none flex flex-col justify-between ${activeThemeConfig?.bgClass || 'bg-zinc-900'}`}>
              
              <div className="absolute inset-0 pointer-events-none opacity-20">
                {theme === 'hearts' && <div className="absolute inset-0 flex items-center justify-center text-rose-300 text-6xl">❤️</div>}
              </div>
              
              <div className="flex-grow h-full flex flex-col justify-center transform lg:scale-[0.95] origin-top relative z-10">
                
                <MusicPlayer url={musicUrl} isPlaying={previewScene > 0} />
                
                {previewScene === 0 && <PreIntro themeConfig={activeThemeConfig} onNext={() => setPreviewScene(1)} />}
                {previewScene === 1 && <BirthdayIntro name={name} eventType={eventType} onOpen={() => setPreviewScene(2)} />}
                {previewScene === 2 && <NameReveal name={name} eventType={eventType} onNext={() => setPreviewScene(3)} />}
                {previewScene === 3 && <BirthdayMessage message={message} name={name} senderName={senderName} themeConfig={activeThemeConfig} eventType={eventType} onNext={() => setPreviewScene(4)} />}
                {previewScene === 4 && <PhotoGallery photos={photos} themeConfig={activeThemeConfig} onNext={() => setPreviewScene(5)} />}
                {previewScene === 5 && <MemoryTimeline memories={memories} themeConfig={activeThemeConfig} onNext={() => setPreviewScene(6)} />}
                {previewScene === 6 && <LetterSection letter={letter} senderName={senderName} themeConfig={activeThemeConfig} eventType={eventType} onNext={() => setPreviewScene(7)} />}
                {previewScene === 7 && <GiftBox themeConfig={activeThemeConfig} name={name} onNext={() => setPreviewScene(8)} />}
                {previewScene === 8 && <FinalSurprise name={name} senderName={senderName} themeConfig={activeThemeConfig} eventType={eventType} onReplay={() => setPreviewScene(1)} slug="demo-preview" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};