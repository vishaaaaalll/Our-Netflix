// =====================================================================
// OUR NETFLIX — Memory Configuration
// =====================================================================
// This is the ONLY file you need to edit to customize your website.
// Everything below uses simple, plain-English values.
//
// HOW TO ADD A NEW MEMORY:
//   1. Copy any memory object below (everything inside { } including the
//      trailing comma).
//   2. Paste it at the end of the memories array (before the closing ]).
//   3. Change the values to match your real memory.
//   4. Save the file. The website updates automatically.
//
// FIELD GUIDE:
//   id          — A unique short name, no spaces (e.g. "goa-trip-2024")
//   title       — The display name shown on the card
//   description — A short sentence about this memory
//   date        — Any date text you like (e.g. "October 2025" or "June 2022")
//   year        — The year as a string (used for sorting and display)
//   category    — A group name (e.g. "Our Story", "Adventures", "Just Us")
//   type        — Either "photo" or "video"
//   thumbnail   — URL for the card cover image (Cloudinary or any URL)
//   media        — For photos: a list of image URLs shown in the gallery
//   youtubeId   — For videos: the YouTube video ID (e.g. "dQw4w9WgXcQ")
//   tags        — Keywords for search (e.g. ["goa", "trip", "beach"])
//   featured    — true if this memory should appear in the hero spotlight
//   favourite   — true if this should be pre-marked as a favourite
//   duration    — Optional: video length text (e.g. "02:16")
//   episode     — Optional: episode label (e.g. "Episode 1")
// =====================================================================

export type MemoryType = 'photo' | 'video';

export type Memory = {
  id: string;
  title: string;
  description: string;
  date: string;
  year: string;
  category: string;
  type: MemoryType;
  thumbnail: string;
  media: string[];
  youtubeId?: string;
  tags: string[];
  featured?: boolean;
  favourite?: boolean;
  duration?: string;
  episode?: string;
};

export type Row = {
  title: string;
  subtitle?: string;
  ids: string[];
};

export type Chapter = {
  year: string;
  title: string;
  description: string;
  ids: string[];
};

// ---------------------------------------------------------------------
// HERO CONFIGURATION
// ---------------------------------------------------------------------
// Change these values to update the hero (top) section of the website.
// heroImage: Replace with your own image URL (Cloudinary or any URL).
// heroTitle: The big title displayed over the hero image.
// heroSubtitle: The line below the title.
// heroTimeline: The year range shown in the eyebrow.
// heroMeta: The small metadata items shown below the title.
// heroDescription: The paragraph below the metadata.
// ---------------------------------------------------------------------

export const heroConfig = {
  heroImage: 'https://images.pexels.com/photos/1176581/pexels-photo-1176581.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2000',
  heroTitle: 'Anusha & Vishal',
  heroTitleAccent: 'Story',
  heroSubtitle: 'Because our story deserves its own streaming service.',
  heroTimeline: '2022 — CONTINUING',
  heroMeta: ['2022', 'All love', 'Continuing', 'Countless episodes'],
  heroDescription: 'One story. Two people. Countless memories.\nAnd the story is still being written.',
};

// ---------------------------------------------------------------------
// SURPRISE / EASTER EGG MESSAGE
// ---------------------------------------------------------------------
// This is the hidden message revealed when someone clicks the secret
// heart or taps the logo 5 times. Change the text and photo to make it
// personal.
// ---------------------------------------------------------------------

export const surpriseConfig = {
  kicker: 'One more thing...',
  line1: 'Out of all the memories\non this website,',
  line2: 'my favourite one\nis still... us.',
  photo: 'https://images.pexels.com/photos/1176581/pexels-photo-1176581.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2000',
  loveNote: 'I love you.',
};

// ---------------------------------------------------------------------
// PHOTOS (placeholder URLs — replace with your Cloudinary URLs)
// ---------------------------------------------------------------------

