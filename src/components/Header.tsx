import { useState, useEffect } from 'react'
import { Navigate, Page } from '../types'

interface HeaderProps {
  navigate: Navigate
  currentPage: Page
  favorites: number[]
  isLoggedIn: boolean
  user: { name: string; avatar: string; phone: string } | null
  onOpenAuth: () => void
  onLogout: () => void
}

export default function Header({
  navigate,
  currentPage,
  favorites,
  isLoggedIn,
  user,
  onOpenAuth,
  onLogout,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      id="header-section"
      data-name="Header Main Section"
      className="fixed top-3 inset-x-0 z-50 px-3 sm:px-6 transition-all duration-300 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto pointer-events-auto">
        {/* Floating Glass Pill Navbar */}
        <div
          id="floating-navbar-container"
          data-name="Floating Navbar Container"
          className={`px-3.5 sm:px-6 py-2 rounded-2xl md:rounded-full border transition-all duration-300 flex items-center justify-between gap-2 sm:gap-4 shadow-2xl ${
            scrolled
              ? 'glass-bright bg-obsidian/95 border-white/20 shadow-brand/20'
              : 'bg-surface/90 backdrop-blur-2xl border-white/12 shadow-black/40'
          }`}
        >
          {/* Logo (Right in RTL) */}
          <button
            id="header-logo"
            data-name="Header Logo"
            onClick={() => navigate('home')}
            className="flex items-center gap-2 shrink-0 group whitespace-nowrap"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-brand via-brand-light to-accent flex items-center justify-center glow-brand transition-all group-hover:scale-105 shadow-md">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 text-white" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black text-white tracking-tight leading-none">GAMA</span>
              <span className="text-[10px] font-bold text-slate-400 border-r border-white/15 pr-2 hidden sm:inline">منصة الألعاب</span>
            </div>
          </button>

          {/* Desktop Links (Hidden on Mobile) */}
          <nav id="header-nav-links" data-name="Header Nav Links" className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-300">
            <button
              onClick={() => navigate('home')}
              className={`transition-colors hover:text-white ${currentPage === 'home' ? 'text-accent font-black' : ''}`}
            >
              الرئيسية
            </button>

            <button
              onClick={() => navigate('browse')}
              className={`transition-colors hover:text-white ${currentPage === 'browse' ? 'text-accent font-black' : ''}`}
            >
              المنتجات
            </button>

            <button
              onClick={() => navigate('browse')}
              className="transition-colors hover:text-white"
            >
              الفئات
            </button>

            {isLoggedIn && (
              <button
                onClick={() => navigate('tracking')}
                className={`transition-colors hover:text-white ${currentPage === 'tracking' ? 'text-accent font-black' : ''}`}
              >
                تتبع الطلب
              </button>
            )}

            <button
              onClick={() => {
                navigate('home')
                setTimeout(() => {
                  document.getElementById('about-us-section')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
              className="transition-colors hover:text-white"
            >
              من نحن
            </button>
          </nav>

          {/* Left Side Actions (User Profile, Cart, Favorites, Mobile Menu) */}
          <div id="header-user-actions" data-name="User Actions" className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 relative">
            
            {/* Favorites & Cart Icons — Shown when Logged In */}
            {isLoggedIn && (
              <>
                <button
                  onClick={() => navigate('favorites')}
                  className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all shrink-0"
                  title="المفضلة"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand text-white text-[9px] font-bold flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => navigate('checkout')}
                  className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all shrink-0"
                  title="السلة"
                >
                  <span className="text-[11px] sm:text-xs">🛒</span>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent text-obsidian text-[9px] font-black flex items-center justify-center">
                    1
                  </span>
                </button>
              </>
            )}

            {/* CONDITIONAL USER BUTTON: Avatar only on tiny screens, avatar + name on sm+ */}
            {isLoggedIn && user ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-1.5 p-1 sm:px-3 sm:py-1 bg-white/8 hover:bg-white/12 border border-white/15 rounded-full transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-brand/50 shrink-0"
                  />
                  <span className="text-xs font-bold text-white whitespace-nowrap hidden sm:inline">{user.name}</span>
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {userDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-surface/95 border border-white/15 rounded-2xl p-2 shadow-2xl backdrop-blur-xl space-y-1 animate-fade-in text-xs font-bold z-50">
                    <div className="px-3 py-1.5 text-slate-400 text-[11px] border-b border-white/10 sm:hidden">
                      مرحباً، {user.name} 👋
                    </div>
                    <button
                      onClick={() => {
                        navigate('dashboard')
                        setUserDropdown(false)
                      }}
                      className="w-full text-right px-3 py-2 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white flex items-center gap-2"
                    >
                      <span>👤</span> لوحة التحكم وحسابي
                    </button>
                    <button
                      onClick={() => {
                        navigate('sell')
                        setUserDropdown(false)
                      }}
                      className="w-full text-right px-3 py-2 rounded-xl text-brand-light hover:bg-brand/20 flex items-center gap-2"
                    >
                      <span>➕</span> بيع منتج جديد
                    </button>
                    <button
                      onClick={() => {
                        onLogout()
                        setUserDropdown(false)
                      }}
                      className="w-full text-right px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 border-t border-white/10"
                    >
                      <span>🚪</span> تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Metallic "تسجيل الدخول" Button */
              <button
                id="header-login-btn"
                data-name="Header Login Button"
                onClick={onOpenAuth}
                className="px-3.5 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-white via-slate-100 to-slate-200 text-obsidian font-black text-[11px] sm:text-xs rounded-full shadow-lg hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center gap-1 border border-white/50 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>تسجيل الدخول</span>
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-obsidian transform -rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            )}

            {/* Mobile Menu Hamburger (Properly Separated) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 lg:hidden shrink-0 transition-all border border-white/10"
              title="القائمة"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="mt-2 glass-bright rounded-2xl p-4 space-y-3 bg-obsidian/95 border border-white/15 backdrop-blur-2xl shadow-2xl lg:hidden animate-fade-in-up">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن لعبة، جهاز، أو ملحق..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate('browse', { query: searchVal })
                    setMenuOpen(false)
                  }
                }}
                className="w-full px-4 py-2 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/60"
              />
              <button
                onClick={() => {
                  navigate('browse', { query: searchVal })
                  setMenuOpen(false)
                }}
                className="absolute left-2 top-1.5 text-xs text-accent font-bold px-2 py-0.5 rounded-md bg-white/10"
              >
                بحث
              </button>
            </div>

            <div className="flex flex-col gap-2.5 text-xs font-bold text-slate-300 pt-1 border-t border-white/10">
              <button
                onClick={() => {
                  navigate('home')
                  setMenuOpen(false)
                }}
                className="text-right py-1.5 hover:text-accent transition-colors"
              >
                الرئيسية
              </button>
              <button
                onClick={() => {
                  navigate('browse')
                  setMenuOpen(false)
                }}
                className="text-right py-1.5 hover:text-accent transition-colors"
              >
                المنتجات والفئات
              </button>

              {isLoggedIn && (
                <button
                  onClick={() => {
                    navigate('tracking')
                    setMenuOpen(false)
                  }}
                  className="text-right py-1.5 hover:text-accent transition-colors"
                >
                  تتبع الطلب
                </button>
              )}

              {isLoggedIn && user ? (
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <img src={user.avatar} className="w-6 h-6 rounded-full border border-brand/50" />
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      navigate('dashboard')
                      setMenuOpen(false)
                    }}
                    className="w-full py-2 bg-brand text-white font-bold rounded-xl text-center"
                  >
                    لوحة التحكم وحسابي
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth()
                    setMenuOpen(false)
                  }}
                  className="py-2.5 bg-gradient-to-r from-white to-slate-200 text-obsidian font-black rounded-xl text-center shadow-lg"
                >
                  تسجيل الدخول
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
