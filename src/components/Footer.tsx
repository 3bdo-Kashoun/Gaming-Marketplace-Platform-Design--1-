import { Navigate } from '../types'

interface FooterProps {
  navigate: Navigate
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer id="footer-section" data-name="Footer Section" className="bg-surface border-t border-white/6">
      <div id="footer-container" data-name="Footer Content Container" className="max-w-7xl mx-auto px-4 py-12">
        <div id="footer-grid" data-name="Footer Main Grid" className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div id="footer-brand-info" data-name="Footer Brand Column" className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center glow-brand">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                </svg>
              </div>
              <span className="text-xl font-black text-metallic">GAMA</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              منصة ليبية موثوقة لبيع وشراء ألعاب وأجهزة الـGaming المستعملة.
            </p>
            {/* Status badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full text-xs text-slate-300 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-success animate-glow-pulse shrink-0" />
              +500 منتج متاح الآن
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'المنصة',
              links: [
                { label: 'استكشف المنتجات', page: 'browse' as const },
                { label: 'بيع منتجك', page: 'sell' as const },
                { label: 'كيف يعمل؟', page: 'home' as const },
              ],
            },
            {
              title: 'حسابي',
              links: [
                { label: 'مشترياتي', page: 'dashboard' as const },
                { label: 'مبيعاتي', page: 'dashboard' as const },
                { label: 'الرسائل', page: 'chat' as const },
                { label: 'المفضلة', page: 'favorites' as const },
              ],
            },
            {
              title: 'المساعدة',
              links: [
                { label: 'الشروط والأحكام', page: 'home' as const },
                { label: 'سياسة الخصوصية', page: 'home' as const },
                { label: 'الدعم', page: 'chat' as const },
              ],
            },
          ].map((col) => (
            <div key={col.title} id={`footer-col-${col.title}`} data-name={`Footer Link Column - ${col.title}`}>
              <h3 className="font-bold text-white text-sm mb-3 whitespace-nowrap">{col.title}</h3>
              <div className="space-y-2">
                {col.links.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.page)}
                    className="block text-slate-300 hover:text-accent text-sm transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-xs whitespace-nowrap">
            © 2025 GAMA. جميع الحقوق محفوظة.
          </div>
          <button onClick={() => navigate('admin')} className="text-slate-400 hover:text-white text-xs transition-colors whitespace-nowrap">
            لوحة الإدارة
          </button>
        </div>
      </div>
    </footer>
  )
}
