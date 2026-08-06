'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import siteConfig from '@/site-config.json'
import type { CloudinaryGalleryItem } from '@/lib/cloudinary'
import { Lightbox, PortfolioGallery } from './portfolio-gallery'

export function GalleryExperience({ items, variant = 'home' }: { items: CloudinaryGalleryItem[]; variant?: 'home' | 'archive' }) {
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const isHome = variant === 'home'

  return (
    <section className={`work-section work-section--${variant}`} id="work">
      <div className="section-heading"><p className="eyebrow">{siteConfig.work.eyebrow}</p><h2>{siteConfig.work.title[0]}<br /><em>{siteConfig.work.title[1]}</em></h2><p className="section-note">{siteConfig.work.note}</p></div>
      <PortfolioGallery items={items} onOpen={setActiveImage} variant={variant} />
      {isHome && <a className="text-link gallery-more-link" href="/work">View the full archive <ArrowRight size={15} strokeWidth={1.4} /></a>}
      {activeImage !== null && <Lightbox items={items} index={activeImage} onClose={() => setActiveImage(null)} onChange={setActiveImage} />}
    </section>
  )
}
