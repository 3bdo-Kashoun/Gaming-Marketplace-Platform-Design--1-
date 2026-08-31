import { useState } from 'react'
import { Navigate } from '../types'

interface InspectionPageProps {
  navigate: Navigate
}

export default function InspectionPage({ navigate }: InspectionPageProps) {
  // Checkbox checklist state
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [check3, setCheck3] = useState(false)
  const [check4, setCheck4] = useState(false)
  const [disclaimerCheck, setDisclaimerCheck] = useState(false)

  const [confirmed, setConfirmed] = useState(false)

  // All checkboxes must be checked to enable final release button
  const isAllChecked = check1 && check2 && check3 && check4 && disclaimerCheck

  if (confirmed) {
    return (
      <div id="inspection-success-container" data-name="Inspection Success Container" className="min-h-screen bg-obsidian pt-20 pb-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 glass rounded-3xl p-8 text-center border border-emerald-500/30 space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-4xl shadow-xl">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">تم تأكيد الاستلام وإغلاق الصفقة!</h2>
            <p className="text-emerald-400 text-xs font-bold">تم تحويل مبلغ الصفقة لحساب البائع بنجاح.</p>
            <p className="text-slate-400 text-xs leading-relaxed">
              شكراً لاستخدامك منصة GAMA. تم إقرار استلامك للبضاعة بحالة سليمة 100%.
            </p>
          </div>

          <button
            onClick={() => navigate('home')}
            className="w-full py-3.5 bg-brand text-white font-bold rounded-2xl glow-brand hover:bg-brand-light transition-all whitespace-nowrap"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    )
  }

  return (
    <div id="inspection-page-container" data-name="Inspection Page Container" className="min-h-screen bg-obsidian pt-20 pb-16 md:pb-0">
      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        
        {/* Header & Timer Warning */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-bold">
            <span>⏱️</span>
            <span>مهلة الفحص المتاحة: 24 ساعة فقط لحماية حقوقك</span>
          </div>

          <h1 className="text-3xl font-black text-white">معاينة وفحص البضاعة (Product Inspection)</h1>
          <p className="text-slate-300 text-xs leading-relaxed max-w-md mx-auto">
            قم بمعاينة المنتج بعناية بحضور المندوب وتجربته قبل التأكيد النهائي لإطلاق المبلغ للبائع.
          </p>
        </div>

        {/* Product Summary Card */}
        <div className="glass rounded-3xl p-5 border border-white/10 flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop&auto=format"
            alt="PS5 Digital Edition"
            className="w-16 h-16 rounded-2xl object-cover border border-white/10 shrink-0"
          />
          <div>
            <div className="font-extrabold text-white text-sm">PS5 Digital Edition — أبيض</div>
            <div className="text-slate-400 text-xs mt-0.5">البائع: أحمد الورفلي (طرابلس)</div>
            <div className="text-accent font-black text-sm mt-0.5">3200 د.ل (محفوظة لدى الضمان)</div>
          </div>
        </div>

        {/* ── MANDATORY CHECKLIST FORM ── */}
        <div id="inspection-checklist-box" data-name="Inspection Mandatory Checklist Box" className="glass rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <span className="text-xs font-black text-white whitespace-nowrap">قائمة الفحص والمعاينة الإلزامية:</span>
            <span className="text-[10px] text-amber-400 font-bold whitespace-nowrap">* يجب تحديد جميع النقاط</span>
          </div>

          <div className="space-y-3">
            {/* Checkbox 1 */}
            <label className="flex items-start gap-3 p-3.5 rounded-2xl glass border border-white/8 cursor-pointer hover:border-white/20 transition-all">
              <input
                type="checkbox"
                checked={check1}
                onChange={(e) => setCheck1(e.target.checked)}
                className="accent-brand mt-0.5 w-4 h-4 rounded shrink-0"
              />
              <span className="text-xs text-slate-200 font-medium leading-relaxed">
                تم استلام الشحنة ومعاينتها ميدانياً وتجربتها بحضور مندوب التوصيل.
              </span>
            </label>

            {/* Checkbox 2 */}
            <label className="flex items-start gap-3 p-3.5 rounded-2xl glass border border-white/8 cursor-pointer hover:border-white/20 transition-all">
              <input
                type="checkbox"
                checked={check2}
                onChange={(e) => setCheck2(e.target.checked)}
                className="accent-brand mt-0.5 w-4 h-4 rounded shrink-0"
              />
              <span className="text-xs text-slate-200 font-medium leading-relaxed">
                المنتج يعمل بكفاءة 100% ومطابق تماماً للصور والوصف المعلن بالمنصة.
              </span>
            </label>

            {/* Checkbox 3 */}
            <label className="flex items-start gap-3 p-3.5 rounded-2xl glass border border-white/8 cursor-pointer hover:border-white/20 transition-all">
              <input
                type="checkbox"
                checked={check3}
                onChange={(e) => setCheck3(e.target.checked)}
                className="accent-brand mt-0.5 w-4 h-4 rounded shrink-0"
              />
              <span className="text-xs text-slate-200 font-medium leading-relaxed">
                جميع الأسلاك والملحقات والاكسسوارات المرفقة في العرض سارية وسليمة.
              </span>
            </label>

            {/* Checkbox 4 */}
            <label className="flex items-start gap-3 p-3.5 rounded-2xl glass border border-white/8 cursor-pointer hover:border-white/20 transition-all">
              <input
                type="checkbox"
                checked={check4}
                onChange={(e) => setCheck4(e.target.checked)}
                className="accent-brand mt-0.5 w-4 h-4 rounded shrink-0"
              />
              <span className="text-xs text-slate-200 font-medium leading-relaxed">
                لا توجد أي أضرار خارجية أو خدوش أو عيوب خفية غير مذكورة.
              </span>
            </label>

            {/* ── CRITICAL MANDATORY LEGAL DISCLAIMER CHECKBOX ── */}
            <div id="legal-disclaimer-box" data-name="Legal Disclaimer Box" className="pt-2">
              <label className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 cursor-pointer hover:border-red-500/50 transition-all">
                <input
                  type="checkbox"
                  checked={disclaimerCheck}
                  onChange={(e) => setDisclaimerCheck(e.target.checked)}
                  className="accent-red-500 mt-0.5 w-5 h-5 rounded shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-xs font-black text-red-400 block whitespace-nowrap">
                    ⚠️ إقرار وتخلي مسؤولية قانوني (إلزامي):
                  </span>
                  <p className="text-[11px] text-slate-200 leading-relaxed font-semibold">
                    أقرّ وأتعهد بأنني قمت بفحص البضاعة وتجربتها بنفسي وأقريت بسيلانها وجودتها، وأعلم وأوافق بأن منصة GAMA <span className="text-red-400 font-black underline">غير مسؤولة نهائياً</span> عن أي عيب أو عطل أو تلف يظهر على المنتج بعد تأكيد المعاينة وإعادة إطلاق المبلغ للبائع.
                  </p>
                </div>
              </label>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Main Release Escrow Button */}
          <button
            type="button"
            disabled={!isAllChecked}
            onClick={() => setConfirmed(true)}
            className={`w-full py-4 font-black text-sm rounded-2xl transition-all shadow-xl whitespace-nowrap flex items-center justify-center gap-2 ${
              isAllChecked
                ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20 glow-brand cursor-pointer'
                : 'bg-white/5 text-slate-500 border border-white/8 cursor-not-allowed opacity-60'
            }`}
          >
            <span>✓</span>
            <span>تأكيد سلامة البضاعة وإطلاق المبلغ للبائع</span>
          </button>

          {!isAllChecked && (
            <p className="text-[11px] text-amber-400 text-center font-bold">
              * يرجى إكمال تحديد جميع خانات الفحص والإقرار القانوني لتفعيل زر التأكيد
            </p>
          )}

          {/* Open Dispute Option */}
          <button
            onClick={() => navigate('dispute')}
            className="w-full py-3.5 glass border border-red-500/40 text-red-400 hover:text-red-300 font-bold text-xs rounded-2xl hover:border-red-500/60 transition-all flex items-center justify-center gap-2"
          >
            <span>⚠️</span>
            <span>البضاعة غير مطابقة أو بها عيب — فتح طلب اعتراض ونزاع</span>
          </button>
        </div>

      </div>
    </div>
  )
}
