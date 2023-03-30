import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { GetStaticProps } from "next"

interface BookProps {
  book: {
    src: string
    title: string
    subtitle: string
    authors: string
    publisher: string
    publishedDate: string
    description: string
    categories: string[]
  }
}

export default function Books({ book }: BookProps) {
  return (
    <>
      <Head>
        <title>BookName - BookSearch</title>
      </Head>

      <section className="flex flex-col mx-3 my-14 rounded-md gap-2 justify-center">
        <section className="flex bg-gradient-to-b from-[#181c38] to-[#0c0d1b] bg-no-repeat h-fit rounded-md p-1 float-right">
          <div className="p-2">
            <Image className="w-[12rem] h-auto rounded-md" height={120} width={120} quality={100} priority src={book.src} alt="">
            </Image>
            <div className="flex flex-col mb-2 mt-4">
              <span className="mb-2 text-center border-b border-[#9a9a9b]">Categories</span>
              <div className="flex flex-col ">
                {book.categories.map(txt => (
                  <span key={txt} className="text-sm">{txt}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center p-2">
            <div>
            </div>
            <div className="mb-2">
              <h1 className="mb-1 text-2xl font-bold">{book.title}</h1>
              <span title="Authors">{book.authors}</span>
            </div>
            <div className="flex gap-2 flex-col">
              <span className="text-sm text-[#717275]" title="Publisher"><span>Publisher:</span> {book.publisher}</span>
              <span className="text-sm text-[#717275] mb-4" title="Date"><span>Date:</span> {book.publishedDate}</span>
              <Link
                href='/'
                target="_blank"
                className="rounded-md mb-6 py-1 w-full text-center text-[#dbdff1] font-bold outline-1 outline outline-[#8486dd] bg-gradient-to-r from-[#6674c4] via-[#07aac7] to-[#6674c4]"
              >
                BUY
              </Link>
              <span className="mb-2 w-full text-center rounded-md outline-1 outline opacity-40 cursor-not-allowed">Ebook</span>
              <span className="mb-2 w-full text-center rounded-md outline-1 outline text-blue-400">For Sale</span>
              <span className="mb-2 w-full text-center rounded-md outline-1 outline text-red-700 ">18+</span>
            </div>

          </div>
        </section>
        <section className="p-2">
          <h2 className="mb-2 text-lg text-center font-semibold">{book.subtitle}</h2>
          <p className="text-sm">
            {book.description.
              replaceAll('<p>', '')
              .replaceAll('</p>', '')
              .replaceAll('<i>', '')
              .replaceAll('</i>', '')}
          </p>
        </section>
      </section>
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'htJWZnjQ36IC' } } // optional
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const bookId = params?.id

  const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.NEXT_PUBLIC_KEY}`)

  return {
    props: {
      book: {
        src: res.data.volumeInfo.imageLinks.thumbnail,
        title: res.data.volumeInfo.title,
        subtitle: res.data.volumeInfo.subtitle,
        authors: res.data.volumeInfo.authors,
        publisher: res.data.volumeInfo.publisher,
        publishedDate: res.data.volumeInfo.publishedDate,
        description: res.data.volumeInfo.description,
        categories: res.data.volumeInfo.categories,
      }
    }
  }
}