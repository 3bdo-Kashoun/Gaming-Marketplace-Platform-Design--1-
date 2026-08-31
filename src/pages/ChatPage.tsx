import { useState } from 'react'
import { Navigate, Message } from '../types'
import { products, sellers } from '../data/mock'

interface ChatPageProps {
  navigate: Navigate
  data?: any
}

const conversations = [
  { id: 1, product: products[0], seller: sellers[0], lastMsg: 'تمام، هل المنتج لا يزال متاحاً؟', time: '5 دقائق', unread: 2 },
  { id: 2, product: products[1], seller: sellers[1], lastMsg: 'يمكنني توصيله غداً.', time: '1 ساعة', unread: 0 },
  { id: 3, product: products[4], seller: sellers[4], lastMsg: 'شكراً على عرضك.', time: 'أمس', unread: 0 },
]

const initMessages: Message[] = [
  { id: 1, sender: 'buyer', text: 'مرحباً، هل المنتج لا يزال متاحاً؟', time: '10:30 ص' },
  { id: 2, sender: 'seller', text: 'نعم، لا يزال متاحاً. هل لديك أي استفسار؟', time: '10:32 ص' },
  { id: 3, sender: 'buyer', text: 'آخر سعر؟', time: '10:33 ص' },
  { id: 4, sender: 'seller', text: '180 د.ل ثابت.', time: '10:35 ص' },
  { id: 5, sender: 'buyer', offer: { amount: 160, status: 'pending' }, time: '10:36 ص' },
]

