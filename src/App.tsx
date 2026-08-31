import { useState } from 'react'
import { Page } from './types'
import Header from './components/Header'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import ProductPage from './pages/ProductPage'
import SellerPage from './pages/SellerPage'
import ChatPage from './pages/ChatPage'
import CheckoutPage from './pages/CheckoutPage'
import TrackingPage from './pages/TrackingPage'
import InspectionPage from './pages/InspectionPage'
import DisputePage from './pages/DisputePage'
import DashboardPage from './pages/DashboardPage'
import SellPage from './pages/SellPage'
import AdminPage from './pages/AdminPage'
import FavoritesPage from './pages/FavoritesPage'
import NotificationsPage from './pages/NotificationsPage'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [pageData, setPageData] = useState<any>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; avatar: string; phone: string } | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [pendingNavigate, setPendingNavigate] = useState<{ page: Page; data?: any } | null>(null)

  const navigate = (p: Page, data?: any) => {
    // Restricted pages requiring login
    const protectedPages: Page[] = ['checkout', 'tracking', 'dashboard', 'sell', 'chat', 'notifications', 'favorites']
    
    if (protectedPages.includes(p) && !isLoggedIn) {
      setPendingNavigate({ page: p, data })
      setAuthModalOpen(true)
      return
    }

    setPage(p)
    setPageData(data)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLoginSuccess = (userData: { name: string; avatar: string; phone: string }) => {
    setIsLoggedIn(true)
    setUser(userData)
    setAuthModalOpen(false)

    if (pendingNavigate) {
      setPage(pendingNavigate.page)
      setPageData(pendingNavigate.data)
      setPendingNavigate(null)
    } else {
      setPage('dashboard')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setPage('home')
  }

  const toggleFavorite = (id: number) => {
    if (!isLoggedIn) {
      setAuthModalOpen(true)
      return
    }
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const isAdmin = page === 'admin'

  return (
    <div dir="rtl" className="min-h-screen bg-obsidian font-sans text-white">
      {!isAdmin && (
        <Header
          navigate={navigate}
          currentPage={page}
          favorites={favorites}
          isLoggedIn={isLoggedIn}
          user={user}
          onOpenAuth={() => setAuthModalOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {page === 'home' && <HomePage navigate={navigate} favorites={favorites} onToggleFavorite={toggleFavorite} />}
      {page === 'browse' && <BrowsePage navigate={navigate} data={pageData} favorites={favorites} onToggleFavorite={toggleFavorite} />}
      {page === 'product' && <ProductPage navigate={navigate} data={pageData} favorites={favorites} onToggleFavorite={toggleFavorite} />}
      {page === 'seller' && <SellerPage navigate={navigate} data={pageData} favorites={favorites} onToggleFavorite={toggleFavorite} />}
      {page === 'chat' && <ChatPage navigate={navigate} data={pageData} />}
      {page === 'checkout' && <CheckoutPage navigate={navigate} data={pageData} />}
      {page === 'tracking' && <TrackingPage navigate={navigate} data={pageData} />}
      {page === 'inspection' && <InspectionPage navigate={navigate} />}
      {page === 'dispute' && <DisputePage navigate={navigate} />}
      {page === 'dashboard' && <DashboardPage navigate={navigate} />}
      {page === 'sell' && <SellPage navigate={navigate} />}
      {page === 'admin' && <AdminPage navigate={navigate} />}
      {page === 'favorites' && <FavoritesPage navigate={navigate} favorites={favorites} onToggleFavorite={toggleFavorite} />}
      {page === 'notifications' && <NotificationsPage navigate={navigate} />}

      {!isAdmin && <Footer navigate={navigate} />}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false)
          setPendingNavigate(null)
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Mobile bottom nav — dark glass */}
      {!isAdmin && (
        <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
          <div className="glass border-t border-white/10 flex items-center justify-around py-2 px-2">
            {([
              { p: 'home', label: 'الرئيسية', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg> },
              { p: 'browse', label: 'استكشف', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
              { p: 'sell', label: '', icon: <div className="w-10 h-10 rounded-2xl bg-brand flex items-center justify-center -mt-3 glow-brand"><svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg></div> },
              { p: 'favorites', label: 'المفضلة', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg> },
              { p: 'dashboard', label: isLoggedIn ? 'حسابي' : 'دخول', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> },
            ] as { p: Page; label: string; icon: React.ReactNode }[]).map((item) => (
              <button
                key={item.p}
                onClick={() => navigate(item.p)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                  page === item.p ? 'text-accent' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {item.icon}
                {item.label && <span className="text-[10px] font-medium">{item.label}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
