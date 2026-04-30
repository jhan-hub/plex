import { useState, useEffect } from 'react';
import { Search, Bell, User, Play, Info, ChevronRight, Menu, Film, Star, TrendingUp, MonitorPlay } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Sample Data Using Real TMDB URLs where possible, falling back to Unsplash style placeholders if needed
const HERO_SLIDES = [
  {
    id: 1,
    title: 'DUNE: PART TWO',
    desc: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    img: 'https://image.tmdb.org/t/p/original/8b8R8l88ILGWXAMNIfA4a3c10H0.jpg',
    tags: ['Sci-Fi', 'Adventure', '2024'],
  },
  {
    id: 2,
    title: 'OPPENHEIMER',
    desc: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II.',
    img: 'https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBRoOoAca.jpg',
    tags: ['Biography', 'Drama', '2023'],
  },
  {
    id: 3,
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE',
    desc: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    img: 'https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    tags: ['Animation', 'Action', '2023'],
  }
];

// Row Data
const TRENDING = [
  { id: 10, title: 'Deadpool & Wolverine', img: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', cam: true },
  { id: 11, title: 'Inside Out 2', img: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg' },
  { id: 12, title: 'The Fall Guy', img: 'https://image.tmdb.org/t/p/w500/tSz1qsmSJon0rqjHBxXZmrotuse.jpg' },
  { id: 13, title: 'Furiosa: A Mad Max Saga', img: 'https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg' },
  { id: 14, title: 'Bad Boys: Ride or Die', img: 'https://image.tmdb.org/t/p/w500/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg', cam: true },
  { id: 15, title: 'Kingdom of the Planet of the Apes', img: 'https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg' },
];

const NEW_RELEASES = [
  { id: 20, title: 'A Quiet Place: Day One', img: 'https://image.tmdb.org/t/p/w500/hU42CRk14JuPEdqZG3AWmagiPAP.jpg', cam: true },
  { id: 21, title: 'Twisters', img: 'https://image.tmdb.org/t/p/w500/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg' },
  { id: 22, title: 'Despicable Me 4', img: 'https://image.tmdb.org/t/p/w500/wWba3TaojhK7NlGUbU3qYwCG2Qv.jpg' },
  { id: 23, title: 'Longlegs', img: 'https://image.tmdb.org/t/p/w500/5aj8vVGFqiG8IXw0kY74FfWe0i7.jpg' },
  { id: 24, title: 'Alien: Romulus', img: 'https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsTcR6.jpg', cam: true },
  { id: 25, title: 'Borderlands', img: 'https://image.tmdb.org/t/p/w500/865DntZzTWAKvQbgDEX02CWe23X.jpg' },
];

const TOP_IMDB = [
  { id: 30, title: 'The Shawshank Redemption', img: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
  { id: 31, title: 'The Godfather', img: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg' },
  { id: 32, title: 'The Dark Knight', img: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { id: 33, title: '12 Angry Men', img: 'https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hWKepIrXmgA.jpg' },
  { id: 34, title: 'Schindler\'s List', img: 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQY0o.jpg' },
  { id: 35, title: 'Pulp Fiction', img: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg' },
];

const TV_SERIES = [
  { id: 40, title: 'Breaking Bad', img: 'https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg' },
  { id: 41, title: 'House of the Dragon', img: 'https://image.tmdb.org/t/p/w500/1X4h40fcB4WWUmIBK0auT4zRBAV.jpg' },
  { id: 42, title: 'The Boys', img: 'https://image.tmdb.org/t/p/w500/2qzmKpZKGcuqgBf81B8X42nEa92.jpg' },
  { id: 43, title: 'Stranger Things', img: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8m1vH1rN.jpg' },
  { id: 44, title: 'Game of Thrones', img: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg' },
  { id: 45, title: 'Fallout', img: 'https://image.tmdb.org/t/p/w500/wSqAXL1E02qv0B2eZ523a3hI286.jpg' },
];

const GENRES = [
  { name: 'Action', emoji: '💥' },
  { name: 'Comedy', emoji: '😂' },
  { name: 'Horror', emoji: '👻' },
  { name: 'Romance', emoji: '💖' },
  { name: 'Sci-Fi', emoji: '👽' },
  { name: 'Fantasy', emoji: '🧙‍♂️' },
  { name: 'Drama', emoji: '🎭' },
  { name: 'Anime', emoji: '🌸' },
];

function MovieRow({ title, icon: Icon, movies }: { title: string, icon: any, movies: any[] }) {
  return (
    <section className="py-6 px-4 md:px-8 lg:px-12">
      <div className="flex items-center space-x-2 mb-4">
        <Icon className="text-melplex-gold w-6 h-6" />
        <h2 className="text-2xl font-display tracking-wide">{title}</h2>
        <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
      </div>
      
      <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
        {movies.map((m) => (
          <div 
            key={m.id} 
            className="group relative flex-shrink-0 snap-start w-36 sm:w-40 md:w-48 lg:w-56 aspect-[2/3] rounded-lg overflow-hidden cursor-pointer bg-gray-800"
          >
            <img 
              src={m.img} 
              alt={m.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            {m.cam && (
              <div className="absolute top-2 left-2 bg-melplex-red text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg uppercase tracking-wider">
                CAM
              </div>
            )}
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-melplex-gold/90 p-3 rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-100 shadow-lg shadow-melplex-gold/20">
                  <Play className="w-6 h-6 text-black fill-black ml-1" />
                </div>
              </div>
              <h3 className="text-white font-body font-medium text-sm md:text-base text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 relative z-10 line-clamp-2">
                {m.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-melplex-darker text-white font-body overflow-x-hidden selection:bg-melplex-gold selection:text-black">
      
      {/* Top Notification Bar */}
      <div className="bg-melplex-gold text-black text-center py-2 text-xs md:text-sm font-medium z-50 relative pointer-events-none">
        <span className="mr-2">✨</span>
        Check out our new VIP Melplex tier! Go Premium for completely ad-free viewing.
        <a href="#subscribe" className="mx-2 underline font-bold pointer-events-auto">Learn more</a>
      </div>

      {/* Navbar */}
      <nav 
        className={`fixed w-full z-40 top-0 mt-8 md:mt-9 transition-all duration-300 ${
          isScrolled ? 'bg-melplex-darker/95 backdrop-blur-md shadow-lg shadow-black/50 py-3' : 'bg-gradient-to-b from-black/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <a href="/" className="text-3xl md:text-4xl text-melplex-gold font-display tracking-wider">
              MELPLEX
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex space-x-6 text-sm font-medium text-gray-300">
              <a href="#home" className="text-white hover:text-melplex-gold transition-colors">Home</a>
              <a href="#movies" className="hover:text-melplex-gold transition-colors">Movies</a>
              <a href="#series" className="hover:text-melplex-gold transition-colors">Series</a>
              <a href="#trending" className="hover:text-melplex-gold transition-colors">Trending</a>
            </div>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="text-gray-300 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden sm:block text-gray-300 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="bg-melplex-gold hover:bg-melplex-gold/90 text-black px-4 py-1.5 md:py-2 rounded font-bold text-sm transition-all shadow-[0_0_15px_rgba(232,184,75,0.3)] hover:shadow-[0_0_20px_rgba(232,184,75,0.5)]">
              Sign In
            </button>
            <button className="lg:hidden text-gray-300 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] w-full bg-black mt-[-40px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Background Image Setup */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.img 
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: 'linear' }}
                src={HERO_SLIDES[currentSlide].img} 
                alt={HERO_SLIDES[currentSlide].title}
                className="w-full h-full object-cover object-top opacity-60"
              />
            </div>
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-melplex-darker via-melplex-darker/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-melplex-darker/90 via-transparent to-transparent md:w-2/3" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-4 md:px-12 lg:px-24 pb-20 md:pb-0">
              <div className="max-w-xl">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {HERO_SLIDES[currentSlide].tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur rounded text-gray-200">
                      {tag}
                    </span>
                  ))}
                </motion.div>
                
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-4 leading-tight drop-shadow-lg"
                >
                  {HERO_SLIDES[currentSlide].title}
                </motion.h1>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm md:text-base text-gray-300 mb-8 line-clamp-3 md:line-clamp-none max-w-lg drop-shadow-md"
                >
                  {HERO_SLIDES[currentSlide].desc}
                </motion.p>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex space-x-4"
                >
                  <button className="flex items-center space-x-2 bg-melplex-gold text-black px-6 md:px-8 py-3 rounded hover:bg-melplex-gold/90 transition-all font-bold shadow-lg hover:scale-105 active:scale-95">
                    <Play className="w-5 h-5 fill-black" />
                    <span>Watch Now</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-white/20 backdrop-blur text-white px-6 md:px-8 py-3 rounded hover:bg-white/30 transition-all font-bold">
                    <Info className="w-5 h-5" />
                    <span className="hidden sm:inline">More Details</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 right-8 flex space-x-3">
          {HERO_SLIDES.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-melplex-gold shadow-[0_0_8px_rgba(232,184,75,0.6)]' : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Main Content Areas */}
      <div className="relative z-10 -mt-10 md:-mt-20">
        <MovieRow title="Trending Now" icon={TrendingUp} movies={TRENDING} />
        <MovieRow title="New Releases" icon={Film} movies={NEW_RELEASES} />
        
        {/* Genre Browser Grid */}
        <section className="py-8 px-4 md:px-8 lg:px-12 bg-melplex-darker/50 border-y border-white/5 my-8">
          <div className="flex items-center space-x-2 mb-6">
            <Search className="text-melplex-gold w-6 h-6" />
            <h2 className="text-2xl font-display tracking-wide">Browse Genres</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
            {GENRES.map(genre => (
              <button 
                key={genre.name}
                className="bg-gray-900/80 border border-white/10 hover:border-melplex-gold/50 rounded-lg py-4 flex flex-col items-center justify-center space-y-2 group transition-all hover:bg-gray-800 hover:-translate-y-1 shadow-lg hover:shadow-melplex-gold/10"
              >
                <span className="text-2xl lg:text-3xl filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  {genre.emoji}
                </span>
                <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                  {genre.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        <MovieRow title="Top Rated on IMDb" icon={Star} movies={TOP_IMDB} />
        <MovieRow title="Popular TV Series" icon={MonitorPlay} movies={TV_SERIES} />
      </div>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-white/10 mt-12 py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <h2 className="text-3xl text-melplex-gold font-display tracking-widest">MELPLEX</h2>
            <p className="text-gray-400 text-sm max-w-sm">
              Your ultimate cinematic portal. Stream high-quality movies and TV shows from anywhere, anytime.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Dummy Social Links */}
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">X</div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">IG</div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">FB</div>
            </div>
          </div>
          
          {/* Links Col 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-melplex-gold transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-melplex-gold transition-colors">Movies</a></li>
              <li><a href="#" className="hover:text-melplex-gold transition-colors">TV Series</a></li>
              <li><a href="#" className="hover:text-melplex-gold transition-colors">Top IMDb</a></li>
            </ul>
          </div>
          
          {/* Links Col 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Account</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-melplex-gold transition-colors">My Profile</a></li>
              <li><a href="#" className="hover:text-melplex-gold transition-colors">Watchlist</a></li>
              <li><a href="#" className="hover:text-melplex-gold transition-colors">Subscription</a></li>
              <li><a href="#" className="hover:text-melplex-gold transition-colors">Settings</a></li>
            </ul>
          </div>
          
          {/* Links Col 3 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-melplex-gold transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-melplex-gold transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-melplex-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-melplex-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Melplex. All rights reserved. Not affiliated with TMDB.
        </div>
      </footer>
    </div>
  );
}
