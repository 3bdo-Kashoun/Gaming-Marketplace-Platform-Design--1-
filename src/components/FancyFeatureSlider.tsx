import { useState, useEffect, useRef } from 'react'

interface FeatureItem {
  id: number
  quote: string
  img: string
  name: string
  role: string
}

const features: FeatureItem[] = [
  {
    id: 0,
    quote: 'نؤمن بأن تحقيق تجربة التداول الأفضل للجيمرز في ليبيا يتطلب الالتزام المستمر بالتطوير والشفافية وتوفير أعلى درجات الأمان في كل عملية.',
    img: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=200&h=200&fit=crop&auto=format',
    name: 'التميز والجودة',
    role: 'We believe in great result',
  },
  {
    id: 1,
    quote: 'نضع رضا العميل وحماية أمواله وسلامة الأجهزة المشتراة في مقدمة أولويات فريق العمل اليومية لتقديم خدمة تداول رقمية آمنة في كل المدن.',
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop&auto=format',
    name: 'خدمة العملاء',
    role: 'Always prioritized satisfaction',
  },
  {
    id: 2,
    quote: 'نظام حماية وسداد ذكي يضمن معايرة واختبار كافة الشحنات قبل تسليم الأموال، لحماية البائع والمشتري في آن واحد بضمان 100%.',
    img: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=200&h=200&fit=crop&auto=format',
    name: 'الابتكار والأمان',
    role: 'Advanced Escrow Engine',
  },
]

export default function FancyFeatureSlider() {
  const [active, setActive] = useState(0)
  const [prevActive, setPrevActive] = useState<number | null>(null)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isAutoRotating) {
      timerRef.current = setInterval(() => {
        setActive((prev) => {
          setPrevActive(prev)
          return (prev + 1) % features.length
        })
      }, 7000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isAutoRotating])

  useEffect(() => {
    if (prevActive !== null) {
      const t = setTimeout(() => setPrevActive(null), 700)
      return () => clearTimeout(t)
    }
  }, [prevActive])

  useEffect(() => {
    if (textRef.current) {
      const el = textRef.current.children[active] as HTMLElement
      if (el) textRef.current.style.height = el.offsetHeight + 'px'
    }
  }, [active])

  const handleSelect = (idx: number) => {
    if (idx === active) return
    setPrevActive(active)
    setActive(idx)
    setIsAutoRotating(false)
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '48rem', margin: '0 auto', padding: '3rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '42rem', margin: '0 auto', textAlign: 'center' }}>

          {/* ─── IMAGE SECTION ─── */}
          <div style={{ position: 'relative', height: 128, marginBottom: 24 }}>

            {/* 480px Arch Background */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 480,
              height: 480,
              borderRadius: '50%',
              background: 'linear-gradient(180deg, rgba(0,112,209,0.25) 0%, rgba(0,112,209,0.05) 25%, transparent 75%)',
              pointerEvents: 'none',
            }} />

            {/* Image Stack Container */}
            <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
              {features.map((item, index) => {
                const isActive = active === index
                const isLeaving = prevActive === index

                let rotation = '-60deg'
                if (isActive) rotation = '0deg'
                else if (isLeaving) rotation = '60deg'

                return (
                  <div
                    key={item.id}
                    style={{
                      position: 'absolute',
                      top: 44,
                      left: '50%',
                      marginLeft: -40,
                      width: 80,
                      height: 80,
                      // KEY: transformOrigin is set to 240px BELOW the image
                      // This creates a large arc swing radius when rotating
                      transformOrigin: 'center 240px',
                      transition: 'all 700ms cubic-bezier(0.68, -0.3, 0.32, 1)',
                      opacity: isActive ? 1 : 0,
                      transform: `rotate(${rotation})`,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      width={80}
                      height={80}
                      style={{
                        display: 'block',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid rgba(0,240,255,0.5)',
                        boxShadow: '0 0 20px rgba(0,240,255,0.3)',
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* ─── TEXT SECTION ─── */}
          <div style={{ marginBottom: 36 }}>
            <div
              ref={textRef}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'height 150ms ease-in-out 300ms',
              }}
            >
              {features.map((item, index) => {
                const isActive = active === index
                const isLeaving = prevActive === index

                return (
                  <div
                    key={item.id}
                    style={{
                      transition: isActive
                        ? 'all 500ms ease-in-out 200ms'
                        : 'all 300ms ease-out 300ms',
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? 'translateX(0)'
                        : isLeaving
                          ? 'translateX(1rem)'
                          : 'translateX(-1rem)',
                      position: isActive ? 'relative' : 'absolute',
                      top: isActive ? undefined : 0,
                      left: isActive ? undefined : 0,
                      right: isActive ? undefined : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-relaxed" style={{ direction: 'rtl' }}>
                      <span style={{ color: '#00F0FF' }}>{"\u201C"}</span>
                      {item.quote}
                      <span style={{ color: '#00F0FF' }}>{"\u201D"}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ─── BUTTONS ─── */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {features.map((item, index) => {
              const isActive = active === index
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(index)}
                  style={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap',
                    borderRadius: 9999,
                    padding: '6px 14px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: isActive ? '1px solid rgba(0,240,255,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 150ms ease',
                    background: isActive
                      ? 'linear-gradient(90deg, #0070D1, #00A3FF, #00F0FF)'
                      : 'rgba(255,255,255,0.06)',
                    color: isActive ? '#fff' : '#94a3b8',
                    boxShadow: isActive ? '0 4px 14px rgba(0,112,209,0.4)' : '0 1px 3px rgba(0,0,0,0.2)',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <span>{item.name}</span>
                  <span style={{ color: isActive ? 'rgba(165,220,255,0.7)' : '#475569', margin: '0 6px' }}>-</span>
                  <span>{item.role}</span>
                </button>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}
