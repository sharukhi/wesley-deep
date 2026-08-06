'use client'

import { useEffect, useState } from 'react'
import siteConfig from '@/site-config.json'

export function HeroVideo() {
  const [videoIndex, setVideoIndex] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setVideoIndex(Math.floor(Math.random() * siteConfig.hero.videos.length))
  }, [])

  return <video key={videoIndex} className={`hero-video${ready ? ' is-ready' : ''}`} autoPlay muted loop playsInline poster={siteConfig.hero.poster} aria-hidden="true" onCanPlay={() => setReady(true)}><source src={siteConfig.hero.videos[videoIndex]} type="video/mp4" /></video>
}
