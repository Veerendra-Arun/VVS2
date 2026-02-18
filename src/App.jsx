import React, { useState, useEffect } from 'react';
import { Camera, Video, Share2, Instagram, Linkedin, Mail, ArrowRight, X, Menu, ChevronRight, Quote, Maximize2, Phone } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // Helper to generate 15 mock media items per album
  const generateAlbumMedia = (baseId, type) => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: `${baseId}-${i}`,
      url: `https://picsum.photos/seed/${baseId + i + 20}/800/${i % 3 === 0 ? '1200' : '800'}`,
      isWide: i % 7 === 0,
      isTall: i % 5 === 0,
    }));
  };

  const portfolioItems = [
    { 
        id: 1, 
        type: 'photo', 
        title: 'Urban Symmetry', 
        category: 'Architecture', 
        img: 'https://images.unsplash.com/photo-1449156001437-dc909a1f3800?auto=format&fit=crop&q=80&w=800', 
        specs: 'Sony A7IV | 35mm f/1.4',
        media: generateAlbumMedia(100, 'photo')
    },
    { 
        id: 2, 
        type: 'video', 
        title: 'Midnight Motion', 
        category: 'Commercial', 
        img: 'https://images.unsplash.com/photo-1492691523567-6170f0295db1?auto=format&fit=crop&q=80&w=800', 
        specs: 'FX3 | 4K 60fps',
        media: generateAlbumMedia(200, 'video')
    },
    { 
        id: 3, 
        type: 'social', 
        title: 'Hype Reels', 
        category: 'Lifestyle', 
        img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800', 
        specs: '9:16 Optimized',
        media: generateAlbumMedia(300, 'social')
    },
    { 
        id: 4, 
        type: 'photo', 
        title: 'Silent Peak', 
        category: 'Nature', 
        img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', 
        specs: 'DJI Mavic 3 Pro',
        media: generateAlbumMedia(400, 'photo')
    },
    { 
        id: 5, 
        type: 'video', 
        title: 'Aura Skincare', 
        category: 'Brand Film', 
        img: 'https://images.unsplash.com/photo-1556229174-5e42a09e45af?auto=format&fit=crop&q=80&w=800', 
        specs: 'Red Komodo | Anamorphic',
        media: generateAlbumMedia(500, 'video')
    },
    { 
        id: 6, 
        type: 'social', 
        title: 'Viral Strategy', 
        category: 'Growth', 
        img: 'https://images.unsplash.com/photo-1557833166-26798038622c?auto=format&fit=crop&q=80&w=800', 
        specs: 'Engagement Focus',
        media: generateAlbumMedia(600, 'social')
    },
  ];

  const testimonials = [
    { name: "Sarah Jenkins", role: "Creative Director", text: "Vijay has an incredible eye for detail. The shots he delivered for our brand campaign were beyond our expectations." },
    { name: "Marcus Thorne", role: "Content Creator", text: "Working with VVS Photography changed our social game. The video quality is cinematic and perfectly tailored for our audience." },
    { name: "Elena Rossi", role: "Marketing Manager", text: "Professional, fast, and highly creative. Vijay knows exactly how to frame a story that resonates." }
  ];

  const filteredItems = portfolioItems;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedAlbum) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedAlbum]);

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] font-sans selection:bg-[#F5F5F5] selection:text-[#121212]">
      
      {/* --- ALBUM MODAL VIEW --- */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A] overflow-y-auto pt-20 md:pt-24 pb-12 px-4 md:px-6">
          <div className="fixed top-0 left-0 w-full bg-[#0A0A0A]/90 backdrop-blur-lg z-[110] py-4 md:py-6 px-4 md:px-6 border-b border-neutral-900 flex justify-between items-center">
            <div className="max-w-[70%]">
                <h2 className="text-lg md:text-xl font-bold uppercase tracking-tighter truncate">{selectedAlbum.title}</h2>
                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{selectedAlbum.category} / 15 FILES</p>
            </div>
            <button 
                onClick={() => setSelectedAlbum(null)}
                className="p-2 md:p-3 bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors"
                aria-label="Close Gallery"
            >
                <X size={20} className="md:w-6 md:h-6" />
            </button>
          </div>

          <div className="max-w-7xl mx-auto mt-8 md:mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] sm:auto-rows-[200px] md:auto-rows-[300px]">
              {selectedAlbum.media.map((item, idx) => (
                <div 
                  key={item.id}
                  className={`relative overflow-hidden group bg-neutral-900 border border-neutral-800
                    ${item.isWide ? 'col-span-2' : ''} 
                    ${item.isTall ? 'row-span-2' : ''}
                    ${idx === 0 ? 'col-span-2 row-span-2' : ''}
                  `}
                >
                  <img 
                    src={item.url} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 md:grayscale transition-all duration-700 active:grayscale-0" 
                    alt="Gallery item"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 p-2 backdrop-blur-sm rounded-sm">
                        <Maximize2 size={12} className="text-white md:w-4 md:h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 md:mt-24 text-center">
                <button 
                    onClick={() => setSelectedAlbum(null)}
                    className="w-full md:w-auto px-8 md:px-12 py-4 border border-neutral-800 hover:border-white transition-all text-[10px] md:text-xs font-mono uppercase tracking-[0.3em]"
                >
                    Return to Portfolio
                </button>
            </div>
          </div>
        </div>
      )}

      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#121212]/90 backdrop-blur-md py-4 border-b border-neutral-800' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 md:w-8 md:h-8 border border-[#F5F5F5] flex items-center justify-center rounded-full overflow-hidden shrink-0">
               <div className="w-3 h-3 md:w-4 md:h-4 border border-[#F5F5F5] rounded-full"></div>
            </div>
            <span className="text-base md:text-xl font-bold tracking-tighter uppercase whitespace-nowrap">VVS PHOTOGRAPHY</span>
          </div>
          
          <div className="hidden md:flex gap-10 lg:gap-12">
            <a href="#work" className="text-sm font-medium tracking-widest uppercase hover:text-neutral-400 transition-colors duration-300">Work</a>
            <a href="#services" className="text-sm font-medium tracking-widest uppercase hover:text-neutral-400 transition-colors duration-300">Services</a>
            <a href="#about" className="text-sm font-medium tracking-widest uppercase hover:text-neutral-400 transition-colors duration-300">About</a>
            <a href="#contact" className="text-sm font-medium tracking-widest uppercase hover:text-neutral-400 transition-colors duration-300">Contact</a>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#121212]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-2xl font-bold uppercase tracking-widest transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
           <a href="#work" onClick={() => setIsMenuOpen(false)} className="hover:text-neutral-500 transition-colors">Work</a>
           <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-neutral-500 transition-colors">Services</a>
           <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-neutral-500 transition-colors">About</a>
           <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-neutral-500 transition-colors">Contact</a>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center px-4 md:px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[15%] right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-neutral-700 rounded-full animate-pulse"></div>
          <div className="absolute top-6 left-6 w-12 h-12 md:w-20 md:h-20 border-t border-l border-neutral-500"></div>
          <div className="absolute bottom-6 right-6 w-12 h-12 md:w-20 md:h-20 border-b border-r border-neutral-500"></div>
        </div>

        {/* Increased pt-32 on mobile to clear the fixed navigation logo */}
        <div className="max-w-7xl mx-auto w-full relative z-10 pt-32 md:pt-0 pb-28 sm:pb-0">
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6 text-neutral-400 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em]">
            <span className="w-6 md:w-8 h-[1px] bg-neutral-600"></span>
            Vijay Visual Shots • Chennai
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-6 md:mb-8">
            DEFINING <br />
            <span className="text-neutral-500">VISUALS.</span>
          </h1>
          <p className="max-w-xl text-base md:text-lg lg:text-xl text-neutral-400 font-light leading-relaxed mb-8 md:mb-10">
            Professional photography, cinematic videography, and digital strategy by Vijay Kumar. Elevating your brand from the heart of Chennai.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#work" className="px-8 py-4 bg-[#F5F5F5] text-[#121212] font-semibold uppercase tracking-widest text-xs hover:bg-white transition-all text-center">
              Explore Albums
            </a>
            <a href="#contact" className="px-8 py-4 border border-neutral-700 hover:border-[#F5F5F5] font-semibold uppercase tracking-widest text-xs transition-all text-center">
              Let's Connect
            </a>
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-6 left-4 md:left-24 font-mono text-[9px] md:text-[10px] text-neutral-600 space-y-1">
          <p className="tracking-widest">SHUTTER SPEED 1/500 | ISO 200</p>
          <p className="tracking-widest">13.0827° N, 80.2707° E | CHENNAI</p>
        </div>
      </section>

      {/* --- PORTFOLIO / ALBUM ENTRY SECTION --- */}
      <section id="work" className="py-16 md:py-24 px-4 md:px-6 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase mb-4">The Portfolio</h2>
              <p className="text-neutral-500 text-sm md:text-base max-w-sm">Click an album to view the full media collection.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedAlbum(item)}
                className="group relative aspect-[4/5] overflow-hidden bg-neutral-900 cursor-pointer"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[40%] md:grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                  <div className="font-mono text-[9px] md:text-[10px] text-neutral-400 mb-2 uppercase tracking-widest">{item.specs}</div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase leading-tight mb-1">{item.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest">{item.category}</span>
                    <span className="text-[9px] md:text-[10px] border border-neutral-500 px-2 py-1 text-neutral-300 uppercase">View Album</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[10px] md:text-sm font-mono text-neutral-500 uppercase tracking-[0.4em] mb-4">Client Love</h2>
            <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter">Voices of Success</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 md:p-8 border border-neutral-800 bg-[#161616] flex flex-col justify-between">
                <div>
                  <Quote className="text-neutral-700 mb-4 md:mb-6" size={24} md:size={32} />
                  <p className="text-neutral-400 text-sm md:text-base italic mb-6 md:mb-8 leading-relaxed">"{t.text}"</p>
                </div>
                <div>
                  <div className="font-bold uppercase tracking-widest text-xs md:text-sm">{t.name}</div>
                  <div className="text-[10px] md:text-xs font-mono text-neutral-600 uppercase">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-16 md:py-24 px-4 md:px-6 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
             <h2 className="text-[10px] md:text-sm font-mono text-neutral-500 uppercase tracking-[0.4em] mb-4">What I Do</h2>
             <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">My Expertise</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div className="group p-6 md:p-8 border border-neutral-800 hover:border-neutral-500 transition-all duration-500 relative">
              <Camera size={36} md:size={40} strokeWidth={1} className="mb-6 md:mb-8 text-neutral-500 group-hover:text-white" />
              <h4 className="text-xl md:text-2xl font-bold uppercase mb-4">VVS Photography</h4>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-6 md:mb-8">High-end product and architecture photography based in Chennai with a minimal aesthetic.</p>
              <ul className="space-y-2 md:space-y-3 text-[12px] md:text-sm font-medium text-neutral-400">
                <li className="flex items-center gap-2"><ChevronRight size={14} /> Product Shoots</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} /> Post-Processing</li>
              </ul>
            </div>

            <div className="group p-6 md:p-8 border border-neutral-800 hover:border-neutral-500 transition-all duration-500 relative">
              <Video size={36} md:size={40} strokeWidth={1} className="mb-6 md:mb-8 text-neutral-500 group-hover:text-white" />
              <h4 className="text-xl md:text-2xl font-bold uppercase mb-4">Cinematic Video</h4>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-6 md:mb-8">Story-driven video production, from commercial ads to viral-ready short-form reels.</p>
              <ul className="space-y-2 md:space-y-3 text-[12px] md:text-sm font-medium text-neutral-400">
                <li className="flex items-center gap-2"><ChevronRight size={14} /> Brand Storytelling</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} /> Vertical Content</li>
              </ul>
            </div>

            <div className="group p-6 md:p-8 border border-neutral-800 hover:border-neutral-500 transition-all duration-500 relative">
              <Share2 size={36} md:size={40} strokeWidth={1} className="mb-6 md:mb-8 text-neutral-500 group-hover:text-white" />
              <h4 className="text-xl md:text-2xl font-bold uppercase mb-4">Social Growth</h4>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-6 md:mb-8">Strategic content curation and social media management to amplify your digital presence.</p>
              <ul className="space-y-2 md:space-y-3 text-[12px] md:text-sm font-medium text-neutral-400">
                <li className="flex items-center gap-2"><ChevronRight size={14} /> Content Strategy</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} /> Visual Branding</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-16 md:py-24 px-4 md:px-6 bg-neutral-100 text-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative aspect-square sm:aspect-video lg:aspect-square overflow-hidden bg-neutral-300">
            <img 
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=800" 
              alt="Vijay Kumar" 
              className="w-full h-full object-cover grayscale"
              loading="lazy"
            />
          </div>
          
          <div>
            <h2 className="text-[10px] md:text-sm font-mono text-neutral-400 uppercase tracking-[0.4em] mb-4 md:mb-6">The Artist</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-6 md:mb-8">
              I am <span className="text-neutral-400">Vijay Kumar.</span>
            </h3>
            <p className="text-base md:text-lg text-neutral-600 mb-8 leading-relaxed">
              Founder of Vijay Visual Shots, based out of Chennai. I blend technical camera precision with a deep understanding of modern digital marketing. My goal is to capture the unique identity of every subject, ensuring that the visual output is not just seen, but felt.
            </p>
            <div className="grid grid-cols-2 gap-6 md:gap-8 mb-4 md:mb-10 text-[#121212]">
              <div>
                <div className="text-2xl md:text-3xl font-bold">VVS</div>
                <div className="text-[10px] md:text-xs uppercase font-mono text-neutral-400 tracking-widest">Chennai Based</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">100%</div>
                <div className="text-[10px] md:text-xs uppercase font-mono text-neutral-400 tracking-widest">Client Focus</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-6 md:mb-8 leading-none">Contact <br />me.</h2>
              <p className="text-neutral-500 text-base md:text-lg mb-10 md:mb-12 max-w-sm">
                For inquiries, collaborations, or bookings for VVS Photography. Based in Chennai, available for travel.
              </p>
              
              <div className="space-y-5 md:space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-[#F5F5F5] group-hover:text-[#121212] transition-all">
                    <Mail size={16} md:size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-neutral-600 tracking-widest">Email Address</div>
                    <div className="text-base md:text-lg truncate max-w-[200px] sm:max-w-none">vijay@vjvisualshots.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-[#F5F5F5] group-hover:text-[#121212] transition-all">
                    <Phone size={16} md:size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-neutral-600 tracking-widest">Mobile</div>
                    <div className="text-base md:text-lg">7200233129</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-[#F5F5F5] group-hover:text-[#121212] transition-all">
                    <Instagram size={16} md:size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-neutral-600 tracking-widest">Instagram</div>
                    <div className="text-base md:text-lg">@vj.visual.shots</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-6 md:space-y-8 mt-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono text-neutral-600">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-neutral-800 py-2 md:py-3 focus:outline-none focus:border-neutral-400 transition-colors text-sm md:text-base rounded-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono text-neutral-600">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-neutral-800 py-2 md:py-3 focus:outline-none focus:border-neutral-400 transition-colors text-sm md:text-base rounded-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono text-neutral-600">Mobile Number</label>
                <input type="tel" className="w-full bg-transparent border-b border-neutral-800 py-2 md:py-3 focus:outline-none focus:border-neutral-400 transition-colors text-sm md:text-base placeholder:text-neutral-800 rounded-none" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono text-neutral-600">Project Goal</label>
                <textarea rows="4" className="w-full bg-transparent border-b border-neutral-800 py-2 md:py-3 focus:outline-none focus:border-neutral-400 transition-colors resize-none text-sm md:text-base rounded-none"></textarea>
              </div>
              <button className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 md:py-5 bg-[#F5F5F5] text-[#121212] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-white transition-all group">
                Send Request
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-10 md:py-12 px-4 md:px-6 border-t border-neutral-900 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-600">
           <div className="text-[9px] md:text-xs font-mono uppercase tracking-widest text-center md:text-left">
             ©️ 2026 Vijay Visual Shots • Chennai
           </div>
           
           <div className="flex flex-col items-center gap-3">
             <div className="flex items-center gap-8 mb-1">
               <a href="https://instagram.com/vj.visual.shots" target="_blank" rel="noreferrer" className="hover:text-white transition-colors p-1" aria-label="Instagram"><Instagram size={18} md:size={20} /></a>
               <a href="#" className="hover:text-white transition-colors p-1" aria-label="LinkedIn"><Linkedin size={18} md:size={20} /></a>
               <a href="#" className="hover:text-white transition-colors p-1" aria-label="Email"><Mail size={18} md:size={20} /></a>
             </div>
             <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-700 text-center">
               Designed and Developed by <a href="#" className="text-neutral-500 hover:text-white transition-colors border-b border-neutral-800">arcade</a>
             </div>
           </div>

           <div className="text-[9px] md:text-xs font-mono uppercase tracking-widest text-center md:text-right hidden sm:block">
             Frame the future.
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
