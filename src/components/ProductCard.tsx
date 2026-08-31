import { Product, Navigate } from '../types'

interface ProductCardProps {
  product: Product
  navigate: Navigate
  isFavorited: boolean
  onToggleFavorite: (id: number) => void
}

export default function ProductCard({ product, navigate, isFavorited, onToggleFavorite }: ProductCardProps) {
  const stockCount = (product.id * 7) % 30 + 10
  const soldCount = (product.id * 13) % (stockCount - 2) + 2
  const soldPercentage = Math.round((soldCount / stockCount) * 100)

  return (
    <div
      id={`product-card-${product.id}`}
      data-name={`Product Card - ${product.title}`}
      className="product-card group relative glass rounded-3xl overflow-hidden cursor-pointer glow-card-hover transition-all duration-300 flex flex-col justify-between border border-white/8 hover:border-accent/40"
      onClick={() => navigate('product', { product })}
    >
      {/* Top Image Container */}
      <div className="relative overflow-hidden bg-surface/50 aspect-[4/3] flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* Circular SALE badge at top-right */}
        <div className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-[10px] shadow-lg glow-brand shrink-0 whitespace-nowrap">
          تخفيض
        </div>

        {/* Favorite heart button at top-left */}
        <button
          className="heart-btn absolute top-2.5 left-2.5 w-8 h-8 rounded-xl glass flex items-center justify-center hover:bg-white/20 transition-colors shrink-0"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id) }}
        >
          <svg
            className={`w-4 h-4 transition-colors ${isFavorited ? 'text-red-400 fill-red-400' : 'text-white/70'}`}
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
        <div>
          {/* Price Block */}
          <div className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="text-xl font-black text-accent" style={{ textShadow: '0 0 16px rgba(0,240,255,0.4)' }}>
              {product.price}
            </span>
            <span className="text-xs font-bold text-accent">د.ل</span>
            <span className="text-xs text-slate-400 line-through mr-1">
              {product.price + 250} د.ل
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-white text-sm line-clamp-2 mt-1 leading-snug">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5 text-amber-400 text-xs whitespace-nowrap">
            <span>⭐⭐⭐⭐⭐</span>
            <span className="text-slate-400 text-[10px] font-semibold">({product.seller.rating})</span>
          </div>
        </div>

        {/* Stock / Sold Progress Bar */}
        <div className="space-y-1 border-t border-white/6 pt-2">
          <div className="flex items-center justify-between text-[10px] text-slate-400 whitespace-nowrap">
            <span>المباع: {soldCount}</span>
            <span>المتبقي: {stockCount - soldCount}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-all duration-500"
              style={{ width: `${soldPercentage}%` }}
            />
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => { e.stopPropagation(); navigate('product', { product }) }}
          className="w-full py-2.5 px-4 glass border border-brand/40 text-brand-light font-bold text-xs rounded-xl hover:bg-brand hover:text-white transition-all whitespace-nowrap shrink-0 flex items-center justify-center gap-2 shadow-md"
        >
          <span>إضافة إلى السلة</span>
          <span>🛒</span>
        </button>
      </div>
    </div>
  )
}
