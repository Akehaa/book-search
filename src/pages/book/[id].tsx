import axios from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Books() {
  const { query } = useRouter()
  const bookId = query.id

  const [bookData, setBookData] = useState([])

  console.log(bookData)

  useEffect(() => {
    if (bookId) {
      axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.NEXT_PUBLIC_KEY}`)
        .then(data => {
          setBookData(data.data)
        })
    }
  }, [bookId])

  return (
    <>
      <Head>
        <title>BookName - BookSearch</title>
      </Head>

      <main className="flex mx-3 my-14 rounded-md gap-2 justify-center">
        <aside className="bg-gradient-to-b from-[#181c38] to-[#0c0d1b] bg-no-repeat h-fit rounded-md p-1">
          <div className="p-2">
            <Image className="w-[21rem] h-auto rounded-md" height={120} width={120} quality={100} src={bookData.volumeInfo?.imageLinks.large} alt="">
            </Image>
          </div>
          <div className="flex flex-col items-center p-2">
            <Link
              href='/'
              target="_blank"
              className="rounded-md mb-4 py-1 w-full text-center text-[#dbdff1] font-bold outline-1 outline outline-[#8486dd] bg-gradient-to-r from-[#6674c4] via-[#07aac7] to-[#6674c4]"
            >
              BUY
            </Link>
            <div>
            </div>
            <span className="mb-2 w-full text-center rounded-md outline-1 outline opacity-40 cursor-not-allowed">Ebook</span>
            <span className="mb-2 w-full text-center rounded-md outline-1 outline text-blue-400">For Sale</span>
            <span className="w-full text-center rounded-md outline-1 outline text-red-700 ">18+</span>
          </div>
        </aside>
        <section className="w-full">
          <header className="mb-4 pt-4">
            <div className="mb-2">
              <h1 className="mb-1 text-2xl font-bold">title</h1>
              <h2 className="mb-1 text-lg">subtitle</h2>
              <span>Authors</span>
            </div>
            <div className="flex gap-2">
              <span className="text-sm text-[#717275]">Publisher</span>
              <span className="text-sm text-[#717275]">PublishedDate</span>
            </div>
          </header>
          <p className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti reiciendis maiores non minus dignissimos saepe sequi quos est ipsam voluptas quidem voluptates velit illo consectetur quam illum doloribus, fuga sit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </section>
      </main>
    </>
  )
}