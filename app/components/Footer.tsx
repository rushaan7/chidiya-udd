import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#3d405b] dark:bg-[#1E1E1E] text-white py-2 px-4 transition-colors duration-200 dark:border-t dark:border-white">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <div className="text-sm sm:text-base order-2 sm:order-1">
          With ❤️{" "}
          <Link
            href="https://www.linkedin.com/in/rushaan-khan/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#fee440] transition-colors"
          >
            Rushan Khan
          </Link>
        </div>
        <div className="text-sm sm:text-base order-3 sm:order-2">
          <Link href="/documentation" className="underline hover:text-[#fee440] transition-colors">
            Documentation
          </Link>
        </div>
        <div className="flex items-center text-sm sm:text-base order-1 sm:order-3">
          <span className="mr-2">Made using</span>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/v0-y9saCryUoB1WXM18v3pOaaoiMaItpT.webp"
            alt="v0 logo"
            width={20}
            height={20}
            unoptimized
          />
        </div>
      </div>
    </footer>
  )
}