const photos = {
  hero: 'https://images.pexels.com/photos/1176581/pexels-photo-1176581.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sunset: 'https://images.pexels.com/photos/1024963/pexels-photo-1024963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hands: 'https://images.pexels.com/photos/4529772/pexels-photo-4529772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  selfie: 'https://images.pexels.com/photos/27087259/pexels-photo-27087259.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  dinner: 'https://images.pexels.com/photos/5086620/pexels-photo-5086620.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  jaipur: 'https://images.pexels.com/photos/32261804/pexels-photo-32261804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  goa: 'https://images.pexels.com/photos/4428274/pexels-photo-4428274.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  birthday: 'https://images.pexels.com/photos/3859921/pexels-photo-3859921.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  anniversary: 'https://images.pexels.com/photos/15198293/pexels-photo-15198293.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beach: 'https://images.pexels.com/photos/27869489/pexels-photo-27869489.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  travel: 'https://images.pexels.com/photos/15804623/pexels-photo-15804623.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  cozy: 'https://images.pexels.com/photos/6288706/pexels-photo-6288706.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

// ---------------------------------------------------------------------
// MEMORIES
// ---------------------------------------------------------------------
// Add, remove, or edit memories here. Each one becomes a card on the
// home page and a detail page when clicked.
// ---------------------------------------------------------------------

export const memories: Memory[] = [
  {
    id: 'beginning',
    title: 'Where It All Started',
    date: '2022',
    year: '2022',
    category: 'Our Story',
    type: 'photo',
    thumbnail: photos.hero,
    media: [photos.hero, photos.hands],
    description: 'Where everything started. Two people, one unexpected hello, and a story that keeps getting better.',
    tags: ['beginning', 'story', 'special'],
    episode: 'Chapter 1',
    featured: true,
    favourite: true,
  },
  {
    id: 'conversation',
    title: 'Our First Conversation',
    date: '2022',
    year: '2022',
    category: 'Our Story',
    type: 'photo',
    thumbnail: photos.selfie,
    media: [photos.selfie],
    description: 'A tiny conversation that somehow became our favourite part of every day.',
    tags: ['conversation', 'beginning'],
    episode: 'Chapter 1',
  },
  {
    id: 'first-date',
    title: 'The First Date',
    date: '2022',
    year: '2022',
    category: 'Our Story',
    type: 'photo',
    thumbnail: photos.dinner,
    media: [photos.dinner, photos.cozy],
    description: 'The day we finally met, talked for hours, and forgot to check the time.',
    tags: ['date', 'special', 'story'],
    episode: 'Chapter 1',
  },
  {
    id: 'growing-together',
    title: 'Growing Together',
    date: '2023',
    year: '2023',
    category: 'Our Story',
    type: 'photo',
    thumbnail: photos.sunset,
    media: [photos.sunset],
    description: 'No plans. No schedule. Just us finding a little magic in an ordinary afternoon.',
    tags: ['growing', 'us', 'sunset'],
    episode: 'Chapter 2',
  },
  {
    id: 'first-trip',
    title: 'The First Trip',
    date: '2023',
    year: '2023',
    category: 'Adventures',
    type: 'video',
    thumbnail: photos.travel,
    media: [photos.travel],
    youtubeId: 'dQw4w9WgXcQ',
    description: 'New roads, shared playlists, and the kind of view you wish you could keep forever.',
    tags: ['trip', 'travel', 'adventure'],
    duration: '01:24',
  },
  {
    id: 'jaipur',
    title: 'Jaipur Diaries',
    date: '2024',
    year: '2024',
    category: 'Adventures',
    type: 'photo',
    thumbnail: photos.jaipur,
    media: [photos.jaipur, photos.hands],
    description: 'Pink skies, old stories, and getting happily lost together.',
    tags: ['trip', 'jaipur', 'travel'],
  },
  {
    id: 'goa',
    title: 'Goa, With You',
    date: '2024',
    year: '2024',
    category: 'Adventures',
    type: 'video',
    thumbnail: photos.goa,
    media: [photos.goa, photos.beach],
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Salt in the air, sand everywhere, and nowhere else we needed to be.',
    tags: ['trip', 'goa', 'beach'],
    duration: '02:16',
  },
  {
    id: 'selfies',
    title: 'Random Selfies',
    date: '2024',
    year: '2024',
    category: 'Just Us',
    type: 'photo',
    thumbnail: photos.selfie,
    media: [photos.selfie, photos.sunset],
    description: 'Proof that our best photos are usually the ones we never planned.',
    tags: ['selfie', 'fun', 'us'],
  },
  {
    id: 'late-night',
    title: 'Late Night Calls',
    date: 'Every night',
    year: '2024',
    category: 'Just Us',
    type: 'video',
    thumbnail: photos.cozy,
    media: [photos.cozy],
    youtubeId: 'dQw4w9WgXcQ',
    description: 'The conversations that made midnight feel like the best time of day.',
    tags: ['late night', 'calls', 'us'],
    duration: '02:16',
  },
  {
    id: 'birthday',
    title: 'Birthday Magic',
    date: '2025',
    year: '2025',
    category: 'Special Moments',
    type: 'photo',
    thumbnail: photos.birthday,
    media: [photos.birthday, photos.anniversary],
    description: 'Candles, wishes, and the warmest kind of celebration.',
    tags: ['birthday', 'celebration', 'special'],
  },
  {
    id: 'anniversary',
    title: 'Another Year Of Us',
    date: '2025',
    year: '2025',
    category: 'Special Moments',
    type: 'photo',
    thumbnail: photos.anniversary,
    media: [photos.anniversary, photos.dinner],
    description: 'One more chapter, countless more reasons to choose each other.',
    tags: ['anniversary', 'celebration', 'special'],
    favourite: true,
  },
  {
    id: 'best-day',
    title: 'Best Day Ever',
    date: '2026',
    year: '2026',
    category: 'Favourite Memories',
    type: 'photo',
    thumbnail: photos.beach,
    media: [photos.beach],
    description: 'The kind of day that ends too quickly and stays with you forever.',
    tags: ['favourite', 'beach', 'special'],
    featured: true,
  },
];

// ---------------------------------------------------------------------
// CONTENT ROWS (home page)
// ---------------------------------------------------------------------
// Each row shows a horizontal scrolling list of memory cards.
// The ids refer to memory ids from the memories array above.
// ---------------------------------------------------------------------

export const rows: Row[] = [
  {
    title: 'Continue Watching',
    subtitle: 'Pick up where you left off',
    ids: ['conversation', 'first-date', 'growing-together', 'first-trip', 'late-night'],
  },
  {
    title: 'Our Favourite Memories',
    ids: ['beginning', 'best-day', 'anniversary', 'birthday', 'selfies'],
  },
  {
    title: 'Our Adventures',
    subtitle: 'Out there, together',
    ids: ['first-trip', 'jaipur', 'goa', 'best-day'],
  },
  {
    title: 'Just Us',
    ids: ['selfies', 'late-night', 'first-date', 'growing-together', 'conversation'],
  },
  {
    title: 'Special Moments',
    ids: ['birthday', 'anniversary', 'beginning', 'best-day'],
  },
];

// ---------------------------------------------------------------------
// STORY CHAPTERS (Our Story page)
// ---------------------------------------------------------------------
// The timeline is chronological from 2022 to continuing.
// Each chapter references memory ids that belong to that period.
// Edit the titles and descriptions to match your real story.
// ---------------------------------------------------------------------

export const chapters: Chapter[] = [
  {
    year: '2022',
    title: 'Where It All Started',
    description: 'Before we knew where it would lead, there was a first hello. The kind that feels ordinary until you look back and realise it changed everything.',
    ids: ['beginning', 'conversation', 'first-date'],
  },
  {
    year: '2023',
    title: 'Growing Together',
    description: 'We grew closer with every conversation, every shared moment, and every new experience that brought us into each other\'s world.',
    ids: ['growing-together', 'first-trip'],
  },
  {
    year: '2024',
    title: 'More Memories',
    description: 'Our map got bigger, our playlists got longer, and every new place felt like home because we were there together.',
    ids: ['jaipur', 'goa', 'selfies', 'late-night'],
  },
  {
    year: '2025',
    title: 'More Adventures',
    description: 'Birthdays, celebrations, and the beautiful, everyday parts that make a life feel like ours.',
    ids: ['birthday', 'anniversary'],
  },
  {
    year: '2026',
    title: 'Still Us',
    description: 'Through every season, every change, and every new day — still us, still choosing each other.',
    ids: ['best-day'],
  },
  {
    year: 'CONTINUING',
    title: 'The Story Isn\'t Over Yet',
    description: 'The best chapters are still unwritten. Here\'s to everything that comes next.',
    ids: [],
  },
];
