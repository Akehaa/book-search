import { BookCard } from "@/components/BookCard";
import axios from "axios";
import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";

export default function Home() {
  const [book, setBook] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const book = event.target.value;

    setBook(book)
  }

  console.log(searchResult)

  function handleSubmit(event: any) {
    event.preventDefault()

    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${process.env.NEXT_PUBLIC_KEY}&maxResults=40`)
      .then(data => {
        setSearchResult(data.data.items)
      })
  }

  return (
    <div className="flex flex-col items-center ">
      <form className="mt-32 mb-16 flex" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search by name"
          alt="Search by name"
          className="w-[19rem] xl:w-[32rem] py-[0.875rem] pl-4 placeholder:text-base bg-[#0c0d1b] outline outline-1 outline-[#3c3b8a] rounded-lg focus:outline focus:outline-1 focus:outline-[#1f7eb4]" />
        <button className=" text-[#bbbfcf] focus:text-[#1f7eb4] hover:text-[#1f7eb4] cursor-pointer">
          <MagnifyingGlass className="text-[1.6rem] ml-[-2.5rem]" alt="Search" type="submit" />
        </button>
      </form>


      {searchResult.map(book => (
        <BookCard
          key={book.id}
          src={book.volumeInfo.imageLinks?.thumbnail}
          title={book.volumeInfo.title}
          author={book.volumeInfo.authors}
          language={book.volumeInfo.language}
          snippet={book.volumeInfo.description}
        />
      ))}

    </div>
  )
}
