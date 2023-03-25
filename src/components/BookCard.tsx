import Image from "next/image"
import no_cover from "../../public/no_cover_thumb.png"

interface BookCardProps {
  title: string
  author: string
  language: string
  categories: string
  snippet: string
  src: string
}

export function BookCard({ title, author, language, categories, snippet, src }: BookCardProps) {

  return (
    <div className="flex w-[21rem] lg:w-[24rem] p-3 gap-4 mb-4 bg-[#171c30] rounded-lg">
      {src
        ? <Image src={src} width={100} height={150} alt="" title="book cover" className="rounded-lg h-[9rem] w-[auto]" />
        : <Image src={no_cover} width={100} height={150} alt="" title="book cover" className="rounded-lg h-[9rem] w-[auto]" />}
      <div>
        <h1 className="font-bold text-xl line-clamp-1" title="title">{title}</h1>
        {author
          ? <span className="opacity-70 line-clamp-1" title="author">{author + " "}</span>
          : <span className="opacity-70" title="author">Author not available.</span>}
        <div className="flex flex-row items-start text-xs my-1 gap-2">
          <span className="outline-1 outline outline-[#8486dd] rounded-md py-1 px-2" title="language">{language.toUpperCase()}</span>
          {categories
            ? <span className="outline-1 outline outline-[#8486dd] rounded-md py-1 px-2" title="categories">{categories}</span>
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