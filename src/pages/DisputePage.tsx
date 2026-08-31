import { useState } from 'react'
import { Navigate } from '../types'

interface DisputePageProps {
  navigate: Navigate
}

const reasons = [
  'المنتج لا يعمل',
  'المنتج مختلف عن الوصف',
  'المنتج تالف',
  'منتج مختلف تماماً',
  'مشكلة أخرى',
]

export default function DisputePage({ navigate }: DisputePageProps) {
  const [selected, setSelected] = useState('')
  const [desc, setDesc] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="min-h-screen bg-obsidian pt-20 pb-16 md:pb-0 flex items-center justify-center">
        <div className="max-w-sm w-full mx-4 text-center">
          <div className="w-20 h-20 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6 ring-2 ring-brand/20">
            <svg className="w-10 h-10 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h2 className="text-xl font-black text-white mb-2">تم استلام بلاغك</h2>
          <p className="text-slate-400 text-sm mb-1">سيراجع فريقنا النزاع خلال 24 ساعة.</p>
          <p className="text-slate-500 text-sm mb-8">أموالك محفوظة طوال فترة المراجعة.</p>
          <button onClick={() => navigate('dashboard')} className="w-full py-3 bg-brand text-white font-bold rounded-2xl glow-brand hover:bg-brand-light transition-all">
            العودة لحسابي
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-obsidian pt-20 pb-16 md:pb-0">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white mb-2">هل توجد مشكلة في المنتج؟</h1>
          <p className="text-slate-400">
            نحن هنا لحمايتك. أخبرنا بالمشكلة وسنتولى معالجتها بأسرع وقت.
          </p>
        </div>

        {/* Reason selection */}
        <div className="glass rounded-2xl border border-white/8 p-5 mb-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">نوع المشكلة</div>
          <div className="space-y-2">
            {reasons.map((r) => (
              <label key={r} className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                selected === r
                  ? 'border-brand/50 bg-brand/8'
                  : 'border-white/8 hover:border-brand/30 glass'
              }`}>
                <input
                  type="radio"
                  name="reason"
                  value={r}
                  checked={selected === r}
                  onChange={() => setSelected(r)}
                  className="accent-brand"
                />
                <span className={`text-sm font-medium ${selected === r ? 'text-brand' : 'text-slate-300'}`}>{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="glass rounded-2xl border border-white/8 p-5 mb-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">وصف المشكلة</div>
          <textarea
            placeholder="اشرح المشكلة بالتفصيل..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white/6 border border-white/10 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent/30 transition-all resize-none"
          />
        </div>

        {/* Upload */}
        <div className="glass rounded-2xl border border-white/8 p-5 mb-6">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">إرفاق صور أو فيديو (اختياري)</div>
          <div className="glass rounded-2xl border-2 border-dashed border-white/15 hover:border-accent/30 p-8 text-center transition-colors cursor-pointer">
            <svg className="w-8 h-8 text-slate-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <div className="text-sm text-slate-500">اضغط لإضافة صور أو فيديو</div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={() => (selected && desc) && setSubmitted(true)}
          disabled={!selected || !desc}
          className={`w-full py-4 font-bold rounded-2xl text-base transition-all ${
            selected && desc
              ? 'bg-brand text-white glow-brand hover:bg-brand-light shadow-lg'
              : 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/8'
          }`}
        >
          إرسال النزاع
        </button>
        <button onClick={() => navigate('inspection')} className="w-full py-3 text-sm text-slate-500 hover:text-accent transition-colors mt-2">
          العودة لصفحة الفحص
        </button>
      </div>
    </div>
  )
}
