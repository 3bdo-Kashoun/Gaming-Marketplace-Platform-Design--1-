import { useState } from 'react'
import { Navigate, Product } from '../types'
import { products } from '../data/mock'
import ProductCard from '../components/ProductCard'

interface ProductPageProps {
  navigate: Navigate
  data?: { product?: Product }
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

export default function ProductPage({ navigate, data, favorites, onToggleFavorite }: ProductPageProps) {
  const product = data?.product || products[0]
  const images = product.images || [product.image, 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&h=300&fit=crop&auto=format', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=300&fit=crop&auto=format', 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=500&h=300&fit=crop&auto=format']

  const [activeImg, setActiveImg] = useState(0)
  const [selectedOption, setSelectedOption] = useState('28 inch')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'accessories' | 'specifications' | 'reviews'>('description')

  // Accessories bundle selection state
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([1, 2])

  const toggleAccessory = (id: number) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const isFav = favorites.includes(product.id)

  return (
    <div id="product-detail-page-container" data-name="Product Detail Page Container" className="min-h-screen bg-obsidian pt-24 md:pt-28 pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">

        {/* ── BREADCRUMB NAV ── */}
        <nav id="product-breadcrumb" data-name="Product Breadcrumb Navigation" className="flex items-center gap-2 text-xs text-slate-400 whitespace-nowrap overflow-x-auto">
          <button onClick={() => navigate('home')} className="hover:text-accent transition-colors">الرئيسية</button>
          <span>›</span>
          <button onClick={() => navigate('browse')} className="hover:text-accent transition-colors">تكنولوجيا وشاشات</button>
          <span>›</span>
          <span className="text-white font-bold truncate max-w-xs">{product.title}</span>
        </nav>

        {/* ── TOP MAIN PRODUCT DISPLAY GRID (IMAGE 3 & 4 TOP LAYOUT) ── */}
        <div id="product-main-grid" data-name="Product Main Display Grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: GALLERY & THUMBNAILS (lg:col-span-5) */}
          <div id="product-gallery-col" data-name="Product Gallery Column" className="lg:col-span-5 space-y-4">
            
            {/* Main Picture Viewer Box */}
            <div className="relative rounded-3xl overflow-hidden glass aspect-[4/3] border border-white/10 flex items-center justify-center p-4">
              <img src={images[activeImg]} alt={product.title} className="w-full h-full object-cover rounded-2xl" />
              
              <button
                className="heart-btn absolute top-4 left-4 w-10 h-10 rounded-2xl glass flex items-center justify-center border border-white/15 hover:bg-white/20 transition-colors"
                onClick={() => onToggleFavorite(product.id)}
              >
                <svg className={`w-5 h-5 transition-colors ${isFav ? 'text-red-400 fill-red-400' : 'text-slate-300'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>

              <span className="absolute top-4 right-4 text-xs font-extrabold px-3 py-1 rounded-full bg-brand text-white shadow-lg glow-brand whitespace-nowrap">
                تخفيض 20%
              </span>
            </div>

            {/* Thumbnail selector row */}
            <div id="gallery-thumbnails-row" data-name="Gallery Thumbnails Row" className="flex gap-3 overflow-x-auto no-scrollbar py-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImg === i ? 'border-accent glow-card' : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO & PURCHASE PANEL (lg:col-span-7) */}
          <div id="product-purchase-info-col" data-name="Product Info and Purchase Panel" className="lg:col-span-7 space-y-5">
            
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-xs font-bold text-accent tracking-wider uppercase whitespace-nowrap">
                  SKU: EC5840924 | {product.categoryLabel}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 whitespace-nowrap">
                  ✓ متوفر في المخزون
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                {product.title} - شاشة جيمنج عالية الجودة
              </h1>

              {/* Ratings and Views line */}
              <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap border-y border-white/6 py-3">
                <div className="flex items-center gap-1 text-amber-400 whitespace-nowrap">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span className="font-extrabold text-white text-sm mr-1">4.0</span>
                  <span className="text-slate-400 text-xs">(52 تقييم)</span>
                </div>
                <span className="text-white/20">|</span>
                <span className="whitespace-nowrap">🛍️ 2,450 صفقة ناجحة</span>
                <span className="text-white/20">|</span>
                <span className="whitespace-nowrap">👁️ 1,287 مشاهدة</span>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 whitespace-nowrap pt-1">
                <span className="text-4xl font-black text-accent" style={{ textShadow: '0 0 20px rgba(0,240,255,0.4)' }}>
                  {product.price}
                </span>
                <span className="text-lg font-bold text-accent">د.ل</span>
                <span className="text-sm text-slate-400 line-through">
                  {product.price + 350} د.ل
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold whitespace-nowrap">
                  وفّر 350 د.ل
                </span>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-1.5 text-xs text-slate-300 border-t border-white/6 pt-3">
                <li className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-accent font-bold">✓</span> توصيل آمن ومباشر لكافة المدن في ليبيا
                </li>
                <li className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-accent font-bold">✓</span> ضمان فحص وتجربة شاملة للمنتج
                </li>
                <li className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-accent font-bold">✓</span> شاشة IPS بمعدل تحديث 144Hz وزاوية رؤية واسعة
                </li>
              </ul>

              {/* Variant option selection (e.g. Screen size / Storage) */}
              <div className="space-y-2 border-t border-white/6 pt-3">
                <span className="text-xs font-bold text-slate-400 block whitespace-nowrap">حجم الشاشة (Screen Size):</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {['24 inch', '28 inch', '32 inch', '42 inch'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedOption(size)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        selectedOption === size
                          ? 'bg-brand text-white border border-brand-light shadow-lg glow-brand'
                          : 'glass text-slate-300 border border-white/10 hover:border-white/25'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Action Buttons */}
              <div className="flex items-center gap-4 pt-3 flex-wrap">
                {/* Quantity Box */}
                <div className="flex items-center glass rounded-xl border border-white/15 p-1 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-white font-black hover:bg-white/10 rounded-lg"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-black text-white text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-white font-black hover:bg-white/10 rounded-lg"
                  >
                    +
                  </button>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={() => navigate('checkout', { product })}
                  className="flex-1 py-3.5 px-6 bg-brand hover:bg-brand-light text-white font-extrabold text-sm rounded-xl transition-all shadow-lg glow-brand whitespace-nowrap shrink-0 text-center"
                >
                  شراء الآن
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={() => navigate('checkout', { product })}
                  className="flex-1 py-3.5 px-6 glass border border-brand/40 text-brand-light font-extrabold text-sm rounded-xl hover:bg-brand hover:text-white transition-all whitespace-nowrap shrink-0 text-center"
                >
                  إضافة إلى السلة 🛒
                </button>
              </div>
            </div>

            {/* Protection Box */}
            <div className="glass rounded-2xl p-4 border border-accent/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-bold text-xl shrink-0">
                🛡️
              </div>
              <div>
                <div className="font-bold text-white text-xs whitespace-nowrap">صفقة آمنة ومحمية بضمان GAMA</div>
                <div className="text-slate-400 text-[10px] whitespace-nowrap">يتم حفظ المبلغ حتى تستلم وتفحص الشاشة بنفسك</div>
              </div>
            </div>

          </div>

        </div>

        {/* ── LOWER TABS SECTION (RATING SUMMARY LEFT + DETAILED TABS RIGHT - IMAGE 3, 4, 5) ── */}
        <div id="product-tabs-section" data-name="Product Tabs Section" className="pt-6">
          
          {/* Tab Navigation Header */}
          <div id="product-tabs-nav" data-name="Product Tabs Header" className="flex items-center gap-3 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
            {[
              { id: 'description', label: 'الوصف والمواصفات (Description)' },
              { id: 'accessories', label: 'حزمة الملحقات (Accessories Bundle)' },
              { id: 'specifications', label: 'المواصفات الفنية (Specifications)' },
              { id: 'reviews', label: 'المراجعات والتقييمات (Reviews 52)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-brand text-white shadow-lg glow-brand'
                    : 'glass text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Grid (Left Rating Summary + Right Tab Details) */}
          <div id="tabs-content-grid" data-name="Tabs Content Grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
            
            {/* Left Rating Summary Card (4.0 Summary with Star bars - Image 3, 4, 5) */}
            <div id="rating-summary-card" data-name="Rating Summary Card" className="lg:col-span-4 glass rounded-3xl p-6 border border-white/10 space-y-4">
              <div className="text-center space-y-2 border-b border-white/8 pb-4">
                <div className="text-5xl font-black text-white">4.0</div>
                <div className="text-amber-400 text-lg">⭐⭐⭐⭐⭐</div>
                <div className="text-slate-400 text-xs font-bold">بناءً على 52 تقييم موثق</div>
              </div>

              {/* Star distribution bars */}
              <div className="space-y-2 text-xs">
                {[
                  { star: '5 ★', pct: '75%', count: '39' },
                  { star: '4 ★', pct: '18%', count: '9' },
                  { star: '3 ★', pct: '5%', count: '3' },
                  { star: '2 ★', pct: '2%', count: '1' },
                  { star: '1 ★', pct: '0%', count: '0' },
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-2 text-slate-300">
                    <span className="w-8 font-bold text-slate-400 shrink-0 whitespace-nowrap">{row.star}</span>
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: row.pct }} />
                    </div>
                    <span className="w-6 text-left font-bold text-slate-400 text-[10px] shrink-0 whitespace-nowrap">{row.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Tab Content Block (lg:col-span-8) */}
            <div id="tab-content-block" data-name="Tab Main Content Block" className="lg:col-span-8 glass rounded-3xl p-6 border border-white/10">
              
              {/* TAB 1: DESCRIPTION */}
              {activeTab === 'description' && (
                <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
                  <h3 className="text-lg font-black text-white border-b border-white/8 pb-2">
                    تفاصيل ومميزات المنتج
                  </h3>
                  <p>
                    تتميز هذه الشاشة بدقة عرض استثنائية ونقاء ألوان عالي يمنحك تجربة جيمنج ورؤية فائقة الواقعية. تم اختبار الشاشة والتأكد من خلوها من أي عيوب مصنعية أو بكسلات ميتة.
                  </p>
                  
                  {/* Banner Image in description matching screenshot */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/10">
                    <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop&auto=format" alt="Home Office Setup" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent flex items-end p-6">
                      <h4 className="text-xl font-black text-white">Your New Gaming Office Setup</h4>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ACCESSORIES BUNDLE (MATCHING IMAGE 4) */}
              {activeTab === 'accessories' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-black text-white border-b border-white/8 pb-2">
                    اختر الملحقات المقترحة (Choose Accessories Bundle)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 1, name: 'Smart Remote Control', price: '45 د.ل', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200&h=150&fit=crop&auto=format' },
                      { id: 2, name: 'Dual Sound Speakers', price: '115 د.ل', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=150&fit=crop&auto=format' },
                      { id: 3, name: 'Heavy Duty Desk Stand', price: '85 د.ل', img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&h=150&fit=crop&auto=format' },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleAccessory(item.id)}
                        className={`glass rounded-2xl p-3 border transition-all cursor-pointer flex flex-col justify-between ${
                          selectedAccessories.includes(item.id)
                            ? 'border-accent bg-brand/10'
                            : 'border-white/8 opacity-70'
                        }`}
                      >
                        <img src={item.img} alt={item.name} className="w-full h-24 object-cover rounded-xl mb-2" />
                        <div>
                          <div className="font-bold text-white text-xs line-clamp-1">{item.name}</div>
                          <div className="text-accent font-black text-xs mt-1">{item.price}</div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/6 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">إضافة للحزمة</span>
                          <input type="checkbox" checked={selectedAccessories.includes(item.id)} readOnly className="accent-accent" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SPECIFICATIONS */}
              {activeTab === 'specifications' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-white border-b border-white/8 pb-2">
                    المواصفات التقنية
                  </h3>
                  <div className="divide-y divide-white/6 text-xs">
                    {[
                      { k: 'حجم الشاشة', v: '28 بوصة IPS' },
                      { k: 'معدل التحديث', v: '144Hz' },
                      { k: 'زمن الاستجابة', v: '1ms Response Time' },
                      { k: 'دقة العرض', v: '4K UHD (3840 x 2160)' },
                      { k: 'المنافذ', v: '2x HDMI 2.1, 1x DisplayPort 1.4' },
                    ].map((spec) => (
                      <div key={spec.k} className="py-2.5 flex items-center justify-between">
                        <span className="text-slate-400 font-bold whitespace-nowrap">{spec.k}</span>
                        <span className="text-white font-medium whitespace-nowrap">{spec.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: REVIEWS (MATCHING IMAGE 5) */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-black text-white border-b border-white/8 pb-2">
                    مراجعات وآراء المشترين (52)
                  </h3>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {[
                      { name: 'محمد الفيتوري', rating: '5.0', date: 'منذ 3 أيام', comment: 'شاشة ممتازة جداً وتغليف ممتاز والتوصيل وصلني خلال 24 ساعة لمدينة طرابلس.' },
                      { name: 'أحمد المصراتي', rating: '4.5', date: 'منذ أسبوع', comment: 'حالة المنتج ممتازة ومطابقة للوصف والبائع تعامله محترم وموثوق.' },
                    ].map((rev) => (
                      <div key={rev.name} className="glass-bright rounded-2xl p-4 space-y-2 border border-white/6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-brand/20 text-brand-light font-black text-xs flex items-center justify-center">
                              {rev.name[0]}
                            </div>
                            <div>
                              <div className="font-bold text-white text-xs">{rev.name}</div>
                              <div className="text-[10px] text-slate-400">{rev.date}</div>
                            </div>
                          </div>
                          <span className="text-amber-400 text-xs font-bold">⭐⭐⭐⭐⭐ {rev.rating}</span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* ── RELATED PRODUCTS ROW ── */}
        <section id="related-products-section" data-name="Related Products Section" className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white whitespace-nowrap">المنتجات ذات الصلة (Related Products)</h2>
            <div className="flex gap-1">
              <button className="w-8 h-8 glass rounded-xl flex items-center justify-center text-slate-300">‹</button>
              <button className="w-8 h-8 glass rounded-xl flex items-center justify-center text-slate-300">›</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.slice(0, 5).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                navigate={navigate}
                isFavorited={favorites.includes(p.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
