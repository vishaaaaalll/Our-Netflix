import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import {
  ArrowRight, ChevronDown, ChevronLeft, ChevronRight, CircleUserRound,
  Clock3, Film, Heart, HeartHandshake, Menu, Play, Search, Share2, Sparkles,
  X, Upload
} from 'lucide-react';
import {
  type Memory, type Row,
  memories, rows, chapters, heroConfig, surpriseConfig
} from '@/data/memories';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selected, setSelected] = useState<Memory | null>(null);
  const [viewer, setViewer] = useState<{ memory: Memory; index: number } | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [surprise, setSurprise] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('ournetflix-favourites') ?? '[]') as string[];
      const preset = memories.filter((m) => m.favourite).map((m) => m.id);
      return [...new Set([...stored, ...preset])];
    } catch {
      return memories.filter((m) => m.favourite).map((m) => m.id);
    }
  });

  useEffect(() => { localStorage.setItem('ournetflix-favourites', JSON.stringify(favourites)); }, [favourites]);

  const toggleFavourite = (id: string) =>
    setFavourites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const goTo = (section: string) => { setActiveSection(section); setMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleLogoClick = () => { const next = logoClicks + 1; setLogoClicks(next); if (next >= 5) { setSurprise(true); setLogoClicks(0); } };
  const searchResults = useMemo(
    () => memories.filter((m) => `${m.title} ${m.description} ${m.date} ${m.category} ${m.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );
  const favouriteMemories = memories.filter((m) => favourites.includes(m.id));
  const featuredMemory = memories.find((m) => m.featured) ?? memories[0];

  return (
    <div className="app-shell">
      <Navbar active={activeSection} onNavigate={goTo} searchOpen={searchOpen} setSearchOpen={setSearchOpen} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} onLogoClick={handleLogoClick} />
      <main>
        {activeSection === 'home' && <HomePage featured={featuredMemory} onSelect={setSelected} onNavigate={goTo} onStory={() => setStoryOpen(true)} onFavourite={toggleFavourite} favourites={favourites} />}
        {activeSection === 'story' && <StoryPage onSelect={setSelected} onNavigate={goTo} />}
        {activeSection === 'photos' && <PhotosPage onSelect={(memory, index) => setViewer({ memory, index })} />}
        {activeSection === 'videos' && <VideosPage onSelect={setSelected} />}
        {activeSection === 'favourites' && <FavouritesPage memories={favouriteMemories} onSelect={setSelected} onFavourite={toggleFavourite} />}
      </main>
      <footer className="site-footer">
        <div>
          <span className="footer-logo">OUR<span>NETFLIX</span></span>
          <p>A private collection of our favourite chapters.</p>
        </div>
        <div className="footer-links">
          <button onClick={() => goTo('story')}>Our Story</button>
          <button onClick={() => goTo('photos')}>Photos</button>
          <button onClick={() => goTo('videos')}>Videos</button>
          <button onClick={() => setSurprise(true)}>One more thing...</button>
          <button onClick={() => setGuideOpen(true)}>Customize</button>
        </div>
        <div className="footer-note">Made with love<br /><span>© 2022 — Continuing</span></div>
      </footer>
      <MusicPlayer />
      <button className="secret-heart" aria-label="Open surprise" onClick={() => setSurprise(true)}><Heart size={17} fill="currentColor" /></button>
      {guideOpen && <ContentGuide onClose={() => setGuideOpen(false)} />}
      {searchOpen && <SearchOverlay query={query} setQuery={setQuery} results={searchResults} onClose={() => { setSearchOpen(false); setQuery(''); }} onSelect={setSelected} />}
      {selected && <MemoryModal memory={selected} isFavourite={favourites.includes(selected.id)} onClose={() => setSelected(null)} onFavourite={() => toggleFavourite(selected.id)} onGallery={(index) => { setSelected(null); setViewer({ memory: selected, index }); }} />}
      {viewer && <PhotoViewer memory={viewer.memory} index={viewer.index} onClose={() => setViewer(null)} onChange={(index) => setViewer({ ...viewer, index })} />}
      {storyOpen && <StoryMode onClose={() => setStoryOpen(false)} memories={memories} />}
      {surprise && <Surprise onClose={() => setSurprise(false)} />}
    </div>
  );
}

function Navbar({ active, onNavigate, searchOpen, setSearchOpen, mobileMenu, setMobileMenu, onLogoClick }: {
  active: string; onNavigate: (section: string) => void; searchOpen: boolean; setSearchOpen: (open: boolean) => void; mobileMenu: boolean; setMobileMenu: (open: boolean) => void; onLogoClick: () => void;
}) {
  const links = [['home', 'Home'], ['story', 'Our Story'], ['photos', 'Photos'], ['videos', 'Videos'], ['favourites', 'Favourites']];
  return (
    <header className={`nav-shell ${active !== 'home' ? 'nav-solid' : ''}`}>
      <div className="nav-inner">
        <button className="brand" onClick={onLogoClick} aria-label="OUR NETFLIX home">
          <span className="brand-mark"><Film size={17} /></span>OUR<span>NETFLIX</span>
        </button>
        <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>
          {links.map(([id, label]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => onNavigate(id)}>{label}</button>)}
        </nav>
        <div className="nav-actions">
          <button aria-label="Search" className={searchOpen ? 'action-active' : ''} onClick={() => setSearchOpen(true)}><Search size={19} /></button>
          <button aria-label="Favourites" onClick={() => onNavigate('favourites')}><Heart size={19} /></button>
          <button aria-label="Profile"><CircleUserRound size={20} /></button>
          <button className="menu-button" aria-label="Menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
    </header>
  );
}

function HomePage({ featured, onSelect, onNavigate, onStory, onFavourite, favourites }: {
  featured: Memory; onSelect: (memory: Memory) => void; onNavigate: (section: string) => void; onStory: () => void; onFavourite: (id: string) => void; favourites: string[];
}) {
  return (
    <>
      <section className="hero">
        <div className="hero-image" style={{ backgroundImage: `url('${heroConfig.heroImage}')` }} />
        <div className="hero-vignette" />
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-dot" /> Our original story <span className="eyebrow-line" /> {heroConfig.heroTimeline}</div>
          <h1>{heroConfig.heroTitle}<br /><em>{heroConfig.heroTitleAccent}</em></h1>
          <p className="hero-lede">{heroConfig.heroSubtitle}</p>
          <div className="hero-meta">
            {heroConfig.heroMeta.map((item, i) => i === 1 ? <span key={i} className="maturity">{item}</span> : <span key={i}>{item}</span>)}
          </div>
          <p className="hero-description">{heroConfig.heroDescription.split('\n').map((line, i) => <span key={i}>{i > 0 && <br className="desktop-only" />}{line}</span>)}</p>
          <div className="hero-buttons">
            <button className="button button-light" onClick={onStory}><Play size={16} fill="currentColor" /> Play our story</button>
            <button className="button button-glass" onClick={() => onFavourite(featured.id)}><Heart size={17} fill={favourites.includes(featured.id) ? 'currentColor' : 'none'} /> {favourites.includes(featured.id) ? 'In my list' : 'My favourites'}</button>
          </div>
        </div>
        <div className="hero-scroll"><span>Scroll to explore</span><ChevronDown size={16} /></div>
      </section>
      <section className="content-wrap">
        <div className="section-intro">
          <div><p className="section-kicker">A little universe of us</p><h2>Every moment has a story.</h2></div>
          <button className="text-link" onClick={() => onNavigate('story')}>Explore our story <ArrowRight size={15} /></button>
        </div>
        {rows.map((row) => <ContentRow key={row.title} row={row} onSelect={onSelect} onFavourite={onFavourite} favourites={favourites} />)}
        <div className="story-cta">
          <div className="story-cta-glow" />
          <div>
            <p className="section-kicker">The complete collection</p>
            <h2>Our story, so far.</h2>
            <p>From 2022 to now — a thousand little moments. And the best part is, we're still writing it.</p>
          </div>
          <button className="button button-outline" onClick={() => onNavigate('story')}>View timeline <ArrowRight size={16} /></button>
        </div>
      </section>
    </>
  );
}

function ContentRow({ row, onSelect, onFavourite, favourites }: {
  row: Row; onSelect: (memory: Memory) => void; onFavourite: (id: string) => void; favourites: string[];
}) {
  const list = row.ids.map((id) => memories.find((m) => m.id === id)).filter((item): item is Memory => Boolean(item));
  return (
    <section className="content-row">
      <div className="row-heading">
        <div>
          <h2>{row.title} <span className="row-heart">{row.title.includes('Favourite') || row.title === 'Just Us' ? '♥' : ''}</span></h2>
          {row.subtitle && <p>{row.subtitle}</p>}
        </div>
        <div className="row-arrows">
          <button aria-label="Scroll left"><ChevronLeft size={17} /></button>
          <button aria-label="Scroll right"><ChevronRight size={17} /></button>
        </div>
      </div>
      <div className="card-track">
        {list.map((memory) => <MemoryCard key={memory.id} memory={memory} onSelect={onSelect} onFavourite={onFavourite} isFavourite={favourites.includes(memory.id)} />)}
      </div>
    </section>
  );
}

function MemoryCard({ memory, onSelect, onFavourite, isFavourite }: {
  memory: Memory; onSelect: (memory: Memory) => void; onFavourite: (id: string) => void; isFavourite: boolean;
}) {
  return (
    <article className="memory-card" onClick={() => onSelect(memory)}>
      <div className="card-image-wrap">
        <img src={memory.thumbnail} alt={memory.title} loading="lazy" />
        <div className="card-shade" />
        <div className="card-topline">
          <span>{memory.type === 'video' ? 'Film' : 'Photo'}</span>
          <button aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'} onClick={(e) => { e.stopPropagation(); onFavourite(memory.id); }}>
            <Heart size={15} fill={isFavourite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="card-hover">
          <span className="play-circle"><Play size={16} fill="currentColor" /></span>
          <span>View memory</span>
        </div>
        <div className="card-bottom">
          <h3>{memory.title}</h3>
          <p>{memory.date} <span>·</span> {memory.episode ?? memory.category}</p>
        </div>
      </div>
    </article>
  );
}

function MemoryModal({ memory, isFavourite, onClose, onFavourite, onGallery }: {
  memory: Memory; isFavourite: boolean; onClose: () => void; onFavourite: () => void; onGallery: (index: number) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const isVideo = memory.type === 'video' && memory.youtubeId;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="memory-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        <div className="modal-media">
          {isVideo && playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${memory.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={memory.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <img src={memory.thumbnail} alt={memory.title} />
          )}
          {isVideo && !playing && <button className="modal-play" onClick={() => setPlaying(true)}><Play size={25} fill="currentColor" /></button>}
          <div className="modal-media-gradient" />
        </div>
        <div className="modal-copy">
          <p className="section-kicker">{memory.category} <span>·</span> {memory.year}</p>
          <h2>{memory.title}</h2>
          <p className="modal-date"><Clock3 size={14} /> {memory.date} {memory.duration && <><span>·</span> {memory.duration}</>}</p>
          <p className="modal-description">{memory.description}</p>
          <div className="modal-actions">
            <button className="button button-light" onClick={() => isVideo ? setPlaying(true) : onGallery(0)}>
              <Play size={16} fill="currentColor" /> {isVideo ? 'Play memory' : 'View photos'}
            </button>
            <button className={`icon-button-label ${isFavourite ? 'selected' : ''}`} onClick={onFavourite}>
              <Heart size={17} fill={isFavourite ? 'currentColor' : 'none'} /> {isFavourite ? 'In my list' : 'My list'}
            </button>
            <button className="share-button" onClick={() => navigator.clipboard?.writeText(window.location.href)}>
              <Share2 size={16} /> Share
            </button>
          </div>
          {memory.media.length > 1 && (
            <div className="modal-thumbs">
              {memory.media.map((media, index) => (
                <button key={media} onClick={() => onGallery(index)}><img src={media} alt={`${memory.title} ${index + 1}`} /></button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PhotosPage({ onSelect }: { onSelect: (memory: Memory, index: number) => void }) {
  const photoMemories = memories.filter((m) => m.type === 'photo');
  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="section-kicker">The stills</p>
        <h1>Photos <span>of us.</span></h1>
        <p>A collection of the little frames we never want to forget.</p>
      </div>
      <div className="photo-grid">
        {photoMemories.flatMap((memory) =>
          memory.media.map((media, index) => (
            <button className={`photo-tile tile-${(index + memory.id.length) % 5}`} key={`${memory.id}-${index}`} onClick={() => onSelect(memory, index)}>
              <img src={media} alt={memory.title} loading="lazy" />
              <span className="photo-caption"><small>{memory.date}</small>{memory.title}</span>
            </button>
          ))
        )}
      </div>
    </section>
  );
}

function VideosPage({ onSelect }: { onSelect: (memory: Memory) => void }) {
  const videoMemories = memories.filter((m) => m.type === 'video');
  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="section-kicker">Moving pictures</p>
        <h1>Videos <span>of us.</span></h1>
        <p>Little films from our life, waiting to be replayed.</p>
      </div>
      <div className="video-grid">
        {videoMemories.map((memory) => (
          <article className="video-card" key={memory.id} onClick={() => onSelect(memory)}>
            <div className="video-thumb">
              <img src={memory.thumbnail} alt={memory.title} loading="lazy" />
              <span className="play-circle"><Play size={18} fill="currentColor" /></span>
              {memory.duration && <span className="video-duration">{memory.duration}</span>}
            </div>
            <div className="video-copy">
              <p>{memory.date}</p>
              <h3>{memory.title}</h3>
              <span>{memory.description}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="upload-note">
        <Upload size={20} />
        <div>
          <strong>Make it yours</strong>
          <p>Videos use YouTube unlisted IDs. Add your video ID to the youtubeId field in the memories file — the player opens right here, no redirect.</p>
        </div>
      </div>
    </section>
  );
}

function StoryPage({ onSelect, onNavigate }: { onSelect: (memory: Memory) => void; onNavigate: (section: string) => void }) {
  return (
    <section className="page-section story-page">
      <div className="page-heading story-heading">
        <p className="section-kicker">A documentary in chapters</p>
        <h1>Our <span>story.</span></h1>
        <p>From 2022 to forever — press play on the moments that brought us here.</p>
      </div>
      <div className="timeline">
        {chapters.map((chapter, index) => (
          <div className="chapter" key={chapter.year}>
            <div className="chapter-marker">
              <span>{chapter.year === 'CONTINUING' ? '∞' : chapter.year}</span>
              <i />
            </div>
            <div className="chapter-content">
              <div className="chapter-copy">
                <p className="section-kicker">{chapter.year}</p>
                <h2>{chapter.title}</h2>
                <p>{chapter.description}</p>
                {chapter.ids.length > 0 && (
                  <button className="text-link" onClick={() => onSelect(memories.find((m) => m.id === chapter.ids[0])!)}>
                    Watch chapter <Play size={14} fill="currentColor" />
                  </button>
                )}
              </div>
              <div className="chapter-cards">
                {chapter.ids.map((id) => {
                  const memory = memories.find((m) => m.id === id);
                  return memory ? (
                    <button key={id} className="chapter-image" onClick={() => onSelect(memory)}>
                      <img src={memory.thumbnail} alt={memory.title} />
                      <span>{memory.title}</span>
                    </button>
                  ) : null;
                })}
              </div>
            </div>
            {index < chapters.length - 1 && <div className="chapter-line" />}
          </div>
        ))}
      </div>
      <div className="story-end">
        <HeartHandshake size={28} />
        <p>To be continued...</p>
        <button className="text-link" onClick={() => onNavigate('home')}>Back to our memories <ArrowRight size={15} /></button>
      </div>
    </section>
  );
}

function FavouritesPage({ memories: favMemories, onSelect, onFavourite }: {
  memories: Memory[]; onSelect: (memory: Memory) => void; onFavourite: (id: string) => void;
}) {
  return (
    <section className="page-section favourites-page">
      <div className="page-heading">
        <p className="section-kicker">Your personal collection</p>
        <h1>My <span>favourites.</span></h1>
        <p>Every memory worth replaying twice.</p>
      </div>
      {favMemories.length > 0 ? (
        <div className="favourite-grid">
          {favMemories.map((memory) => <MemoryCard key={memory.id} memory={memory} onSelect={onSelect} onFavourite={onFavourite} isFavourite />)}
        </div>
      ) : (
        <div className="empty-state">
          <Heart size={34} />
          <h2>Your list is waiting.</h2>
          <p>Tap the heart on any memory to keep it close.</p>
        </div>
      )}
    </section>
  );
}

function SearchOverlay({ query, setQuery, results, onClose, onSelect }: {
  query: string; setQuery: (q: string) => void; results: Memory[]; onClose: () => void; onSelect: (memory: Memory) => void;
}) {
  return (
    <div className="search-overlay">
      <div className="search-bar-wrap">
        <Search size={22} />
        <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search our memories..." />
        <button onClick={onClose}><X size={20} /></button>
      </div>
      {query && (
        <div className="search-results">
          <p className="section-kicker">{results.length} {results.length === 1 ? 'memory' : 'memories'} found</p>
          {results.length ? results.map((memory) => (
            <button className="search-result" key={memory.id} onClick={() => { onSelect(memory); onClose(); }}>
              <img src={memory.thumbnail} alt={memory.title} />
              <span><strong>{memory.title}</strong><small>{memory.date} · {memory.category}</small></span>
              <ArrowRight size={16} />
            </button>
          )) : (
            <div className="no-results"><Search size={24} /><p>No memories found for "{query}".</p></div>
          )}
        </div>
      )}
    </div>
  );
}

function PhotoViewer({ memory, index, onClose, onChange }: {
  memory: Memory; index: number; onClose: () => void; onChange: (index: number) => void;
}) {
  const canPrev = index > 0;
  const canNext = index < memory.media.length - 1;
  return (
    <div className="photo-viewer" onClick={onClose}>
      <button className="viewer-close" onClick={onClose}><X size={22} /></button>
      <div className="viewer-content" onClick={(e) => e.stopPropagation()}>
        <img src={memory.media[index]} alt={memory.title} />
        <div className="viewer-info">
          <span>{memory.title}</span>
          <small>{memory.date} · {index + 1} of {memory.media.length}</small>
        </div>
      </div>
      {canPrev && <button className="viewer-arrow left" onClick={() => onChange(index - 1)}><ChevronLeft size={25} /></button>}
      {canNext && <button className="viewer-arrow right" onClick={() => onChange(index + 1)}><ChevronRight size={25} /></button>}
    </div>
  );
}

function StoryMode({ onClose, memories: storyMemories }: { onClose: () => void; memories: Memory[] }) {
  const [index, setIndex] = useState(0);
  const memory = storyMemories[index];
  return (
    <div className="story-mode">
      <button className="story-mode-close" onClick={onClose}><X size={20} /> Exit story</button>
      <div className="story-mode-progress">
        {storyMemories.map((item, i) => <span key={item.id} className={i <= index ? 'filled' : ''} />)}
      </div>
      <div className="story-mode-image">
        <img src={memory.thumbnail} alt={memory.title} />
        <div className="story-mode-gradient" />
      </div>
      <div className="story-mode-copy">
        <p className="section-kicker">Chapter {index + 1} <span>·</span> {memory.date}</p>
        <h1>{memory.title}</h1>
        <p>{memory.description}</p>
        <div>
          <button className="button button-light" onClick={() => index < storyMemories.length - 1 ? setIndex(index + 1) : onClose()}>
            {index < storyMemories.length - 1 ? 'Next memory' : 'Finish story'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <button className="story-nav prev" disabled={index === 0} onClick={() => setIndex(index - 1)}><ChevronLeft /></button>
      <button className="story-nav next" disabled={index === storyMemories.length - 1} onClick={() => setIndex(index + 1)}><ChevronRight /></button>
    </div>
  );
}

function MusicPlayer() {
  const [source, setSource] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSource(URL.createObjectURL(file));
  };
  return (
    <div className={`music-player ${open ? 'open' : ''}`}>
      <button className="music-toggle" aria-label="Open music player" onClick={() => setOpen(!open)}>
        <span className="music-bars"><i /><i /><i /></span>
      </button>
      {open && (
        <div className="music-panel">
          <div>
            <p className="section-kicker">Our soundtrack</p>
            <strong>{source ? 'Your uploaded song' : 'Add your own music'}</strong>
          </div>
          {source ? (
            <audio src={source} controls />
          ) : (
            <label className="upload-audio">
              <Upload size={14} /> Choose audio
              <input type="file" accept="audio/*" onChange={handleUpload} />
            </label>
          )}
          <small>Music never starts automatically.</small>
        </div>
      )}
    </div>
  );
}

function ContentGuide({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop guide-backdrop" onClick={onClose}>
      <div className="guide-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={19} /></button>
        <p className="section-kicker">Make it yours</p>
        <h2>Customize OUR NETFLIX.</h2>
        <p className="guide-lede">All content lives in one file: <b>src/data/memories.ts</b>. Edit that file to add photos, videos, and memories.</p>
        <div className="guide-steps">
          <div>
            <span>01</span>
            <h3>Add a photo</h3>
            <p>In the memories array, add a new object with <b>type: 'photo'</b>, set <b>thumbnail</b> to a Cloudinary URL, and list image URLs in <b>media</b>.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Add a video</h3>
            <p>Add a new object with <b>type: 'video'</b>, set <b>thumbnail</b> to a Cloudinary image, and add your <b>youtubeId</b> (the part after v= in a YouTube link).</p>
          </div>
          <div>
            <span>03</span>
            <h3>Change the hero</h3>
            <p>Edit <b>heroConfig</b> at the top of the memories file to change the hero image, title, subtitle, and timeline text.</p>
          </div>
          <div>
            <span>04</span>
            <h3>Deploy it</h3>
            <p>Push to GitHub, enable Pages in repo Settings, and your site goes live. See README.md for full instructions.</p>
          </div>
        </div>
        <div className="guide-example">
          <code>{`{
  id: 'goa-trip',
  title: 'Our Goa Trip',
  description: 'One of our favourite adventures.',
  date: 'October 2025',
  year: '2025',
  category: 'Adventures',
  type: 'video',
  thumbnail: 'https://res.cloudinary.com/your-cloud/image/upload/goa.jpg',
  media: ['https://res.cloudinary.com/your-cloud/image/upload/goa.jpg'],
  youtubeId: 'dQw4w9WgXcQ',
  tags: ['goa', 'trip', 'adventure'],
  featured: true
}`}</code>
        </div>
      </div>
    </div>
  );
}

function Surprise({ onClose }: { onClose: () => void }) {
  return (
    <div className="surprise-overlay">
      <button className="modal-close" onClick={onClose}><X size={20} /></button>
      <div className="surprise-glow" />
      <div className="surprise-copy">
        <Sparkles size={26} />
        <p className="section-kicker">{surpriseConfig.kicker}</p>
        <h1>{surpriseConfig.line1.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</h1>
        <h2>{surpriseConfig.line2.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</h2>
        <div className="surprise-photo"><img src={surpriseConfig.photo} alt="A couple together" /></div>
        <p className="love-note">{surpriseConfig.loveNote}</p>
        <Heart size={22} fill="currentColor" />
      </div>
    </div>
  );
}

export default App;
