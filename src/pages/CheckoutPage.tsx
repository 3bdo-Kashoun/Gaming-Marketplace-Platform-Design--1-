import { useState } from 'react'
import { Navigate, Product } from '../types'
import { products } from '../data/mock'

interface CheckoutPageProps {
  navigate: Navigate
  data?: { product?: Product }
}

interface SavedAddress {
  id: string
  label: string
  city: string
  address: string
  lat: number
  lng: number
  isDefault: boolean
}

export default function CheckoutPage({ navigate, data }: CheckoutPageProps) {
  const product = data?.product || products[0]

  // Pre-saved Libyan user addresses
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([
    { id: '1', label: 'المنزل - طرابلس (حي الأندلس)', city: 'طرابلس', address: 'حي الأندلس، خلف أسواق المدار، بناء 14', lat: 32.8872, lng: 13.1913, isDefault: true },
    { id: '2', label: 'العمل - طرابلس (شارع عمر المختار)', city: 'طرابلس', address: 'شارع عمر المختار، برج الفاتح، الطابق 5', lat: 32.8911, lng: 13.1824, isDefault: false },
    { id: '3', label: 'استراحة - مصراتة (قصر أحمد)', city: 'مصراتة', address: 'قصر أحمد، قرب الميناء', lat: 32.3754, lng: 15.0925, isDefault: false },
  ])

  const [selectedAddressId, setSelectedAddressId] = useState<string>('1')

  // Form State
  const [firstName, setFirstName] = useState('محمد')
  const [lastName, setLastName] = useState('الفيتوري')
  const [email, setEmail] = useState('mohammed@example.ly')
  const [phone, setPhone] = useState('091-2345678')
  const [city, setCity] = useState('طرابلس')
  const [addressDetail, setAddressDetail] = useState('حي الأندلس، خلف أسواق المدار، بناء 14')
  const [note, setNote] = useState('يرجى الاتصال قبل الوصول بـ 30 دقيقة')

  // Map Coordinates & Save Address Checkbox
  const [mapCoords, setMapCoords] = useState({ lat: 32.8872, lng: 13.1913, addressText: 'طرابلس - حي الأندلس (32.8872° N, 13.1913° E)' })
  const [saveToBook, setSaveToBook] = useState(true)
  const [newAddressLabel, setNewAddressLabel] = useState('منزلي الرئيسي')

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'digital' | 'bank'>('cod')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Address Selector Handler
  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id)
    if (id === 'new') {
      setFirstName('')
      setLastName('')
      setAddressDetail('')
      return
    }
    const addr = savedAddresses.find((a) => a.id === id)
    if (addr) {
      setCity(addr.city)
      setAddressDetail(addr.address)
      setMapCoords({ lat: addr.lat, lng: addr.lng, addressText: `${addr.city} - ${addr.address}` })
    }
  }

  // GPS Pin simulation
  const handleLocateMe = () => {
    setMapCoords({
      lat: 32.8872 + (Math.random() - 0.5) * 0.02,
      lng: 13.1913 + (Math.random() - 0.5) * 0.02,
      addressText: `${city} - تم تحديد موقعك الحالي عبر Google Maps GPS`,
    })
  }

  // Calculate pricing in LYD
  const itemPrice = product.price
  const deliveryFee = city === 'طرابلس' ? 15 : 25
  const serviceFee = 10
  const orderTotal = itemPrice + deliveryFee + serviceFee

  if (isSubmitted) {
    return (
      <div id="checkout-success-container" data-name="Checkout Success Container" className="min-h-screen bg-obsidian pt-20 pb-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 glass rounded-3xl p-8 text-center border border-white/10 space-y-6">
          <div className="w-20 h-20 rounded-full bg-brand/20 border border-brand/40 text-brand-light flex items-center justify-center mx-auto text-4xl shadow-lg glow-brand">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">تم إتمام طلبك بنجاح!</h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              رقم الطلب الخاص بك: <span className="font-bold text-accent">#LY-84920482</span>
            </p>
            <p className="text-slate-400 text-xs">
              تم حفظ الموقع المعتمد: <span className="text-white font-semibold">{city} ({addressDetail})</span>
            </p>
          </div>
          
          <button
            onClick={() => navigate('tracking', { product, orderId: 'LY-84920482' })}
            className="w-full py-3.5 bg-brand hover:bg-brand-light text-white font-extrabold text-sm rounded-xl transition-all shadow-lg glow-brand whitespace-nowrap"
          >
            تتبع حالة الطلب الشاملة 🚚
          </button>
        </div>
      </div>
    )
  }

  return (
    <div id="checkout-page-container" data-name="Checkout Page Container" className="min-h-screen bg-obsidian pt-24 md:pt-28 pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Page Title */}
        <div className="flex items-center justify-between border-b border-white/8 pb-4">
          <div>
            <h1 className="text-3xl font-black text-white whitespace-nowrap">تفاصيل الشحن والطلب (Shipping Details)</h1>
            <p className="text-slate-400 text-xs mt-1 whitespace-nowrap">أدخل بيانات الشحن والموقع الدقيق في ليبيا لإتمام الطلب</p>
          </div>
          <div className="text-xs text-accent font-bold glass px-4 py-2 rounded-xl border border-accent/20">
            🇱🇾 ليبيا (Libya Delivery)
          </div>
        </div>

        {/* Main Grid: Left Shipping Form + Right Order Summary */}
        <div id="checkout-main-grid" data-name="Checkout Main Grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT FORM COLUMN (Shipping Details - lg:col-span-7) ── */}
          <div id="shipping-details-col" data-name="Shipping Details Column" className="lg:col-span-7 space-y-6">
            
            {/* Address Book Dropdown Selector */}
            <div id="address-book-selector-box" data-name="Address Book Selector Box" className="glass rounded-3xl p-5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white whitespace-nowrap">العناوين المحفوظة في حسابك (Address Book)</span>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">يمكنك حفظ عدة عناوين</span>
              </div>

              <select
                value={selectedAddressId}
                onChange={(e) => handleSelectAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-bold focus:outline-none focus:border-accent"
              >
                {savedAddresses.map((addr) => (
                  <option key={addr.id} value={addr.id} className="bg-obsidian text-white">
                    📍 {addr.label} — ({addr.city})
                  </option>
                ))}
                <option value="new" className="bg-obsidian text-accent font-bold">+ إضافة عنوان جديد جديد...</option>
              </select>
            </div>

            {/* Main Fields Form */}
            <div id="shipping-fields-form" data-name="Shipping Fields Form" className="glass rounded-3xl p-6 border border-white/10 space-y-4">
              <h3 className="text-base font-black text-white border-b border-white/8 pb-3 whitespace-nowrap">
                البيانات الشخصية وعنوان الاستلام
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 block whitespace-nowrap">الاسم الأول (First Name)</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 block whitespace-nowrap">اسم العائلة / اللقب (Last Name)</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 block whitespace-nowrap">البريد الإلكتروني (Email Address)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Mobile Phone Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 block whitespace-nowrap">رقم الهاتف المحمول (Mobile Phone Number)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="091-XXXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-accent text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City Selector */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 block whitespace-nowrap">المدينة (Town / City)</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-accent"
                  >
                    {['طرابلس', 'بنغازي', 'مصراتة', 'الزاوية', 'سبها', 'البيضاء', 'زليتن', 'غريان', 'طبرق', 'سرت', 'خمس'].map((c) => (
                      <option key={c} value={c} className="bg-obsidian text-white">{c}</option>
                    ))}
                  </select>
                </div>

                {/* Country */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 block whitespace-nowrap">الدولة (Country)</label>
                  <input
                    type="text"
                    value="ليبيا (State of Libya 🇱🇾)"
                    disabled
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-slate-300 text-xs font-bold"
                  />
                </div>
              </div>

              {/* Detailed Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 block whitespace-nowrap">العنوان التفصيلي (Detailed Address)</label>
                <input
                  type="text"
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                  placeholder="اسم الحي، الشارع الرئيسي، قرب شوارع أو معالم معروفة"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              {/* Note / Special Instructions */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 block whitespace-nowrap">ملاحظات التوصيل (Delivery Note)</label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="أي تعليمات إضافية لمندوب الشحن..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              {/* ── GOOGLE MAPS INTERACTIVE LOCATION PICKER WIDGET ── */}
              <div id="google-maps-picker-box" data-name="Google Maps Picker Container" className="glass rounded-2xl p-4 border border-brand/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🗺️</span>
                    <span className="text-xs font-black text-white whitespace-nowrap">تحديد موقع الاستلام عبر Google Maps</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLocateMe}
                    className="px-3 py-1.5 bg-brand text-white font-bold text-[11px] rounded-lg hover:bg-brand-light transition-all whitespace-nowrap shadow-md"
                  >
                    🎯 حدد موقعي الحالي
                  </button>
                </div>

                {/* Simulated Interactive Map Screen */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/15 bg-slate-900 flex items-center justify-center group">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=300&fit=crop&auto=format"
                    alt="Map Grid"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent pointer-events-none" />

                  {/* Pin marker */}
                  <div className="absolute flex flex-col items-center animate-bounce">
                    <div className="px-2 py-1 bg-brand text-white text-[10px] font-bold rounded-md shadow-lg whitespace-nowrap">
                      موقع الشحن المحدد 📍
                    </div>
                    <div className="w-6 h-6 text-red-500 font-extrabold text-2xl drop-shadow-lg">📍</div>
                  </div>

                  <div className="absolute bottom-2 right-2 left-2 bg-obsidian/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-slate-300 flex items-center justify-between">
                    <span className="truncate font-semibold text-accent">{mapCoords.addressText}</span>
                    <span className="text-slate-400 font-bold shrink-0">Google Maps 🇱🇾</span>
                  </div>
                </div>

                {/* Save to address book checkbox */}
                <div className="pt-2 border-t border-white/6 flex items-center justify-between flex-wrap gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveToBook}
                      onChange={(e) => setSaveToBook(e.target.checked)}
                      className="accent-brand rounded"
                    />
                    <span className="text-xs font-bold text-white whitespace-nowrap">حفظ هذا الموقع في دفتر العناوين الخاص بك</span>
                  </label>

                  {saveToBook && (
                    <input
                      type="text"
                      value={newAddressLabel}
                      onChange={(e) => setNewAddressLabel(e.target.value)}
                      placeholder="اسم المكان (مثال: منزلي)"
                      className="px-3 py-1 bg-white/10 border border-white/15 rounded-lg text-xs text-white focus:outline-none"
                    />
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* ── RIGHT COLUMN (My Orders Summary & Payment - lg:col-span-5) ── */}
          <div id="checkout-summary-col" data-name="Checkout Order Summary Column" className="lg:col-span-5 space-y-6">
            
            {/* My Orders Box */}
            <div id="my-orders-box" data-name="My Orders Container" className="glass rounded-3xl p-6 border border-white/10 space-y-4">
              <h3 className="text-base font-black text-white border-b border-white/8 pb-3 whitespace-nowrap">
                ملخص طلباتي (My Orders)
              </h3>

              {/* Product item list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 text-xs border-b border-white/6 pb-3">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.title} className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0" />
                    <div>
                      <div className="font-bold text-white line-clamp-1">{product.title}</div>
                      <div className="text-slate-400 text-[10px]">الكمية: 1x</div>
                    </div>
                  </div>
                  <div className="font-black text-accent whitespace-nowrap">{product.price} د.ل</div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs border-b border-white/6 pb-3">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="whitespace-nowrap">الإجمالي الفرعي (Subtotal):</span>
                  <span className="font-bold text-white whitespace-nowrap">{itemPrice} د.ل</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="whitespace-nowrap">رسوم التوصيل لـ ({city}):</span>
                  <span className="font-bold text-emerald-400 whitespace-nowrap">+{deliveryFee} د.ل</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="whitespace-nowrap">رسوم حماية الصفقة والخدمة:</span>
                  <span className="font-bold text-white whitespace-nowrap">+{serviceFee} د.ل</span>
                </div>
              </div>

              {/* Order Total */}
              <div className="flex items-center justify-between text-base pt-1">
                <span className="font-black text-white whitespace-nowrap">الإجمالي الكلي (Order Total):</span>
                <span className="text-2xl font-black text-accent" style={{ textShadow: '0 0 16px rgba(0,240,255,0.4)' }}>
                  {orderTotal} د.ل
                </span>
              </div>

              {/* Payment Methods (Radios - Image 1) */}
              <div id="payment-methods-box" data-name="Payment Methods Box" className="space-y-3 pt-3 border-t border-white/8">
                <span className="text-xs font-black text-white block whitespace-nowrap">طريقة الدفع (Payment Method):</span>

                <div className="space-y-2">
                  {[
                    { id: 'cod', label: 'الدفع عند الاستلام (Cash On Delivery 💵)', desc: 'ادفع نقداً لمندوب التوصيل بعد الفحص المعاين' },
                    { id: 'digital', label: 'سداد / تداول / إدفع لي (Libyan E-Wallets 📱)', desc: 'الدفع المباشر عبر المحافظ الإلكترونية الليبية' },
                    { id: 'bank', label: 'تحويل بنكي محلي (Local Bank Transfer 🏦)', desc: 'المصرف التجاري الوطني / مصرف أرقام / التجارة والاستثمار' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === method.id
                          ? 'bg-brand/15 border-brand text-white shadow-lg'
                          : 'glass border-white/8 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id as any)}
                        className="accent-brand mt-1"
                      />
                      <div>
                        <div className="font-bold text-xs text-white whitespace-nowrap">{method.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{method.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Button: PLACE ORDER */}
              <button
                type="button"
                onClick={() => setIsSubmitted(true)}
                className="w-full py-4 bg-brand hover:bg-brand-light text-white font-black text-base rounded-2xl transition-all shadow-xl glow-brand whitespace-nowrap shrink-0 text-center uppercase tracking-wider"
              >
                تأكيد وإتمام الطلب (PLACE ORDER) 🚀
              </button>

              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                بضغطك على إتمام الطلب، أنت توافق على شروط وأحكام منصة GAMA لضمان حقوق البائع والمشتري.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
