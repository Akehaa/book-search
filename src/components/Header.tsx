import { BookBookmark } from "phosphor-react";

export function Header() {
  return (
    <header className="flex justify-center items-center gap-3 pt-[7rem]">
      <BookBookmark className="mt-1 text-blue-400 text-[2rem] md:text-[3.3rem]" />
      <h1 className=" font-extrabold text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#07aac7] to-[#6664c7]">BookSearch</h1>
    </header>
  )
}