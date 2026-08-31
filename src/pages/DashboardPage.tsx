import { useState } from 'react'
import { Navigate } from '../types'
import { products } from '../data/mock'

interface DashboardPageProps {
  navigate: Navigate
}

type Tab = 'overview' | 'purchases' | 'sales' | 'favorites' | 'reviews' | 'settings'

const statusColors: Record<string, string> = {
  'مكتملة': 'bg-green-500/15 text-green-400',
  'في الطريق': 'bg-brand/15 text-brand',
  'قيد المراجعة': 'bg-amber-500/15 text-amber-400',
  'ملغاة': 'bg-red-500/15 text-red-400',
}

export default function DashboardPage({ navigate }: DashboardPageProps) {
  const [tab, setTab] = useState<Tab>('overview')

  const tabs = [
    { id: 'overview' as Tab, label: 'نظرة عامة', icon: '📊' },
    { id: 'purchases' as Tab, label: 'مشترياتي', icon: '🛒' },
    { id: 'sales' as Tab, label: 'مبيعاتي', icon: '💰' },
    { id: 'reviews' as Tab, label: 'التقييمات', icon: '⭐' },
    { id: 'settings' as Tab, label: 'إعدادات الحساب', icon: '⚙️' },
  ]

  const purchases = [
    { id: 'TXN-0847', product: products[0], status: 'في الطريق', date: '15 يناير 2025', total: 198 },
    { id: 'TXN-0731', product: products[4], status: 'مكتملة', date: '8 يناير 2025', total: 398 },
    { id: 'TXN-0692', product: products[2], status: 'مكتملة', date: '27 ديسمبر 2024', total: 3218 },
  ]

  const sales = [
    { id: 'TXN-0810', product: products[5], status: 'مكتملة', date: '12 يناير 2025', total: 160 },
    { id: 'TXN-0758', product: products[3], status: 'مكتملة', date: '3 يناير 2025', total: 95 },
  ]

  return (
    <div className="min-h-screen bg-obsidian pt-24 md:pt-28 pb-16 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Profile hero */}
        <div className="relative rounded-2xl overflow-hidden mb-6 p-6 bg-gradient-to-r from-brand/15 via-obsidian to-obsidian border border-white/8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-surface-2 ring-4 ring-brand/30 flex items-center justify-center text-white font-black text-2xl flex-shrink-0">
              أ
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white">أحمد محمد</h1>
                <span className="w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
              </div>
              <div className="text-slate-400 text-sm mt-0.5">ahmed@example.com · طرابلس</div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-slate-500">⭐ 4.8 تقييم</span>
                <span className="text-xs text-slate-500">32 معاملة مكتملة</span>
                <span className="text-xs text-slate-500">عضو منذ يناير 2023</span>
              </div>
            </div>
            <button
              onClick={() => navigate('sell')}
              className="px-4 py-2.5 bg-brand text-white font-bold rounded-2xl glow-brand hover:bg-brand-light transition-all text-sm flex-shrink-0"
            >
              + بيع منتج
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'المشتريات', value: '3', icon: '🛒' },
            { label: 'المبيعات', value: '2', icon: '💰' },
            { label: 'المكتملة', value: '5', icon: '✅' },
            { label: 'التقييم', value: '4.8', icon: '⭐' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl border border-white/8 p-4">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block w-52 flex-shrink-0">
            <div className="glass rounded-2xl border border-white/8 p-3 space-y-0.5">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full text-right px-3 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-colors ${
                    tab === t.id ? 'bg-brand/10 text-accent font-bold border-b-0 border-r-2 border-accent' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 md:hidden">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    tab === t.id ? 'bg-brand text-white' : 'glass border border-white/8 text-slate-400'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === 'overview' && (
              <div className="space-y-4">
                <div className="glass rounded-2xl border border-white/8 p-5">
                  <h3 className="font-bold text-white mb-4">آخر المعاملات</h3>
                  <div className="space-y-3">
                    {purchases.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0 hover:bg-white/3 rounded-xl px-2 transition-colors">
                        <img src={p.product.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white text-sm truncate">{p.product.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{p.date}</div>
                        </div>
                        <div className="text-left flex-shrink-0">
                          <div className="font-black text-accent text-sm">{p.total} د.ل</div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[p.status]}`}>{p.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-2xl border border-white/8 p-5">
                  <h3 className="font-bold text-white mb-4">إعلاناتي النشطة</h3>
                  {sales.length > 0 ? (
                    <div className="space-y-3">
                      {sales.map((s) => (
                        <div key={s.id} className="flex items-center gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0 hover:bg-white/3 rounded-xl px-2 transition-colors">
                          <img src={s.product.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-white text-sm truncate">{s.product.title}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{s.date}</div>
                          </div>
                          <div className="font-black text-accent text-sm flex-shrink-0">{s.total} د.ل</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500 text-sm">لا توجد إعلانات نشطة</div>
                  )}
                </div>
              </div>
            )}

            {tab === 'purchases' && (
              <div className="glass rounded-2xl border border-white/8 overflow-hidden">
                <div className="p-5 border-b border-white/8">
                  <h3 className="font-bold text-white">مشترياتي</h3>
                </div>
                <div className="divide-y divide-white/5">
                  {purchases.map((p) => (
                    <div key={p.id} className="p-4 hover:bg-white/3 transition-colors">
                      <div className="flex items-center gap-4">
                        <img src={p.product.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="font-bold text-white">{p.product.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5">رقم الطلب: {p.id} · {p.date}</div>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[p.status]}`}>{p.status}</span>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="font-black text-accent">{p.total} د.ل</div>
                          <button
                            onClick={() => navigate('tracking', { product: p.product })}
                            className="text-xs text-brand font-semibold hover:text-accent transition-colors mt-1 block"
                          >
                            تتبع
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'sales' && (
              <div className="glass rounded-2xl border border-white/8 overflow-hidden">
                <div className="p-5 border-b border-white/8 flex items-center justify-between">
                  <h3 className="font-bold text-white">مبيعاتي</h3>
                  <button onClick={() => navigate('sell')} className="px-4 py-2 bg-brand text-white text-sm font-bold rounded-2xl glow-brand hover:bg-brand-light transition-all">
                    + إعلان جديد
                  </button>
                </div>
                {sales.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {sales.map((s) => (
                      <div key={s.id} className="p-4 hover:bg-white/3 transition-colors">
                        <div className="flex items-center gap-4">
                          <img src={s.product.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                          <div className="flex-1">
                            <div className="font-bold text-white">{s.product.title}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{s.date}</div>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full mt-1.5 inline-block ${statusColors[s.status]}`}>{s.status}</span>
                          </div>
                          <div className="text-accent font-black">{s.total} د.ل</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-4xl mb-3">📦</div>
                    <div className="font-bold text-white mb-1">لا توجد مبيعات بعد</div>
                    <div className="text-slate-400 text-sm mb-4">ابدأ ببيع منتجاتك الآن</div>
                    <button onClick={() => navigate('sell')} className="px-6 py-2.5 bg-brand text-white font-bold rounded-2xl glow-brand hover:bg-brand-light transition-all">
                      بيع منتج
                    </button>
                  </div>
                )}
              </div>
            )}

            {tab === 'reviews' && (
              <div className="glass rounded-2xl border border-white/8 p-5">
                <h3 className="font-bold text-white mb-5">التقييمات</h3>
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/8">
                  <div className="text-center">
                    <div className="text-5xl font-black text-white">4.8</div>
                    <div className="flex items-center justify-center gap-0.5 mt-1 text-amber-400">
                      {[1,2,3,4,5].map(i => <svg key={i} className={`w-4 h-4 ${i <= 4 ? 'fill-current' : 'fill-amber-900'}`} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
                    </div>
                    <div className="text-slate-500 text-xs mt-1">من 28 تقييم</div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5,4,3,2,1].map((star) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 w-3">{star}</span>
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: star === 5 ? '72%' : star === 4 ? '18%' : star === 3 ? '7%' : '2%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'محمد ع.', rating: 5, text: 'بائع ممتاز، المنتج كان مطابقاً للوصف تماماً. التعامل راقي وسريع.', date: '10 يناير' },
                    { name: 'سارة م.', rating: 5, text: 'تجربة رائعة، الجهاز وصل بحالة ممتازة والتوصيل كان سريعاً.', date: '5 يناير' },
                    { name: 'خالد ف.', rating: 4, text: 'تعامل جيد وصادق. أنصح بالتعامل مع هذا البائع.', date: '28 ديسمبر' },
                  ].map((r) => (
                    <div key={r.name} className="glass rounded-xl border border-white/8 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brand/15 flex items-center justify-center text-brand font-bold text-sm">
                            {r.name[0]}
                          </div>
                          <span className="font-semibold text-white text-sm">{r.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{r.text}</p>
                      <div className="text-slate-600 text-xs mt-1.5">{r.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'settings' && (
              <div className="glass rounded-2xl border border-white/8 p-5 space-y-5">
                <h3 className="font-bold text-white">إعدادات الحساب</h3>
                {[
                  { label: 'الاسم الكامل', val: 'أحمد محمد', type: 'text' },
                  { label: 'البريد الإلكتروني', val: 'ahmed@example.com', type: 'email' },
                  { label: 'رقم الهاتف', val: '0912345678', type: 'tel' },
                  { label: 'المدينة', val: 'طرابلس', type: 'text' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      defaultValue={f.val}
                      className="w-full px-4 py-2.5 bg-white/6 border border-white/10 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent/30 transition-all"
                    />
                  </div>
                ))}
                <button className="px-6 py-2.5 bg-brand text-white font-bold rounded-2xl glow-brand hover:bg-brand-light transition-all text-sm">
                  حفظ التغييرات
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
