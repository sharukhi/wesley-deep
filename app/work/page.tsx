import { ArrowLeft } from 'lucide-react'
import siteConfig from '@/site-config.json'
import { getCloudinaryGallery } from '@/lib/cloudinary'
import { GalleryExperience } from '@/components/gallery-experience'

export const revalidate = 300

export default async function WorkPage() {
  const gallery = await getCloudinaryGallery()

  return (
    <main>
      <header className="archive-header"><a href="/" className="archive-back"><ArrowLeft size={15} strokeWidth={1.4} /> Back home</a><a href="/" className="wordmark" aria-label={`${siteConfig.site.name} home`}>WESLEY DEEP<span>PHOTOGRAPHY</span></a><a href={`mailto:${siteConfig.site.email}`} className="archive-email">{siteConfig.site.email}</a></header>
      <GalleryExperience items={gallery} variant="archive" />
    </main>
  )
}
