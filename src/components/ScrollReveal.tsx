import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'zoom-in'
  delay?: number
  duration?: number
  className?: string
  stagger?: boolean
  staggerDelay?: number
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  stagger = false,
  staggerDelay = 100,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // Initial hidden transform styles
  const getInitialStyle = () => {
    switch (animation) {
      case 'fade-up':
        return 'translateY(40px) scale(0.96)'
      case 'fade-down':
        return 'translateY(-40px)'
      case 'fade-left':
        return 'translateX(-50px)'
      case 'fade-right':
        return 'translateX(50px)'
      case 'scale-up':
      case 'zoom-in':
        return 'scale(0.88) translateY(20px)'
      default:
        return 'translateY(40px)'
    }
  }

  const baseStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0, 0) scale(1)' : getInitialStyle(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: 'opacity, transform',
  }

  return (
    <div ref={ref} className={className} style={baseStyle}>
      {children}
    </div>
  )
}
