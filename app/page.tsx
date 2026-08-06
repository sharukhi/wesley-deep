import { ArrowDown, ArrowRight, Mail } from 'lucide-react'
import siteConfig from '@/site-config.json'
import { getCloudinaryGallery } from '@/lib/cloudinary'
import { HeroVideo } from '@/components/hero-video'
import { GalleryExperience } from '@/components/gallery-experience'

export const revalidate = 300

export default async function Page() {
  const gallery = await getCloudinaryGallery()

  return (
    <main>
      <section className="hero" aria-label={`${siteConfig.site.name} photography introduction`}>
        <HeroVideo />
        <div className="hero-wash" />
        <header className="site-header"><a href="#top" className="wordmark" aria-label={`${siteConfig.site.name} home`}>Wesley Deep Biswas<span>PHOTOGRAPHY</span></a><a href={`mailto:${siteConfig.site.email}`} className="header-contact">Get in touch <Mail size={15} strokeWidth={1.4} /></a></header>
        <div className="hero-copy" id="top"><p className="eyebrow">{siteConfig.site.discipline}</p><h1>Wesley<br />Deep</h1><p className="hero-intro">{siteConfig.hero.intro[0]}<br />{siteConfig.hero.intro[1]}</p></div>
        <a href="#work" className="scroll-cue"><span>Scroll to explore</span><ArrowDown size={16} strokeWidth={1.3} /></a>
      </section>

      <GalleryExperience items={gallery.slice(0, 20)} />

      <section className="about-section" id="about">
        <div className="about-image-wrap"><img src={siteConfig.about.image} alt={siteConfig.about.imageAlt} loading="lazy" /></div>
        <div className="about-copy"><p className="eyebrow">{siteConfig.about.eyebrow}</p><h2>{siteConfig.about.title[0]}<br /><em>{siteConfig.about.title[1]}</em></h2>{siteConfig.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a className="text-link" href={`mailto:${siteConfig.site.email}`}>{siteConfig.about.linkLabel} <ArrowRight size={15} strokeWidth={1.4} /></a></div>
      </section>

      <footer className="site-footer"><div><p className="eyebrow">{siteConfig.footer.eyebrow}</p><a href={`mailto:${siteConfig.site.email}`} className="footer-email">{siteConfig.site.email}</a></div><div className="footer-meta"><nav className="social-links" aria-label="Social links">{siteConfig.site.socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}</nav><p>© {new Date().getFullYear()} {siteConfig.site.name}<br />{siteConfig.site.location}</p></div></footer>
    </main>
  )
}
