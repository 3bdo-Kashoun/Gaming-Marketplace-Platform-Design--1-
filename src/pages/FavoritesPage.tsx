import { Navigate } from '../types'
import { products } from '../data/mock'
import ProductCard from '../components/ProductCard'

interface FavoritesPageProps {
  navigate: Navigate
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

export default function FavoritesPage({ navigate, favorites, onToggleFavorite }: FavoritesPageProps) {
  const favProducts = products.filter((p) => favorites.includes(p.id))

  return (
    <div className="min-h-screen bg-obsidian pt-24 md:pt-28 pb-16 md:pb-0">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-white mb-6">
          المفضلة
          {favProducts.length > 0 && <span className="text-slate-500 font-normal text-base mr-2">({favProducts.length})</span>}
        </h1>

        {favProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                navigate={navigate}
                isFavorited
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="glass rounded-3xl p-12 text-center border border-white/8">
            <div className="text-5xl mb-4">🤍</div>
            <div className="text-white font-bold text-lg mb-2">لا توجد منتجات في المفضلة</div>
            <div className="text-slate-400 text-sm mb-6">لم تقم بإضافة أي منتجات للمفضلة بعد.</div>
            <button
              onClick={() => navigate('browse')}
              className="px-6 py-2.5 bg-accent/10 border border-accent/30 text-accent font-bold rounded-2xl hover:bg-accent/15 hover:border-accent/50 transition-all"
            >
              استكشف المنتجات
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
