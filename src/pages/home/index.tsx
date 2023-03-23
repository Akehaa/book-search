import { MagnifyingGlass } from "phosphor-react";

export default function Home() {
  return (
    <div>
      <form className="flex justify-center items-center mt-32">
        <input
          type="text"
          placeholder="Search by name, author or both"
          alt="You can search by name, author or both"
          className="w-[19rem] xl:w-[32rem] py-[0.875rem] pl-4 placeholder:text-base bg-[#0c0d1b] outline outline-1 outline-[#3c3b8a] rounded-lg focus:outline focus:outline-1 focus:outline-[#1f7eb4]" />
        <button className=" text-[#bbbfcf] focus:text-[#1f7eb4] hover:text-[#1f7eb4] cursor-pointer">
          <MagnifyingGlass className="text-[1.8rem] ml-[-2.5rem]" alt="Search" />
        </button>
      </form>
    </div>
  )
}
