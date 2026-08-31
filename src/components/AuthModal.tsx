import { useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (user: { name: string; avatar: string; phone: string }) => void
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLoginSuccess({
      name: 'محمد علي',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phone: phone || '091 123 4567',
    })
    onClose()
  }

  const handleQuickDemo = () => {
    onLoginSuccess({
      name: 'محمد علي',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phone: '091 123 4567',
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-surface/95 border border-white/15 rounded-3xl p-7 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 w-8 h-8 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand to-accent flex items-center justify-center mx-auto glow-brand shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84 2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white">
            {isRegister ? 'إنشاء حساب جديد' : 'تسجيل الدخول إلى GAMA'}
          </h2>
          <p className="text-xs text-slate-400">
            أدخل رقم هاتفك الليبي للمتابعة واستخدام المنصة
          </p>
        </div>

        {/* Quick Demo Login Option */}
        <button
          type="button"
          onClick={handleQuickDemo}
          className="w-full py-3 bg-gradient-to-r from-brand via-brand-light to-accent text-white font-extrabold text-sm rounded-2xl shadow-lg glow-brand hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <span>⚡ دخول سريع تجريبي (كـ محمد علي)</span>
        </button>

        <div className="flex items-center gap-3 text-slate-500 text-xs my-2">
          <div className="flex-1 h-px bg-white/10" />
          <span>أو عبر رقم الهاتف</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم الهاتف (Libya Phone)</label>
            <div className="relative">
              <input
                type="tel"
                placeholder="091 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/12 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand"
                required
              />
              <span className="absolute left-3 top-3 text-xs text-slate-400 font-mono">🇱🇾 +218</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">كلمة المرور</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/12 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white text-obsidian font-extrabold text-sm rounded-xl hover:bg-slate-200 transition-all shadow-md"
          >
            {isRegister ? 'إنشاء حساب' : 'دخول'}
          </button>
        </form>

        {/* Toggle Register */}
        <div className="text-center text-xs text-slate-400 pt-1">
          {isRegister ? 'لديك حساب بالفعل؟ ' : 'ليس لديك حساب؟ '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-accent font-bold underline hover:text-white"
          >
            {isRegister ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </button>
        </div>

      </div>
    </div>
  )
}
