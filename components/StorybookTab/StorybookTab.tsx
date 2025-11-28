import Image from 'next/image'
import Link from 'next/link'

export default function StorybookTab() {
  return (
    <div
      className="sticky bottom-14 left-0 z-50 opacity-80 transition-opacity duration-150 ease-out hover:opacity-100"
      aria-label="Open Storybook design system"
    >
      <Link
        href="/storybook"
        prefetch={false}
        className="inline-flex -translate-x-[70%] items-center gap-2 rounded-br-full rounded-tr-full bg-gray-100 px-4 py-4 text-gray-900 no-underline shadow-md transition-transform duration-150 ease-out hover:translate-x-0"
      >
        <span className="whitespace-nowrap text-lg leading-none">Design system</span>
        <Image src="/storybook.svg" alt="" width={32} height={32} className="block" />
      </Link>
    </div>
  )
}