export default function ChatPage({ navigate, data }: ChatPageProps) {
  const [activeConv, setActiveConv] = useState(conversations[0])
  const [messages, setMessages] = useState<Message[]>(initMessages)
  const [input, setInput] = useState('')
  const [showOffer, setShowOffer] = useState(false)
  const [offerVal, setOfferVal] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages((prev) => [...prev, { id: prev.length + 1, sender: 'buyer', text: input, time: 'الآن' }])
    setInput('')
  }

  const sendOffer = () => {
    if (!offerVal) return
    setMessages((prev) => [...prev, { id: prev.length + 1, sender: 'buyer', offer: { amount: Number(offerVal), status: 'pending' }, time: 'الآن' }])
    setOfferVal('')
    setShowOffer(false)
  }

  const respondOffer = (msgId: number, action: 'accepted' | 'rejected') => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId && m.offer ? { ...m, offer: { ...m.offer, status: action } } : m
      )
    )
    if (action === 'accepted') {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, sender: 'system', text: `🎉 تم الاتفاق على السعر ${messages.find((m) => m.id === msgId)?.offer?.amount} د.ل`, time: 'الآن' },
        ])
      }, 300)
    }
  }

  return (
    <div className="min-h-screen bg-obsidian pt-16 pb-16 md:pb-0 flex">
      {/* Sidebar */}
      <aside className="w-72 border-l border-white/8 flex-shrink-0 hidden md:flex flex-col bg-surface/60 backdrop-blur-sm">
        <div className="p-4 border-b border-white/8">
          <h2 className="font-bold text-white">الرسائل</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConv(conv)}
              className={`w-full text-right p-4 border-b border-white/5 transition-colors flex gap-3 ${
                activeConv.id === conv.id ? 'bg-brand/8 border-r-2 border-r-brand' : 'hover:bg-white/4'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-brand/15 border border-brand/25 flex items-center justify-center text-brand-light font-bold flex-shrink-0">
                {conv.seller.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-sm truncate">{conv.seller.name}</span>
                  <span className="text-[11px] text-slate-600 flex-shrink-0">{conv.time}</span>
                </div>
                <div className="text-xs text-slate-500 truncate mt-0.5">{conv.product.title}</div>
                <div className="text-xs text-slate-600 truncate mt-0.5">{conv.lastMsg}</div>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-accent text-obsidian text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-1">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="glass border-b border-white/8 p-4 flex items-center gap-3">
          <button
            onClick={() => navigate('product', { product: activeConv.product })}
            className="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity"
          >
            <img src={activeConv.product.image} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/10" />
            <div>
              <div className="font-bold text-white text-sm">{activeConv.product.title}</div>
              <div className="text-accent font-black text-sm">{activeConv.product.price} د.ل</div>
            </div>
          </button>
          <div className="text-sm text-slate-500 hidden sm:block">
            {activeConv.seller.name} · ⭐ {activeConv.seller.rating}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => {
            if (msg.sender === 'system') {
              return (
                <div key={msg.id} className="text-center">
                  <span className="inline-block px-4 py-2 bg-success/10 text-success text-sm font-semibold rounded-full border border-success/20">
                    {msg.text}
                  </span>
                </div>
              )
            }

            if (msg.offer) {
              return (
                <div key={msg.id} className={`flex ${msg.sender === 'buyer' ? 'justify-start' : 'justify-end'}`}>
                  <div className="max-w-xs">
                    <div className="glass border-2 border-accent/30 rounded-2xl p-4">
                      <div className="text-xs font-bold text-accent mb-1">عرض سعر</div>
                      <div className="text-2xl font-black text-white">{msg.offer.amount} <span className="text-base font-bold text-slate-500">د.ل</span></div>
                      {msg.offer.status === 'pending' && msg.sender === 'seller' && (
                        <div className="flex gap-2 mt-3">
                          <button onClick={() => respondOffer(msg.id, 'accepted')} className="flex-1 py-1.5 bg-success text-white font-bold rounded-lg text-sm">قبول</button>
                          <button onClick={() => respondOffer(msg.id, 'rejected')} className="flex-1 py-1.5 bg-error/15 text-error font-bold rounded-lg text-sm">رفض</button>
                        </div>
                      )}
                      {msg.offer.status === 'accepted' && (
                        <div className="mt-2 px-3 py-1.5 bg-success/10 text-success text-xs font-bold rounded-lg text-center border border-success/20">✓ تم القبول</div>
                      )}
                      {msg.offer.status === 'rejected' && (
                        <div className="mt-2 px-3 py-1.5 bg-error/10 text-error text-xs font-bold rounded-lg text-center">✗ تم الرفض</div>
                      )}
                      {msg.offer.status === 'pending' && msg.sender === 'buyer' && (
                        <div className="mt-2 text-xs text-slate-500 text-center">في انتظار رد البائع...</div>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-600 mt-1 px-1">{msg.time}</div>
                  </div>
                </div>
              )
            }

            return (
              <div key={msg.id} className={`flex ${msg.sender === 'buyer' ? 'justify-start' : 'justify-end'}`}>
                <div className="max-w-xs lg:max-w-sm">
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'buyer'
                      ? 'glass border border-white/10 text-slate-200 rounded-tr-sm'
                      : 'bg-brand text-white rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-slate-600 mt-1 px-1 ${msg.sender === 'seller' ? 'text-left' : ''}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {showOffer && (
          <div className="glass border-t border-white/8 p-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="أدخل عرض السعر..."
                value={offerVal}
                onChange={(e) => setOfferVal(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-white/6 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-accent/40"
              />
              <span className="text-sm font-bold text-slate-500">د.ل</span>
              <button onClick={sendOffer} className="px-4 py-2.5 bg-accent/20 border border-accent/30 text-accent font-bold rounded-xl text-sm hover:bg-accent/30 transition-colors">
                إرسال
              </button>
              <button onClick={() => setShowOffer(false)} className="px-3 py-2.5 glass border border-white/10 rounded-xl text-sm text-slate-400">
                إلغاء
              </button>
            </div>
          </div>
        )}

        <div className="glass border-t border-white/8 p-4 flex items-center gap-2">
          <button
            onClick={() => setShowOffer(!showOffer)}
            className="flex-shrink-0 px-3 py-2.5 glass border border-accent/25 rounded-xl text-sm font-semibold text-accent hover:bg-accent/10 transition-colors"
          >
            إرسال عرض
          </button>
          <input
            type="text"
            placeholder="اكتب رسالة..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            className="flex-1 px-4 py-2.5 bg-white/6 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-accent/40 transition-all"
          />
          <button
            onClick={send}
            className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center hover:bg-brand-light glow-brand transition-all flex-shrink-0"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
