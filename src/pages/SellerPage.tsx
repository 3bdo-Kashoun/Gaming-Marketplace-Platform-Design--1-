import { Navigate, Seller } from '../types'
import { products } from '../data/mock'
import ProductCard from '../components/ProductCard'

interface SellerPageProps {
  navigate: Navigate
  data?: { seller?: Seller }
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

export default function SellerPage({ navigate, data, favorites, onToggleFavorite }: SellerPageProps) {
  const seller = data?.seller || products[0].seller
  const sellerProducts = products.filter((p) => p.seller.id === seller.id)

  return (
    <div className="min-h-screen bg-obsidian pt-20 pb-16 md:pb-0">
      {/* Hero gradient */}
      <div className="bg-gradient-to-b from-brand/20 via-obsidian to-obsidian pt-8 pb-0">
        <div className="max-w-5xl mx-auto px-4">
          {/* Profile card */}
          <div className="glass rounded-2xl border border-white/8 p-6 mb-6">
            <div className="flex gap-5 items-start">
              {/* Avatar with ring */}
              <div className="w-20 h-20 rounded-2xl bg-brand/15 border border-brand/30 ring-2 ring-brand/40 flex items-center justify-center text-brand-light font-black text-3xl flex-shrink-0">
                {seller.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-black text-white">{seller.name}</h1>
                  {seller.isVerified && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-brand/15 text-brand-light text-xs font-bold rounded-full border border-brand/25">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      موثوق
                    </span>
                  )}
                </div>
                <div className="text-slate-500 text-sm mt-0.5">{seller.city} · عضو منذ {seller.memberSince}</div>

                {/* Stats */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="glass rounded-2xl border border-white/8 px-4 py-3 text-center">
                    <div className="text-xl font-black text-white">{seller.rating}</div>
                    <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-0.5">
                      {[1,2,3,4,5].map((i) => (
                        <svg key={i} className={`w-3 h-3 ${i <= Math.round(seller.rating) ? 'fill-current' : 'fill-amber-900'}`} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      ))}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">التقييم</div>
                  </div>
                  <div className="glass rounded-2xl border border-white/8 px-4 py-3 text-center">
                    <div className="text-xl font-black text-white">{seller.transactions}</div>
                    <div className="text-xs text-slate-500 mt-3.5">معاملة مكتملة</div>
                  </div>
                  <div className="glass rounded-2xl border border-white/8 px-4 py-3 text-center">
                    <div className="text-xl font-black text-white">{seller.responseRate}%</div>
                    <div className="text-xs text-slate-500 mt-3.5">معدل الاستجابة</div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('chat', { seller })}
                className="px-4 py-2.5 bg-brand text-white font-bold rounded-xl glow-brand hover:bg-brand-light transition-all text-sm flex-shrink-0 hidden sm:block"
              >
                مراسلة
              </button>
            </div>

            {seller.bio && (
              <div className="mt-4 pt-4 border-t border-white/6">
                <p className="text-slate-400 text-sm leading-relaxed">{seller.bio}</p>
              </div>
            )}

            <button
              onClick={() => navigate('chat', { seller })}
              className="mt-4 w-full py-2.5 bg-brand text-white font-bold rounded-xl glow-brand hover:bg-brand-light transition-all text-sm sm:hidden"
            >
              مراسلة البائع
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="font-black text-white text-xl mb-4">
          إعلانات {seller.name}
          <span className="text-slate-500 font-normal text-base mr-2">({sellerProducts.length})</span>
        </h2>

        {sellerProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sellerProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                navigate={navigate}
                isFavorited={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center glass rounded-2xl border border-white/8">
            <div className="text-4xl mb-3">📦</div>
            <div className="font-bold text-slate-400">لا توجد منتجات متاحة حالياً</div>
          </div>
        )}
      </div>
    </div>
  )
}
