import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

export default function MovieImage({ src, alt, ...props }: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  return (
    <Image
      src={imgSrc}
      alt={alt}
      {...props}
      onError={() => setImgSrc('/no-image.svg')}
    />
  )
}
