import Image from "next/image";
import Header from "../components/header";
import outlinelogo_removebg_preview from "../public/outlinelogo-removebg-preview.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-mono)]">
      <Header />
      <h1 className="text-2xl mb-2">
        Theta Tau Omega Epsilon Chapter
      </h1>
      <p className="text-lg mb-8">
        Chapter and Financial Management Tool
      </p>
      <Image src={outlinelogo_removebg_preview} alt="Theta Tau Logo" width={170} height={170} />
      <Link href="/login">
        <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </Link>
    </div>
  );
}
