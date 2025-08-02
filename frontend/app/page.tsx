import Image from "next/image";
import Link from "next/link";
import outlinelogo_removebg_preview from "../public/outlinelogo-removebg-preview.png";
import "./styles/globals.css";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#5c1f1f] via-[#3d1414] to-[#5c1f1f] text-white px-6">
      <div className="mb-6 flex flex-col items-center">
        <Image
          src={outlinelogo_removebg_preview}
          alt="Theta Tau Logo"
          width={140}
          height={140}
          className="drop-shadow-lg"
        />
      </div>

      <div className="text-center max-w-lg">
        <h1 className="text-3xl font-bold tracking-wide mb-2 text-[#F8E16C]">
          Theta Tau - Omega Epsilon
        </h1>
        <h3 className="text-lg text-gray-200">San José State University</h3>
        <p className="text-sm text-gray-300 mt-4">
          Chapter & Financial Management Tool
        </p>
      </div>

      <div className="mt-10">
        <Link href="/login">
          <button className="bg-transparent hover:bg-[#b22222]/10 transition-colors text-[#F8E16C] font-medium py-2 px-6 rounded-full shadow-md border border-[#F8E16C]/70 cursor-pointer">
            Login
          </button>
        </Link>
      </div>

      {/* Subtle footer */}
      <footer className="absolute bottom-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Theta Tau Omega Epsilon | SJSU
      </footer>
    </div>
  );
}
