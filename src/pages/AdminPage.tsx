import { useState } from 'react'
import { Navigate } from '../types'
import { products, sellers } from '../data/mock'

interface AdminPageProps {
  navigate: Navigate
}

type AdminTab = 'dashboard' | 'users' | 'listings' | 'transactions' | 'disputes' | 'reports'

const txStatusColors: Record<string, string> = {
  'مكتملة': 'bg-emerald-50 text-emerald-700',
  'في الطريق': 'bg-blue-50 text-blue-700',
  'قيد المراجعة': 'bg-amber-50 text-amber-700',
  'نزاع': 'bg-red-50 text-red-700',
}

export default function AdminPage({ navigate }: AdminPageProps) {
  const [tab, setTab] = useState<AdminTab>('dashboard')

  const stats = [
    { label: 'إجمالي المستخدمين', val: '1,247', change: '+12%', icon: '👥', color: 'text-brand' },
    { label: 'المنتجات النشطة', val: '489', change: '+8%', icon: '📦', color: 'text-accent' },
    { label: 'المعاملات النشطة', val: '34', change: '-3%', icon: '🔄', color: 'text-warning' },
    { label: 'المعاملات المكتملة', val: '823', change: '+24%', icon: '✅', color: 'text-success' },
    { label: 'النزاعات المفتوحة', val: '7', change: '+1', icon: '⚠️', color: 'text-error' },
    { label: 'الإيرادات (د.ل)', val: '12,480', change: '+18%', icon: '💰', color: 'text-brand' },
  ]

  const mockTxns = [
    { id: 'TXN-0847', product: 'Spider-Man 2 PS5', buyer: 'أحمد م.', seller: 'علي ز.', amount: 198, status: 'في الطريق', date: '15 يناير' },
    { id: 'TXN-0846', product: 'DualSense Controller', buyer: 'سارة خ.', seller: 'محمد ع.', amount: 262, status: 'مكتملة', date: '14 يناير' },
    { id: 'TXN-0845', product: 'PS5 Digital Edition', buyer: 'خالد م.', seller: 'علي ز.', amount: 3218, status: 'مكتملة', date: '13 يناير' },
    { id: 'TXN-0844', product: 'FIFA 25 PS4', buyer: 'ريم ب.', seller: 'سامي ف.', amount: 103, status: 'نزاع', date: '12 يناير' },
    { id: 'TXN-0843', product: 'Astro A40 Headset', buyer: 'يوسف ش.', seller: 'فاطمة ب.', amount: 398, status: 'قيد المراجعة', date: '12 يناير' },
  ]

  const navItems: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: '📊' },
    { id: 'users', label: 'المستخدمون', icon: '👥' },
    { id: 'listings', label: 'الإعلانات', icon: '📦' },
    { id: 'transactions', label: 'المعاملات', icon: '💳' },
    { id: 'disputes', label: 'النزاعات', icon: '⚠️' },
    { id: 'reports', label: 'التقارير', icon: '📈' },
  ]

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-white flex font-sans">
      {/* Admin sidebar */}
      <aside className="w-60 bg-slate-900 border-l border-slate-800 flex-shrink-0 flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
              </svg>
            </div>
            <div>
              <div className="font-black text-white text-sm">GAMA</div>
              <div className="text-slate-400 text-[10px]">لوحة الإدارة</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full text-right px-3 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-colors ${
                tab === item.id ? 'bg-brand/20 text-brand-light' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Back to site */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={() => navigate('home')}
            className="w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            العودة للموقع
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="font-bold text-white text-lg">{navItems.find((n) => n.id === tab)?.label}</h1>
          <div className="flex items-center gap-3">
            <div className="text-slate-400 text-sm">مرحباً، المدير</div>
            <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-sm">م</div>
          </div>
        </div>

        <div className="p-6">
          {tab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-slate-900 rounded-2xl border border-slate-800 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.change.startsWith('+') ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                        {s.change}
                      </span>
                    </div>
                    <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent transactions */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                  <h2 className="font-bold text-white">آخر المعاملات</h2>
                  <button onClick={() => setTab('transactions')} className="text-brand text-sm font-semibold hover:underline">عرض الكل</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-800">
                        {['رقم الطلب', 'المنتج', 'المشتري', 'البائع', 'المبلغ', 'الحالة', 'التاريخ'].map((h) => (
                          <th key={h} className="text-right px-4 py-3 text-slate-400 font-medium text-xs">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {mockTxns.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-4 py-3 font-mono text-slate-400 text-xs">{tx.id}</td>
                          <td className="px-4 py-3 font-medium text-white">{tx.product}</td>
                          <td className="px-4 py-3 text-slate-300">{tx.buyer}</td>
                          <td className="px-4 py-3 text-slate-300">{tx.seller}</td>
                          <td className="px-4 py-3 font-bold text-brand-light">{tx.amount} د.ل</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${txStatusColors[tx.status]}`}>{tx.status}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-400 text-xs">{tx.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {tab === 'users' && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="بحث في المستخدمين..."
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand/50"
                />
                <select className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 focus:outline-none">
                  <option>كل المستخدمين</option>
                  <option>موثوقون</option>
                  <option>غير موثوقين</option>
                </select>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    {['المستخدم', 'المدينة', 'التقييم', 'المعاملات', 'العضوية منذ', 'الحالة'].map((h) => (
                      <th key={h} className="text-right px-4 py-3 text-slate-400 font-medium text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {sellers.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-sm">{s.name[0]}</div>
                          <span className="font-medium text-white">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{s.city}</td>
                      <td className="px-4 py-3 text-amber-400 font-bold">⭐ {s.rating}</td>
                      <td className="px-4 py-3 text-slate-300">{s.transactions}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{s.memberSince}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.isVerified ? 'bg-success/10 text-success' : 'bg-slate-700 text-slate-400'}`}>
                          {s.isVerified ? 'موثوق' : 'عادي'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'listings' && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-800">
                <input
                  type="text"
                  placeholder="بحث في الإعلانات..."
                  className="w-full max-w-xs px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand/50"
                />
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    {['المنتج', 'الفئة', 'البائع', 'السعر', 'المدينة', 'الحالة'].map((h) => (
                      <th key={h} className="text-right px-4 py-3 text-slate-400 font-medium text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {products.slice(0, 8).map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img src={p.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <span className="font-medium text-white">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-xs">{p.categoryLabel}</td>
                      <td className="px-4 py-3 text-slate-300">{p.seller.name}</td>
                      <td className="px-4 py-3 font-bold text-brand-light">{p.price} د.ل</td>
                      <td className="px-4 py-3 text-slate-400">{p.city}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-success/10 text-success">نشط</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'transactions' && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    {['رقم الطلب', 'المنتج', 'المشتري', 'البائع', 'المبلغ', 'الحالة', 'التاريخ', 'إجراءات'].map((h) => (
                      <th key={h} className="text-right px-4 py-3 text-slate-400 font-medium text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {mockTxns.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-mono text-slate-400 text-xs">{tx.id}</td>
                      <td className="px-4 py-3 text-white font-medium">{tx.product}</td>
                      <td className="px-4 py-3 text-slate-300">{tx.buyer}</td>
                      <td className="px-4 py-3 text-slate-300">{tx.seller}</td>
                      <td className="px-4 py-3 font-bold text-brand-light">{tx.amount} د.ل</td>
                      <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${txStatusColors[tx.status]}`}>{tx.status}</span></td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{tx.date}</td>
                      <td className="px-4 py-3">
                        <button className="text-xs text-brand hover:underline">عرض</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'disputes' && (
            <div className="space-y-4">
              {[
                { id: 'DIS-0031', tx: 'TXN-0844', product: 'FIFA 25 PS4', issue: 'المنتج مختلف عن الوصف', buyer: 'ريم ب.', seller: 'سامي ف.', date: '12 يناير', urgent: true },
                { id: 'DIS-0028', tx: 'TXN-0832', product: 'PS4 Controller', issue: 'المنتج لا يعمل', buyer: 'يوسف ش.', seller: 'خالد م.', date: '9 يناير', urgent: false },
              ].map((d) => (
                <div key={d.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{d.product}</span>
                        {d.urgent && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-error/10 text-error">عاجل</span>}
                      </div>
                      <div className="text-slate-400 text-xs mt-0.5">{d.id} · {d.tx} · {d.date}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-success/10 text-success text-xs font-bold rounded-lg hover:bg-success/20 transition-colors">حل لصالح المشتري</button>
                      <button className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-700 transition-colors">حل لصالح البائع</button>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-3 text-sm text-slate-300">
                    <span className="font-bold text-white">السبب: </span>{d.issue}
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-slate-400">
                    <span>المشتري: <span className="text-white font-medium">{d.buyer}</span></span>
                    <span>البائع: <span className="text-white font-medium">{d.seller}</span></span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'reports' && (
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'الإيرادات الشهرية', desc: 'إجمالي رسوم الخدمة والتوصيل' },
                { title: 'أكثر الفئات نشاطاً', desc: 'توزيع المبيعات حسب الفئة' },
                { title: 'نمو المستخدمين', desc: 'تسجيلات جديدة شهرياً' },
                { title: 'معدل إتمام الصفقات', desc: 'نسبة الصفقات المكتملة' },
              ].map((r) => (
                <div key={r.title} className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                  <h3 className="font-bold text-white mb-1">{r.title}</h3>
                  <p className="text-slate-400 text-xs mb-6">{r.desc}</p>
                  {/* Simple bar chart placeholder */}
                  <div className="flex items-end gap-1.5 h-24">
                    {[40, 65, 55, 80, 70, 90, 75, 85, 60, 95, 88, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm transition-all"
                        style={{
                          height: `${h}%`,
                          background: `linear-gradient(to top, #3730a3, #4f46e5)`,
                          opacity: 0.7 + (h / 1000),
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                    <span>يناير</span>
                    <span>ديسمبر</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
