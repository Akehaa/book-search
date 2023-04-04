import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import { GetStaticProps } from "next"
import no_cover from "../../assets/no_cover_thumb.png"
import { useEffect, useState } from "react"
import { NextSeo } from "next-seo"

interface BookProps {
  book: {
    src: string
    title: string | null
    subtitle?: string
    authors?: string
    publisher?: string
    publishedDate?: string
    description?: string
    categories?: string[]
    infoLink: string
    saleability: string
    isEbook: boolean
    maturityRating: string
  }
}

export default function Books({ book }: BookProps) {
  const [isForSale, setIsForSale] = useState(true)
  const [isMature, setIsMature] = useState(false)
  const [title, setTitle] = useState('')

  useEffect(() => {
    setTitle(`${book.title} | BookSearch`)

    if (book.maturityRating == 'MATURE') {
      setIsMature(true)
    } else if (book.maturityRating == 'NOT_MATURE') {
      setIsForSale(false)
    };
  }, [])

  useEffect(() => {
    if (book.saleability == 'FOR_SALE') {
      setIsForSale(true)
    } else if (book.saleability == 'NOT_FOR_SALE') {
      setIsForSale(false)
    }
  }, [])

  return (
    <>
      <NextSeo
        title={title}
      />

      <section className="flex flex-col mx-3 my-14 md:w-2/3  xl:w-2/5 2xl:w-[35%] lg:mx-auto max-w-[40rem] rounded-md gap-2 justify-center items-center border-t border-[#1d2141] bg-gradient-to-b from-[#181c38] to-[#0c0d1b] bg-no-repeat border">
        <section className="rounded-md flex w-full justify-center p-1">
          <div className="p-2">
            <div className="flex justify-center">
              {book.src
                ? <Image className="min-w-[9rem] w-auto h-auto rounded-md" width={160} height={0} quality={100} priority src={book.src} alt="">
                </Image>
                : <Image className="w-[9rem] h-auto rounded-md" width={160} height={0} quality={100} priority src={no_cover} alt="">
                </Image>
              }
            </div>
            <div className="flex flex-col mt-4">
              <span className="mb-1 text-center">Categories</span>
              <div className="flex flex-col border-b border-t border-[#9a9a9b] ">
                {book.categories
                  ? book.categories.map(txt => (
                    <span key={txt} className="text-sm first:mt-2 last:mb-2">{txt}</span>
                  ))
                  : <span className="text-sm">Categories not available.</span>
                }
              </div>
            </div>
          </div>
          <div className="flex flex-col p-2">
            <div>
            </div>
            <div className="flex flex-col mb-2">
              <h1 className="mb-1 text-2xl font-bold">{book.title}</h1>
              {book.authors
                ? <span className="mb-1" title="Authors">{book.authors + " "}</span>
                : <span className="mb-1" title="Authors">Author not available.</span>
              }
              {book.publisher
                ? <span className="text-sm mb-1 text-[#717275]" title="Publisher"><span>Publisher:</span> {book.publisher}</span>
                : <span className="text-sm mb-1 text-[#717275]" title="Publisher"><span>Publisher:</span> Not available.</span>
              }
              {book.publishedDate
                ? <span className="text-sm text-[#717275] mb-4" title="Date"><span>Date:</span> {book.publishedDate}</span>
                : <span className="text-sm text-[#717275] mb-4" title="Date"><span>Date:</span> Not available.</span>
              }
            </div>
            <div className="flex gap-2 flex-col items-center">

              <Link
                href={book.infoLink}
                target="_blank"
                className="rounded-md mb-6 py-1 md:px-2 w-full hover:opacity-80 text-center  text-[#dbdff1] font-bold outline-1 outline outline-[#8486dd] bg-gradient-to-r from-[#6674c4] via-[#07aac7] to-[#6674c4] duration-200"
              >
                SEE ON GOOGLE PLAY
              </Link>
              {book.isEbook
                ? <span className="mb-2 w-full text-center rounded-md outline-1 outline text-blue-400 cursor-default" title="available">Ebook: Yes</span>
                : <span className="mb-2 w-full text-center rounded-md outline-1 outline opacity-25 cursor-not-allowed">Ebook: No</span>
              }
              {isForSale
                ? <span className="mb-2 w-full text-center rounded-md outline-1 outline text-blue-400 cursor-default">For Sale: Yes</span>
                : <span className="mb-2 w-full text-center rounded-md outline-1 outline opacity-25 cursor-not-allowed">For Sale: No</span>
              }
              {isMature
                ? <span className="mb-2 w-full text-center rounded-md outline-1 outline text-red-700 cursor-default" title="maturity rating">18+</span>
                : <span className="mb-2 w-full text-center rounded-md outline-1 outline text-green-700 cursor-default" title="maturity rating">For all ages</span>
              }
            </div>
          </div>
        </section>
        <section className="p-2 mb-2 flex flex-col items-center">
          <h2 className="mb-2 text-lg font-semibold">{book.subtitle}</h2>
          {book.description
            ? <p className=" px-2 text-sm">
              {book.description.
                replaceAll('<p>', '')
                .replaceAll('</p>', '')
                .replaceAll('<i>', '')
                .replaceAll('</i>', '')
                .replaceAll('<br>', '')
                .replaceAll('</br>', '')
                .replaceAll('<li>', '')
                .replaceAll('</li>', '')
                .replaceAll('<ul>', '')
                .replaceAll('</ul>', '')
              }
            </p>
            : <p className="text-sm">Description not available.</p>
          }
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
        src: res.data.volumeInfo.imageLinks?.thumbnail || null,
        title: res.data.volumeInfo.title,
        subtitle: res.data.volumeInfo.subtitle || null,
        authors: res.data.volumeInfo.authors || null,
        publisher: res.data.volumeInfo.publisher || null,
        publishedDate: res.data.volumeInfo.publishedDate || null,
        description: res.data.volumeInfo.description || null,
        categories: res.data.volumeInfo.categories || null,
        infoLink: res.data.volumeInfo.infoLink || null,
        saleability: res.data.saleInfo.saleability,
        isEbook: res.data.saleInfo.isEbook,
        maturityRating: res.data.volumeInfo.maturityRating,
      }
    },
  }
}