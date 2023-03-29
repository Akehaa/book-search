import Image from "next/image"
import Link from "next/link"
import no_cover from "../assets/no_cover_thumb.png"

interface BookCardProps {
  id: string
  title: string
  author: string
  language: string
  categories: string
  snippet: string
  src: string
}

export function BookCard({ id, title, author, language, categories, snippet, src }: BookCardProps) {

  return (
    <div className="flex w-[21.5rem] hover:w-[22.5rem] lg:w-[24rem] lg:hover:w-[25.5rem] mb-4 bg-[#171c30] rounded-[0.250rem] shadow-lg shadow-[#070913] hover:shadow-xl hover:shadow-[#05060a] duration-200">
      <Link
        href={`/book/${id}`}
        target="_blank"
      >
        {src
          ? <Image src={src} quality={100} width={100} height={150} alt="" className="cursor-pointer rounded-l-[0.250rem] h-[10.5rem] min-w-[8rem] " />
          : <Image src={no_cover} width={100} height={150} alt="" className="cursor-pointer rounded-l-[0.250rem] h-[10.5rem] min-w-[8rem]" />
        }
      </Link>
      <div className="py-2 pl-3 pr-2">
        <Link 
        href={`/book/${id}`}
        target="_blank"
        title="see more about"
        >
          <h1 className="font-bold text-xl line-clamp-1">{title}</h1>
        </Link>
        {author
          ? <span className="opacity-70 line-clamp-1" title="author">{author + " "}</span>
          : <span className="opacity-70" title="author">Author not available.</span>}
        <div className="flex flex-row items-start text-xs my-1 gap-2">
          <span className="outline-1 outline outline-[#8486dd] rounded-md py-1 px-2 mb-1" title="language">{language.toUpperCase()}</span>
          {categories
            ? <span className="line-clamp-1 outline-1 outline outline-[#8486dd] rounded-md py-1 px-2" title="categories">{categories}</span>
            : null}
        </div>
        {snippet
          ? <p className="line-clamp-3 text-sm" title="snippet">{snippet}</p>
          : <p className="text-sm">This book has no description available.</p>
        }
      </div>
    </div>
  )
}