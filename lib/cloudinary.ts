import { v2 as cloudinary } from 'cloudinary'

export type CloudinaryGalleryItem = {
  publicId: string
  width: number
  height: number
  createdAt: string
  src: string
  alt: string
  ratio: 'landscape' | 'portrait' | 'square'
}

const folder = 'portfolio-gallery'

function isConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  )
}

function missingConfig() {
  return ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'].filter(
    (key) => !process.env[key],
  )
}

function getRatio(width: number, height: number): CloudinaryGalleryItem['ratio'] {
  const ratio = width / height
  if (ratio > 1.25) return 'landscape'
  if (ratio < 0.8) return 'portrait'
  return 'square'
}

export async function getCloudinaryGallery(): Promise<CloudinaryGalleryItem[]> {
  if (!isConfigured()) {
    console.error('[v0] Cloudinary gallery is not configured. Missing:', missingConfig())
    return []
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })

  try {
    const result = await cloudinary.search
      .expression(`folder:${folder} AND resource_type:image AND type:upload`)
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute()

    console.log('[v0] Cloudinary gallery loaded:', {
      folder,
      count: result.resources?.length ?? 0,
    })

    return (result.resources ?? []).map((resource: {
      public_id: string
      width?: number
      height?: number
      created_at?: string
    }) => {
      const width = resource.width ?? 1
      const height = resource.height ?? 1
      return {
        publicId: resource.public_id,
        width,
        height,
        createdAt: resource.created_at ?? '',
        src: cloudinary.url(resource.public_id, {
          secure: true,
          resource_type: 'image',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        }),
        alt: 'Wesley Deep photography portfolio image',
        ratio: getRatio(width, height),
      }
    })
  } catch (error) {
    console.error('[v0] Cloudinary gallery fetch failed:', error)
    return []
  }
}
