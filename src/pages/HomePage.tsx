import { useEffect, useRef, useState } from 'react'
import { Navigate } from '../types'
import { products, categories } from '../data/mock'
import ProductCard from '../components/ProductCard'
import Gaming3DCanvas from '../components/Gaming3DCanvas'
import FancyFeatureSlider from '../components/FancyFeatureSlider'
import ScrollReveal from '../components/ScrollReveal'

function AutoPlayVideo({ src, className }: { src: string; className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.defaultMuted = true
    video.muted = true
    video.playsInline = true
    video.play().catch(() => {})
  }, [src])

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

interface HomePageProps {
  navigate: Navigate
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

export default function HomePage({ navigate, favorites, onToggleFavorite }: HomePageProps) {
  const featured = products.filter((p) => p.isFeatured)

  return (
    <div id="home-page-container" data-name="Home Page Container" className="min-h-screen bg-obsidian pb-16 md:pb-0 overflow-x-hidden">

      {/* ── 1. HERO ── */}
      <section id="hero-section" data-name="Hero Section" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Interactive 3D WebGL Canvas Shapes */}
        <Gaming3DCanvas />

        {/* Background image & gradient layers */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/pexels-didsss-1367000.jpg"
            alt="Gaming Controller Background"
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/70 to-obsidian" />
          <div className="absolute inset-0 dot-grid opacity-30" />
        </div>

        {/* Ambient glow blobs */}
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-brand/20 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />

        <div id="hero-main-container" data-name="Hero Content Container" className="relative z-10 max-w-7xl mx-auto px-4 pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            {/* Text */}
            <div id="hero-text-block" data-name="Hero Text Block" className="space-y-7 animate-fade-in-up">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 glass rounded-full text-sm font-medium text-slate-300 hover-scale cursor-default animate-border-glow">
                <span className="relative w-2 h-2 rounded-full bg-success animate-glow-pulse flex-shrink-0 pulse-ring" />
                المنصة الليبية الأولى لتداول الألعاب
                <span className="w-px h-4 bg-white/15" />
                <span className="text-accent font-bold text-xs">+800 صفقة</span>
              </div>

              <div>
                <h1 className="text-5xl md:text-6xl font-black leading-[1.05] text-white">
                  بيع واشتري
                  <br />
                  <span className="text-shine">ألعابك بثقة</span>
                </h1>
                <p
                  className="mt-5 text-slate-100 text-lg leading-relaxed max-w-md p-4 rounded-2xl backdrop-blur-md"
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.1)' }}
                >
                  سوق ليبي موثوق لبيع وشراء ألعاب وأجهزة وملحقات الـGaming المستعملة — <span className="text-cyan-400 font-semibold">مع حماية كاملة للصفقة.</span>
                </p>
              </div>

              <div id="hero-buttons-group" data-name="Hero Action Buttons" className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('browse')}
                  className="px-7 py-3.5 bg-brand text-white font-bold rounded-2xl hover:bg-brand-light hover:scale-105 glow-brand transition-all duration-300 text-sm whitespace-nowrap shrink-0"
                >
                  استكشف المنتجات
                </button>
                <button
                  onClick={() => navigate('sell')}
                  className="px-7 py-3.5 glass border border-white/15 text-white font-bold rounded-2xl hover:bg-white/8 hover:border-accent/40 hover:scale-105 transition-all duration-300 text-sm whitespace-nowrap shrink-0"
                >
                  بيع منتجك
                </button>
              </div>

