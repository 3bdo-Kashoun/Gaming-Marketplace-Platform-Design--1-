import { useState } from 'react'
import { Navigate, Product } from '../types'
import { products } from '../data/mock'

interface TrackingPageProps {
  navigate: Navigate
  data?: { product?: Product; orderId?: string }
}

type OrderStage = 'created' | 'paid' | 'shipping' | 'delivered'

export default function TrackingPage({ navigate, data }: TrackingPageProps) {
  const product = data?.product || products[0]
  const [searchOrderId, setSearchOrderId] = useState(data?.orderId || '#341418542523523523')
  
  // Interactive Stage State (Defaulting to 'shipping' for demo UX)
  const [currentStage, setCurrentStage] = useState<OrderStage>('shipping')

  // Scenarios definition
  const scenarios: { id: OrderStage; label: string; icon: string; progress: number }[] = [
    { id: 'created', label: '1. تم إنشاء الطلب', icon: '📝', progress: 25 },
    { id: 'paid', label: '2. تم تأكيد الدفع', icon: '💳', progress: 50 },
    { id: 'shipping', label: '3. في الطريق مع المندوب', icon: '🚚', progress: 75 },
    { id: 'delivered', label: '4. تم التسليم والمعاينة', icon: '✅', progress: 100 },
  ]

  // Timeline Steps Data Generator based on active stage
  const getTimelineSteps = () => {
    const isStagePastOrCurrent = (stageId: OrderStage) => {
      const order: OrderStage[] = ['created', 'paid', 'shipping', 'delivered']
      return order.indexOf(stageId) <= order.indexOf(currentStage)
    }

    const isCurrent = (stageId: OrderStage) => currentStage === stageId

    return [
      {
        id: 'delivered',
        title: 'Order Delivered (تم التسليم المعاين بنجاح)',
        date: isStagePastOrCurrent('delivered') ? 'الأحد، 24 يوليو 2026 · 09:56 ص' : 'في انتظار التوصيل',
        desc: 'تم استلام الشحنة وتأكيد جودتها وفحصها بنجاح في الموقع المحدد.',
        completed: isStagePastOrCurrent('delivered'),
        active: isCurrent('delivered'),
      },
      {
        id: 'shipping',
        title: 'On Shipping (الشحنة في الطريق مع المندوب)',
        date: isStagePastOrCurrent('shipping') ? 'السبت، 23 يوليو 2026 · 01:24 م' : 'قيد الانتظار',
        desc: 'الشحنة مع مندوب التوصيل المحلي وهي في طريقها إلى عنوانك (طرابلس - حي الأندلس).',
        completed: isStagePastOrCurrent('shipping'),
        active: isCurrent('shipping'),
      },
      {
        id: 'paid',
        title: 'Payment Success (تم الدفع وحجز المبلغ بأمان)',
        date: isStagePastOrCurrent('paid') ? 'الجمعة، 22 يوليو 2026 · 10:44 ص' : 'قيد الدفع',
        desc: 'تم حجز مبلغ الصفقة بأمان في حساب الضمان المنظم لدى منصة GAMA.',
        completed: isStagePastOrCurrent('paid'),
        active: isCurrent('paid'),
      },
      {
        id: 'created',
        title: 'Order Created (تم إنشاء الطلب وتسجيله)',
        date: 'الخميس، 21 يوليو 2026 · 11:49 ص',
        desc: 'تم تسجيل الطلب وتأكيده مع البائع والمشتري.',
        completed: true,
        active: isCurrent('created'),
      },
    ]
  }

  const currentProgress = scenarios.find((s) => s.id === currentStage)?.progress || 75

  return (
    <div id="tracking-page-container" data-name="Tracking Page Main Container" className="min-h-screen bg-obsidian pt-24 md:pt-28 pb-16 md:pb-0">
      
      {/* ── TOP HEADER BANNER (IMAGE 2 LAYOUT) ── */}
      <section id="tracking-top-banner" data-name="Tracking Top Banner" className="py-10 bg-surface/50 border-b border-white/6 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-white whitespace-nowrap">تتبع الطلب (Track Your Order)</h1>
          <p className="text-slate-400 text-xs whitespace-nowrap">تابع حالة شحنتك ومراحل التوصيل في جميع مدن ليبيا لحظة بلحظة</p>
          
          {/* Order ID Search Bar */}
          <div id="tracking-search-bar" data-name="Tracking Order ID Search Bar" className="pt-3 max-w-xl mx-auto flex items-center gap-2">
            <input
              type="text"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              placeholder="أدخل رقم الطلب..."
              className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-accent"
            />
            <button className="px-6 py-3 bg-brand hover:bg-brand-light text-white font-extrabold text-xs rounded-2xl transition-all shadow-lg glow-brand whitespace-nowrap shrink-0">
              تتبع الطلب
            </button>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE SCENARIOS CONTROLLER (اختبار جميع حالات التتبع) ── */}
      <section id="scenarios-controller-section" data-name="Scenarios Controller Section" className="py-6 px-4 max-w-5xl mx-auto">
        <div className="glass rounded-3xl p-5 border border-brand/30 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚙️</span>
              <span className="text-xs font-black text-white whitespace-nowrap">اختبار سيناريوهات تتبع الطلب (Interactive UX Scenarios):</span>
            </div>
            <span className="text-[11px] text-accent font-bold">اضغط لتجربة كل مرحلة حيّة ⚡</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setCurrentStage(sc.id)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  currentStage === sc.id
                    ? 'bg-brand text-white border-brand glow-brand shadow-lg scale-[1.02]'
                    : 'glass text-slate-300 border-white/10 hover:border-white/20'
                }`}
              >
                <span>{sc.icon}</span>
                <span>{sc.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN TRACKING DETAILS CONTAINER ── */}
      <section id="tracking-content-section" data-name="Tracking Main Content Section" className="pb-10 px-4 max-w-5xl mx-auto">
        
        <div id="tracking-card" data-name="Tracking Main Card Container" className="glass rounded-3xl p-6 md:p-8 border border-white/10 space-y-8">
          
          {/* Progress Bar Header */}
          <div id="progress-bar-container" data-name="Progress Bar Container" className="space-y-2 border-b border-white/8 pb-6">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-white">نسبة إتمام الصفقة والتوصيل:</span>
              <span className="text-accent font-mono text-sm">{currentProgress}%</span>
            </div>
            
            {/* Animated Progress Bar */}
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-brand via-accent to-emerald-400 transition-all duration-700 rounded-full"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: ORDER INFO & DRIVER INFO (md:col-span-5) */}
            <div id="order-info-left-col" data-name="Order Info Left Column" className="md:col-span-5 space-y-5 border-b md:border-b-0 md:border-l border-white/8 pb-6 md:pb-0 md:pl-6">
              
              <div>
                <span className="text-[10px] font-bold text-slate-400 block whitespace-nowrap">Order ID (رقم الطلب):</span>
                <h3 className="text-xl font-black text-accent font-mono mt-0.5">{searchOrderId}</h3>
              </div>

              {/* Items List */}
              <div className="space-y-3 border-t border-white/6 pt-4">
                <span className="text-xs font-bold text-slate-300 block whitespace-nowrap">تفاصيل المنتج والمبلغ:</span>
                
                <div className="flex items-center gap-3 glass p-3 rounded-2xl border border-white/6">
                  <img src={product.image} alt={product.title} className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white line-clamp-1">{product.title}</div>
                    <div className="text-accent font-black text-xs mt-0.5">{product.price} د.ل</div>
                    <div className="text-[10px] text-slate-400">1x قطعة · توصيل لطرابلس</div>
                  </div>
                </div>
              </div>

              {/* DRIVER CONTACT CARD (Displays when stage is 'shipping') */}
              {currentStage === 'shipping' && (
                <div id="driver-info-card" data-name="Delivery Driver Card" className="glass rounded-2xl p-4 border border-accent/30 space-y-3 bg-accent/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">🚚 مندوب التوصيل المباشر:</span>
                    <span className="text-[10px] bg-accent/20 text-accent font-bold px-2 py-0.5 rounded-full">وصول متوقع: 35 دقيقة</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand/30 border border-brand/40 flex items-center justify-center font-black text-white text-sm">
                      س
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-white">سالم الفيتوري</div>
                      <div className="text-[10px] text-slate-400">مندوب GAMA Express - طرابلس</div>
                    </div>
                    <a
                      href="tel:0917788990"
                      className="px-3 py-1.5 bg-success text-white font-bold text-[11px] rounded-lg hover:bg-emerald-600 transition-all whitespace-nowrap shadow-md"
                    >
                      📞 اتصال
                    </a>
                  </div>
                </div>
              )}

              {/* Action Button to Open Inspection Page */}
              <button
                onClick={() => navigate('inspection')}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs rounded-xl transition-all shadow-lg glow-brand flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>🔍</span>
                <span>فتح صفحة فحص البضاعة وتأكيد الاستلام</span>
              </button>

              {/* Download PDF Invoice Button */}
              <button className="w-full py-3 glass border border-white/15 text-slate-300 font-bold text-xs rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0">
                <span>📄</span>
                <span>تحميل الفاتورة PDF (Download PDF)</span>
              </button>
            </div>

            {/* RIGHT: DYNAMIC TIMELINE STEP BAR (md:col-span-7 - MATCHING IMAGE 2) */}
            <div id="order-timeline-right-col" data-name="Order Timeline Right Column" className="md:col-span-7 space-y-6">
              <h3 className="text-base font-black text-white border-b border-white/8 pb-3 whitespace-nowrap">
                مراحل وتحديثات التوصيل (Order Timeline)
              </h3>

              <div id="timeline-steps-list" data-name="Timeline Steps Vertical List" className="space-y-6 pr-2">
                {getTimelineSteps().map((step, index) => (
                  <div key={step.id} className="relative flex gap-4 items-start">
                    
                    {/* Status Circle Dot & Line */}
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-all ${
                          step.active
                            ? 'bg-accent text-obsidian ring-4 ring-accent/30 shadow-lg animate-pulse'
                            : step.completed
                            ? 'bg-brand text-white border border-brand/50'
                            : 'bg-white/5 border border-white/15 text-slate-600'
                        }`}
                      >
                        {step.completed ? '✓' : index + 1}
                      </div>
                      {index < getTimelineSteps().length - 1 && (
                        <div
                          className={`w-0.5 h-12 mt-1 transition-colors ${
                            step.completed ? 'bg-brand/40' : 'bg-white/8'
                          }`}
                        />
                      )}
                    </div>

                    {/* Step Content */}
                    <div
                      className={`flex-1 p-3.5 rounded-2xl border transition-all ${
                        step.active
                          ? 'glass-bright border-accent/40 shadow-lg'
                          : step.completed
                          ? 'glass border-white/8'
                          : 'opacity-50 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <span className={`font-bold text-xs whitespace-nowrap ${step.active ? 'text-accent font-black' : step.completed ? 'text-white' : 'text-slate-500'}`}>
                          {step.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap">{step.date}</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed mt-1">{step.desc}</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ── TRUST BADGES BAR ── */}
      <section id="tracking-trust-badges-bar" data-name="Tracking Trust Badges Bar" className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: '🚚', title: 'توصيل منظم وسريع', desc: 'تغطية كافة المدن' },
            { icon: '🎖️', title: 'أعلى جودة تضمين', desc: 'فحص فني موثق' },
            { icon: '🔄', title: 'ضمان لمدة سنة', desc: 'استبدال واسترجاع' },
            { icon: '💬', title: 'تقييمات شفافة', desc: 'أكثر من 800 عميل' },
            { icon: '💳', title: 'دفع آمن', desc: 'نقداً أو الكتروني' },
          ].map((badge) => (
            <div key={badge.title} className="glass rounded-2xl p-4 flex items-center gap-3 border border-white/6">
              <div className="w-10 h-10 rounded-xl bg-brand/15 border border-brand/25 flex items-center justify-center text-xl shrink-0">
                {badge.icon}
              </div>
              <div>
                <div className="font-bold text-white text-xs whitespace-nowrap">{badge.title}</div>
                <div className="text-slate-400 text-[10px] whitespace-nowrap">{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
