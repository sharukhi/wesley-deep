'use client'

import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import type { CloudinaryGalleryItem } from '@/lib/cloudinary'

type GalleryProps = {
  items: CloudinaryGalleryItem[]
  onOpen: (index: number) => void
  variant?: 'home' | 'archive'
}

function RevealImage({ item, index, onOpen }: { item: CloudinaryGalleryItem; index: number; onOpen: (index: number) => void }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible')
        observer.disconnect()
      }
    }, { threshold: 0.14 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <figure ref={ref} className={`gallery-item gallery-item--${item.ratio}`} style={{ '--reveal-delay': `${Math.min(index, 8) * 90}ms` } as React.CSSProperties}>
      <button className="gallery-button" type="button" onClick={() => onOpen(index)} aria-label={`Open portfolio image ${index + 1}`}>
        <img src={item.src} alt={item.alt} loading={index < 2 ? 'eager' : 'lazy'} />
      </button>
    </figure>
  )
}

export function PortfolioGallery({ items, onOpen, variant = 'archive' }: GalleryProps) {
  if (!items.length) {
    return <p className="gallery-empty">New work is arriving soon. Check back for the latest collection.</p>
  }

  return <div className={`gallery-grid gallery-grid--${variant}`}>{items.map((item, index) => <RevealImage key={item.publicId} item={item} index={index} onOpen={onOpen} />)}</div>
}

export function Lightbox({ items, index, onClose, onChange }: { items: CloudinaryGalleryItem[]; index: number; onClose: () => void; onChange: (index: number) => void }) {
  const item = items[index]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onChange((index + 1) % items.length)
      if (event.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
    }
    document.body.classList.add('lightbox-open')
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.classList.remove('lightbox-open'); window.removeEventListener('keydown', onKeyDown) }
  }, [index, items.length, onChange, onClose])

  if (!item) return null

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Portfolio image viewer" onClick={onClose}>
      <button className="lightbox-close" type="button" onClick={onClose} aria-label="Close image viewer"><X size={22} strokeWidth={1.5} /></button>
      <button className="lightbox-arrow lightbox-arrow--left" type="button" onClick={(event) => { event.stopPropagation(); onChange((index - 1 + items.length) % items.length) }} aria-label="Previous image"><ArrowLeft size={22} strokeWidth={1.5} /></button>
      <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}><img src={item.src} alt={item.alt} /><figcaption><span>Portfolio / Wesley Deep Biswas</span><span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span></figcaption></figure>
      <button className="lightbox-arrow lightbox-arrow--right" type="button" onClick={(event) => { event.stopPropagation(); onChange((index + 1) % items.length) }} aria-label="Next image"><ArrowRight size={22} strokeWidth={1.5} /></button>
    </div>
  )
}