              {/* Mini stats */}
              <div id="hero-stats-group" data-name="Hero Stats Group" className="flex gap-8 pt-2">
                {[
                  { n: '+500', l: 'منتج متاح' },
                  { n: '+1.2K', l: 'مستخدم' },
                  { n: '+800', l: 'صفقة مكتملة' },
                ].map((s) => (
                  <div key={s.l} className="hover-scale cursor-default">
                    <div className="text-2xl font-black text-accent whitespace-nowrap" style={{ textShadow: '0 0 20px rgba(0,240,255,0.3)' }}>{s.n}</div>
                    <div className="text-slate-400 text-xs mt-0.5 whitespace-nowrap">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual: Dedicated 3D PS5 DualSense Showcase Area */}
            <div id="hero-visual-cards-group" data-name="Hero Product Cards Group" className="hidden lg:flex flex-col justify-end gap-5 w-full max-w-lg min-h-[420px] mx-auto animate-fade-in-right relative">
              {/* Trust Badges Floating Row at Bottom */}
              <div id="hero-trust-badges-row" data-name="Trust Badges Row" className="grid grid-cols-2 gap-4 z-10 mt-auto">
                <div className="glass-bright rounded-2xl p-3.5 flex items-center gap-3 hover-lift group border border-white/10 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                  </div>
                  <div>
                    <div className="text-white text-xs font-bold whitespace-nowrap">صفقة آمنة 100%</div>
                    <div className="text-slate-400 text-[10px] whitespace-nowrap">محمية بالكامل</div>
                  </div>
                </div>

                <div className="glass-bright rounded-2xl p-3.5 flex items-center gap-3 hover-lift group border border-white/10 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                  </div>
                  <div>
                    <div className="text-white text-xs font-bold whitespace-nowrap">توصيل سريع</div>
                    <div className="text-slate-400 text-[10px] whitespace-nowrap">خلال 48 ساعة</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST CARDS ── */}
      <section id="trust-cards-section" data-name="Trust Features Section" className="py-16 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4">
          <div id="trust-cards-grid" data-name="Trust Cards Grid" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: 'حماية الصفقة',
                desc: 'ندير العملية بين البائع والمشتري حتى إتمامها.',
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                ),
                title: 'افحص قبل التأكيد',
                desc: 'استلم وجرب المنتج قبل الموافقة على إتمام الصفقة.',
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ),
                title: 'استلم من منطقتك',
                desc: 'توصيل مباشر أو تسليم يداً بيد داخل مدينتك.',
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: 'دعم فني 24/7',
                desc: 'فريقنا جاهز للمساعدة وحل أي نزاع فوراً.',
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} animation="fade-up" delay={i * 120}>
                <div className="gradient-border-card animate-border rounded-2xl p-5 hover-lift hover-glow-border group h-full">
                  <div className="icon-target w-11 h-11 rounded-xl flex items-center justify-center mb-4 border transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 bg-accent/10 border-accent/30 text-accent shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-white text-sm whitespace-nowrap">{card.title}</h3>
                  <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BENTO CATEGORIES ── */}
      <section id="categories-bento-section" data-name="Bento Categories Section" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-white whitespace-nowrap">تصفح الفئات</h2>
                <p className="text-slate-400 text-sm mt-1 whitespace-nowrap">اختر الفئة التي تبحث عنها</p>
              </div>
              <button onClick={() => navigate('browse')} className="text-accent text-sm font-semibold hover:text-accent-dim flex items-center gap-1 transition-colors whitespace-nowrap">
                عرض الكل
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="zoom-in" delay={150}>
            <div id="categories-grid" data-name="Bento Categories Grid" className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                id="category-large-ps5"
                data-name="Featured Category Card - PS5"
                className="category-card group relative min-h-[280px] rounded-3xl overflow-hidden cursor-pointer col-span-2 row-span-2 flex flex-col justify-end p-5 hover-glow-border"
                onClick={() => navigate('browse', { category: 'ps5-games' })}
              >
                <img src={categories[0].image} alt={categories[0].label} className="category-card-img absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tl from-brand/80 via-brand/30 to-transparent" />
                <div className="relative z-10">
                  <div className="text-3xl mb-1">{categories[0].icon}</div>
                  <div className="text-white font-black text-lg whitespace-nowrap">{categories[0].label}</div>
                  <div className="text-white/70 text-xs mt-0.5 whitespace-nowrap">{categories[0].count} منتج متاح</div>
                </div>
              </div>

              {categories.slice(1, 7).map((cat) => (
                <div
                  key={cat.id}
                  id={`category-card-${cat.id}`}
                  data-name={`Category Card - ${cat.label}`}
                  className="category-card group relative min-h-[135px] rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-end p-3.5 hover-lift"
                  onClick={() => navigate('browse', { category: cat.id })}
                >
                  <img src={cat.image} alt={cat.label} className="category-card-img absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="relative z-10">
                    <div className="text-xl mb-0.5">{cat.icon}</div>
                    <div className="text-white font-bold text-xs whitespace-nowrap">{cat.label}</div>
                    {'count' in cat && <div className="text-white/60 text-[10px] whitespace-nowrap">{cat.count} منتج</div>}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 4. FEATURED PRODUCTS ── */}
      <section id="featured-products-section" data-name="Featured Products Section" className="py-16 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-white whitespace-nowrap">منتجات مميزة</h2>
                <p className="text-slate-400 text-sm mt-1 whitespace-nowrap">أفضل الصفقات المتاحة الآن</p>
              </div>
              <button onClick={() => navigate('browse')} className="text-accent text-sm font-semibold hover:text-accent-dim flex items-center gap-1 transition-colors whitespace-nowrap">
                عرض الكل
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
          </ScrollReveal>

          <div id="featured-products-grid" data-name="Featured Products Grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featured.map((product, i) => (
              <ScrollReveal key={product.id} animation="fade-up" delay={i * 90}>
                <ProductCard
                  product={product}
                  navigate={navigate}
                  isFavorited={favorites.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ABOUT US SECTION WITH FANCY TESTIMONIALS SLIDER ── */}
      <section id="about-us-section" data-name="About Us Main Section" className="py-20 px-4 max-w-7xl mx-auto border-t border-white/8 space-y-16">

        {/* Title Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/8 pb-8">
            <div>
              <span className="text-xs font-bold text-accent tracking-wider uppercase block whitespace-nowrap">من نحن (About GAMA)</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-1">المنصة الليبية الأولى لتداول الجيمنج والكترونيات</h2>
              <p className="text-slate-300 text-xs mt-2 max-w-xl leading-relaxed">
                تأسست GAMA لتكون البيئة الآمنة والموثوقة لكل الجيمرز في ليبيا لشراء وبيع وحماية صفقات الألعاب والأجهزة المستعملة والجديدة.
              </p>
            </div>

            <div className="glass px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center font-black text-white text-lg">G</div>
              <div>
                <div className="font-black text-white text-base leading-none">GAMA</div>
                <div className="text-[10px] text-accent font-bold">Gaming Marketplace</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3-Image Collage (1 Main + 2 Stacked Right) */}
        <ScrollReveal animation="zoom-in" delay={150}>
          <div id="about-images-collage" data-name="About Images Collage Grid" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 rounded-3xl overflow-hidden bg-surface-2/80 border border-white/10 aspect-[16/9] group relative">
              <AutoPlayVideo
                src="/gama-community.mp4"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 right-6 left-6 text-white pointer-events-none">
                <span className="text-xs font-bold text-accent uppercase tracking-wider block">مجتمع الجيمرز في ليبيا</span>
                <h3 className="text-2xl font-black mt-1">بيئة آمنة للتداول والتواصل الفعال</h3>
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="rounded-3xl overflow-hidden bg-surface-2/80 border border-white/10 aspect-[4/3] group relative">
                <AutoPlayVideo
                  src="/gear-testing.mp4"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="rounded-3xl overflow-hidden bg-surface-2/80 border border-white/10 aspect-[4/3] group relative">
                <AutoPlayVideo
                  src="/gaming-showcase.mp4"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Circular Quote Banner */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div id="about-quote-box" data-name="About Quote Container" className="glass rounded-3xl p-8 text-center border border-brand/30 space-y-4 max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-brand text-white text-2xl font-black flex items-center justify-center mx-auto shadow-lg glow-brand">
              💬
            </div>
            <h3 className="text-xl font-black text-white leading-snug">
              "We serve gamers & buyers across Libya with the best gaming gear & protected escrow deals."
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              نحن نخدم مجتمع الجيمرز والمشترين في كل المدن الليبية بتوفير أفضل العروض وحماية الصفقات 100%.
            </p>
          </div>
        </ScrollReveal>

        {/* Video / Large Featured Workspace Banner with Play Button */}
        <ScrollReveal animation="scale-up" delay={250}>
          <div id="about-video-banner" data-name="About Video Banner" className="relative rounded-3xl overflow-hidden glass border border-white/10 aspect-[21/9] flex items-center justify-center group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=500&fit=crop&auto=format"
              alt="Gaming Workspace Video"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-brand text-white text-3xl font-black flex items-center justify-center shadow-2xl glow-brand group-hover:scale-110 transition-transform">
                ▶
              </div>
              <span className="text-white font-extrabold text-sm tracking-wider uppercase whitespace-nowrap">شاهد فيديو التعريف بالمنصة</span>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Company Metric Cards ("OUR COMPANY STATS") */}
        <div id="about-stats-grid" data-name="About Company Stats Grid" className="space-y-6 pt-6">
          <ScrollReveal animation="fade-up">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block whitespace-nowrap">OUR COMPANY STATS</span>
              <h3 className="text-2xl font-black text-white whitespace-nowrap">مزايا وركائز المنصة الأساسية</h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                // TRUSTED PRODUCT - Verified Ribbon Badge with Checkmark
                icon: (
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                ),
                title: 'TRUSTED PRODUCT',
                desc: 'أجهزة وصفقات مفحوصة ومطابقة للوصف 100%',
              },
              {
                // SECURE ESCROW - Padlock Security
                icon: (
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                ),
                title: 'SECURE ESCROW',
                desc: 'حماية كاملة للمبلغ حتى معاينة وتجربة الشحنة',
              },
              {
                // SUPPORT 24/7 - Direct Phone Support
                icon: (
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                ),
                title: 'SUPPORT 24/7',
                desc: 'دعم فني وتواصل مباشر مع العميل والبائع',
              },
              {
                // FAST RESPONSE - Lightning Speed Bolt
                icon: (
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: 'FAST RESPONSE',
                desc: 'سرعة توصيل واستجابة فورية لكافة مدن ليبيا',
              },
            ].map((stat, i) => (
              <ScrollReveal key={stat.title} animation="fade-up" delay={i * 120}>
                <div className="gradient-border-card animate-border rounded-2xl p-5 text-center space-y-3 hover-lift hover-glow-border group h-full">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 text-accent shadow-[0_0_15px_rgba(0,240,255,0.15)] flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                    {stat.icon}
                  </div>
                  <div className="font-extrabold text-white text-xs tracking-wider uppercase whitespace-nowrap">{stat.title}</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{stat.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* FANCY INTERACTIVE TESTIMONIAL / FEATURE SLIDER */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="pt-8 border-t border-white/10">
            <FancyFeatureSlider />
          </div>
        </ScrollReveal>

        {/* Brand Partners Row */}
        <ScrollReveal animation="fade-up" delay={250}>
          <div className="glass rounded-3xl p-6 border border-white/8 text-center space-y-4">
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              120+ Our partnership from best brands around Libya & world
            </div>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-70">
              {['PlayStation', 'Xbox', 'Nintendo', 'Razer', 'Logitech', 'ASUS ROG', 'Alienware'].map((brand) => (
                <span key={brand} className="text-white font-black text-sm uppercase tracking-wider hover:text-accent hover:scale-110 transition-all duration-300 cursor-pointer whitespace-nowrap">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </section>

    </div>
  )
}
