
import { toast } from "@/hooks/use-toast";

// Zodiac sign data
export const zodiacSigns = [
  { id: "aries", name: "Aries", dates: "Mar 21 - Apr 19", element: "Fire" },
  { id: "taurus", name: "Taurus", dates: "Apr 20 - May 20", element: "Earth" },
  { id: "gemini", name: "Gemini", dates: "May 21 - Jun 20", element: "Air" },
  { id: "cancer", name: "Cancer", dates: "Jun 21 - Jul 22", element: "Water" },
  { id: "leo", name: "Leo", dates: "Jul 23 - Aug 22", element: "Fire" },
  { id: "virgo", name: "Virgo", dates: "Aug 23 - Sep 22", element: "Earth" },
  { id: "libra", name: "Libra", dates: "Sep 23 - Oct 22", element: "Air" },
  { id: "scorpio", name: "Scorpio", dates: "Oct 23 - Nov 21", element: "Water" },
  { id: "sagittarius", name: "Sagittarius", dates: "Nov 22 - Dec 21", element: "Fire" },
  { id: "capricorn", name: "Capricorn", dates: "Dec 22 - Jan 19", element: "Earth" },
  { id: "aquarius", name: "Aquarius", dates: "Jan 20 - Feb 18", element: "Air" },
  { id: "pisces", name: "Pisces", dates: "Feb 19 - Mar 20", element: "Water" }
];

// Trending phrases
const trendingPhrases = [
  "no cap",
  "based",
  "it's giving...",
  "main character energy",
  "that's so unserious",
  "ate and left no crumbs",
  "IYKYK",
  "living rent free",
  "throwing shade",
  "vibes immaculate",
  "chronically online",
  "touch grass",
  "delulu"
];

// Music mood descriptions
const musicMoods = [
  "party goblin",
  "crying in the club",
  "villain era",
  "main character energy",
  "yearning hours",
  "down bad",
  "slay mode",
  "unhinged",
  "cottagecore",
  "that girl"
];

// Generate a fortune based on inputs
export const generateFortune = (
  sign: string,
  birthdate: Date | null, 
  spotifyMood: string = "",
  karmaReset: boolean = false
) => {
  try {
    // Get moon sign (simplified for demo)
    const moonSign = getRandomMoonSign();
    
    // Get random trending phrase
    const trendingPhrase = trendingPhrases[Math.floor(Math.random() * trendingPhrases.length)];
    
    // Get mood from spotify (mock)
    const mood = spotifyMood || musicMoods[Math.floor(Math.random() * musicMoods.length)];
    
    // Calculate some "mystical" parameters
    const intensity = Math.floor(Math.random() * 10) + 1;
    const mercury = Math.random() > 0.8 ? "retrograde" : "direct";
    
    let fortune = "";
    
    if (karmaReset) {
      // Generate wholesome fortune
      fortune = generateWholesomeFortune(sign, moonSign, mood);
    } else {
      // Generate sarcastic fortune
      fortune = generateSarcasticFortune(sign, moonSign, mood, trendingPhrase, mercury);
    }
    
    return fortune;
  } catch (error) {
    console.error("Fortune generation error:", error);
    toast({
      title: "Fortune Error",
      description: "The stars are misaligned. Try again later.",
      variant: "destructive",
    });
    return "Error reading your fortune. The stars are temporarily unavailable. ✨";
  }
};

// Generate a sarcastic fortune
const generateSarcasticFortune = (
  sign: string,
  moonSign: string,
  mood: string,
  trendingPhrase: string,
  mercury: string
) => {
  const fortunes = [
    `As a ${sign} with ${moonSign} rising during ${mercury} Mercury, your ${mood} era is approaching fast. ${trendingPhrase}! Just remember that success is in your future... approximately 3-5 business years from now. ✨🔮`,
    
    `Your ${sign} energy is giving ${mood} vibes this week. With ${moonSign} in your communication house, you'll finally understand why everyone's been avoiding your texts. ${trendingPhrase}! 🌙💫`,
    
    `${sign} season has you feeling yourself, but ${moonSign} is serving reality checks. Your Spotify wrapped is literally just exposing your ${mood} tendencies to everyone. ${trendingPhrase}! 🎵✨`,
    
    `With Jupiter entering your ${sign} house while ${moonSign} is throwing shade, expect to make approximately zero good decisions this week. Your ${mood} playlist isn't helping. ${trendingPhrase}! 🪐⚠️`,
    
    `Being a ${sign} during ${mercury} Mercury is rough, but your ${moonSign} rising is keeping you delusionally optimistic. Your ${mood} era starts now, whether you're ready or not. ${trendingPhrase}! 💅💫`,
    
    `The stars reveal that as a ${sign}, you should avoid making important decisions, spending money, talking to people, or leaving your house this week. ${moonSign} energy has you in ${mood} mode. ${trendingPhrase}! 🚫🔮`
  ];
  
  return fortunes[Math.floor(Math.random() * fortunes.length)];
};

// Generate a wholesome fortune
const generateWholesomeFortune = (sign: string, moonSign: string, mood: string) => {
  const fortunes = [
    `Your ${sign} resilience combined with ${moonSign} sensitivity creates a beautiful balance. This week brings opportunities aligned with your ${mood} aspirations. Keep shining! ✨💖`,
    
    `The universe is aligning to support your ${sign} journey. Your ${moonSign} intuition will guide you through important decisions, especially while in your ${mood} element. Trust yourself! 🌟🌈`,
    
    `As a thoughtful ${sign} with ${moonSign} compassion, you're about to enter a period of growth and abundance. Your ${mood} energy attracts exactly what you need. 🌱✨`,
    
    `${sign} determination meets ${moonSign} creativity this week! Expect delightful surprises that complement your ${mood} talents. The universe is conspiring in your favor. 💫🎁`,
    
    `Your ${sign} spirit is especially powerful now. Combined with ${moonSign} wisdom, you'll find clarity in areas that were previously confusing. Your ${mood} approach is exactly what's needed. 🔮💕`
  ];
  
  return fortunes[Math.floor(Math.random() * fortunes.length)];
};

// Mock function to get a random moon sign
const getRandomMoonSign = () => {
  const moonSigns = zodiacSigns.map(sign => sign.name);
  return moonSigns[Math.floor(Math.random() * moonSigns.length)];
};

// Generate mystical image prompts based on fortune
export const generateImagePrompt = (sign: string, mood: string) => {
  const basedPrompts = [
    `mystic ${sign} zodiac symbol with ${mood} energy, vaporwave aesthetic`,
    `cosmic ${sign} constellation with ethereal ${mood} vibes, digital art`,
    `surreal meme featuring ${sign} symbolism and ${mood} mood, dream-like quality`,
    `${sign} tarot card with ${mood} theme, fantasy digital illustration`,
    `${sign} spirit animal in ${mood} dreamscape, psychedelic art style`
  ];
  
  return basedPrompts[Math.floor(Math.random() * basedPrompts.length)];
};
