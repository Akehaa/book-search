import { BookCard } from "@/components/BookCard";
import axios from "axios";
import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";

interface BookProps {
  id: string
  volumeInfo: {
    imageLinks: {
      thumbnail: string
    }
    title: string
    authors: string
    language: string
    description: string
    categories: string
  }
}

export default function Home() {
  const [book, setBook] = useState("");
  const [searchResult, setSearchResult] = useState<Array<BookProps>>([])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const book = event.target.value;

    setBook(book)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (book) {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${process.env.NEXT_PUBLIC_KEY}&maxResults=40`)
        .then(data => {
          setSearchResult(data.data.items)
        })
    }
  }

  return (
    <div className="flex flex-col items-center ">
      <form className="mt-32 mb-16 flex" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search"
          alt="Search"
          className="w-[19rem] md:w-[32rem] py-[0.875rem] pl-4 placeholder:text-base bg-[#0c0d1b] outline outline-1 outline-[#3c3b8a] rounded-lg focus:outline focus:outline-1 focus:outline-[#1f7eb4]" />
        <button className=" text-[#bbbfcf] focus:text-[#1f7eb4] hover:text-[#1f7eb4] cursor-pointer">
          <MagnifyingGlass className="text-[1.6rem] ml-[-2.5rem]" alt="Search" type="submit" />
        </button>
      </form>
      <main className="flex flex-wrap gap-8 justify-center">
        {searchResult?.map(book => (
          <BookCard
            key={book.id}
            src={book.volumeInfo.imageLinks?.thumbnail}
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors}
            language={book.volumeInfo.language}
            categories={book.volumeInfo.categories}
            snippet={book.volumeInfo.description}
          />
        ))}
      </main>
    </div>
  )
}
