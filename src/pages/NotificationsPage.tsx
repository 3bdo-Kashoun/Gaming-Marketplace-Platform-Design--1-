import { Navigate } from '../types'

interface NotificationsPageProps {
  navigate: Navigate
}

const notifications = [
  { id: 1, type: 'offer', title: 'عرض سعر جديد', desc: 'محمد العربي قدم عرضاً بقيمة 230 د.ل على DualSense Controller', time: '5 دقائق', read: false, icon: '💬' },
  { id: 2, type: 'tracking', title: 'تحديث الشحن', desc: 'طلبك TXN-0847 Spider-Man 2 في الطريق إليك', time: '2 ساعة', read: false, icon: '🚚' },
  { id: 3, type: 'success', title: 'تمت الصفقة', desc: 'تمت صفقة Astro A40 Headset بنجاح. تم إيداع 398 د.ل في حسابك.', time: '1 يوم', read: true, icon: '✅' },
  { id: 4, type: 'review', title: 'تقييم جديد', desc: 'سارة م. قيّمت تعاملك بـ 5 نجوم.', time: '2 أيام', read: true, icon: '⭐' },
  { id: 5, type: 'system', title: 'تحقق من هويتك', desc: 'أكمل التحقق من هويتك للحصول على شارة الثقة.', time: '3 أيام', read: true, icon: '🛡️' },
]

export default function NotificationsPage({ navigate }: NotificationsPageProps) {
  return (
    <div className="min-h-screen bg-obsidian pt-24 md:pt-28 pb-16 md:pb-0">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-white">الإشعارات</h1>
          <button className="text-sm text-accent font-semibold hover:text-accent/80 transition-colors">تحديد الكل كمقروء</button>
        </div>

        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`glass rounded-2xl border p-4 flex gap-4 cursor-pointer transition-all ${
                !n.read
                  ? 'border-brand/20 bg-brand/3 hover:border-brand/35'
                  : 'border-white/6 hover:border-white/12'
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0">
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{n.title}</span>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-accent animate-glow-pulse flex-shrink-0" />
                  )}
                </div>
                <p className="text-slate-400 text-sm mt-0.5 leading-relaxed">{n.desc}</p>
                <div className="text-slate-600 text-xs mt-1">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
