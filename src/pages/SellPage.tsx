import { useState } from 'react'
import { Navigate } from '../types'
import { categories } from '../data/mock'

interface SellPageProps {
  navigate: Navigate
}

export default function SellPage({ navigate }: SellPageProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    condition: '',
    price: '',
    city: '',
    images: [] as string[],
  })
  const [published, setPublished] = useState(false)

  const totalSteps = 5
  const stepLabels = ['الفئة', 'المعلومات', 'الصور', 'السعر', 'المراجعة']

  const update = (key: string, val: string) => setFormData((f) => ({ ...f, [key]: val }))

  if (published) {
    return (
      <div className="min-h-screen bg-obsidian pt-20 pb-16 md:pb-0 flex items-center justify-center">
        <div className="max-w-sm w-full mx-4 text-center">
          <div className="w-24 h-24 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6 ring-4 ring-green-500/20">
            <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white mb-2">تم نشر إعلانك!</h2>
          <p className="text-slate-400 mb-6">إعلانك مرئي للمشترين الآن.</p>
          <div className="space-y-2">
            <button onClick={() => navigate('dashboard')} className="w-full py-3 bg-brand text-white font-bold rounded-2xl glow-brand hover:bg-brand-light transition-all">
              عرض إعلاناتي
            </button>
            <button
              onClick={() => { setPublished(false); setStep(1); setFormData({ category: '', title: '', description: '', condition: '', price: '', city: '', images: [] }) }}
              className="w-full py-3 glass border border-white/15 text-white font-semibold rounded-2xl hover:bg-white/8 transition-colors"
            >
              نشر إعلان آخر
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-obsidian pt-20 pb-16 md:pb-0">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-white">نشر إعلان جديد</h1>
          <p className="text-slate-400 text-sm mt-1">خطوات بسيطة لبيع منتجك بسرعة</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i + 1 < step ? 'bg-brand text-white' : i + 1 === step ? 'bg-brand text-white ring-4 ring-brand/20' : 'bg-white/8 text-slate-500'
                }`}>
                  {i + 1 < step ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  ) : i + 1}
                </div>
                <span className={`text-[10px] mt-1 font-medium ${i + 1 === step ? 'text-accent' : 'text-slate-500'}`}>{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="glass rounded-2xl border border-white/8 p-6">
          {step === 1 && (
            <div>
              <h2 className="font-bold text-white mb-4">اختر فئة المنتج</h2>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => update('category', cat.id)}
                    className={`p-3 rounded-xl border-2 text-right transition-all ${
                      formData.category === cat.id ? 'border-brand bg-brand/8' : 'border-white/8 hover:border-brand/30 glass'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className={`text-sm font-semibold ${formData.category === cat.id ? 'text-accent' : 'text-slate-300'}`}>{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-bold text-white mb-2">معلومات المنتج</h2>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">اسم المنتج</label>
                <input
                  type="text"
                  placeholder="مثال: God of War Ragnarök — PS5"
                  value={formData.title}
                  onChange={(e) => update('title', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/6 border border-white/10 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent/30 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">وصف المنتج</label>
                <textarea
                  placeholder="صف المنتج بالتفصيل: الحالة، سبب البيع، الملحقات المرفقة..."
                  value={formData.description}
                  onChange={(e) => update('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white/6 border border-white/10 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent/30 transition-all resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">حالة المنتج</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'excellent', label: 'ممتازة', desc: 'كالجديد' },
                    { id: 'good', label: 'جيدة', desc: 'استخدام خفيف' },
                    { id: 'fair', label: 'مقبولة', desc: 'استخدام عادي' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => update('condition', c.id)}
                      className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                        formData.condition === c.id ? 'border-brand bg-brand/8' : 'border-white/8 hover:border-brand/30 glass'
                      }`}
                    >
                      <div className={`text-sm font-bold ${formData.condition === c.id ? 'text-accent' : 'text-slate-300'}`}>{c.label}</div>
                      <div className="text-[10px] text-slate-500">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-bold text-white mb-4">صور المنتج</h2>
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-accent/25 hover:border-accent/50 flex items-center justify-center transition-colors cursor-pointer group">
                    {i === 0 ? (
                      <div className="text-center">
                        <svg className="w-6 h-6 text-slate-600 mx-auto mb-1 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <div className="text-[10px] text-slate-500">إضافة صورة</div>
                      </div>
                    ) : (
                      <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">يُنصح بإضافة 3-5 صور واضحة تُظهر حالة المنتج من زوايا مختلفة.</p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-bold text-white mb-2">السعر والموقع</h2>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">السعر المطلوب (د.ل)</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="150"
                    value={formData.price}
                    onChange={(e) => update('price', e.target.value)}
                    className="w-full px-4 py-3 bg-white/6 border border-white/10 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent/30 transition-all text-right text-lg font-black"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-sm">د.ل</span>
                </div>
                {formData.price && (
                  <p className="text-accent font-black text-lg mt-2">{formData.price} د.ل</p>
                )}
                <p className="text-xs text-slate-500 mt-1.5">المشترون يمكنهم التفاوض على السعر.</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">المدينة</label>
                <select
                  value={formData.city}
                  onChange={(e) => update('city', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/6 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent/30 transition-all"
                >
                  <option value="" className="bg-surface">اختر مدينتك</option>
                  {['طرابلس', 'بنغازي', 'مصراتة', 'الزاوية', 'سبها'].map((c) => (
                    <option key={c} className="bg-surface">{c}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="font-bold text-white mb-4">مراجعة الإعلان</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-500">الفئة</span>
                  <span className="font-semibold text-white">{categories.find((c) => c.id === formData.category)?.label || '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-500">المنتج</span>
                  <span className="font-semibold text-white">{formData.title || '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-500">الحالة</span>
                  <span className="font-semibold text-white">{formData.condition === 'excellent' ? 'ممتازة' : formData.condition === 'good' ? 'جيدة' : formData.condition === 'fair' ? 'مقبولة' : '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-500">السعر</span>
                  <span className="font-black text-accent">{formData.price ? `${formData.price} د.ل` : '—'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">المدينة</span>
                  <span className="font-semibold text-white">{formData.city || '—'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-5 py-3 glass border border-white/15 rounded-2xl font-semibold text-slate-300 hover:bg-white/8 hover:text-white transition-colors"
            >
              السابق
            </button>
          )}
          {step < totalSteps ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex-1 py-3 bg-brand text-white font-bold rounded-2xl glow-brand hover:bg-brand-light transition-all"
            >
              التالي
            </button>
          ) : (
            <button
              onClick={() => setPublished(true)}
              className="flex-1 py-3 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-400 transition-all shadow-lg shadow-green-500/20"
            >
              نشر الإعلان 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
