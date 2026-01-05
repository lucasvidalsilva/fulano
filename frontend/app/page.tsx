import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white flex flex-col items-center justify-center px-5 sm:px-8 relative overflow-hidden gap-6 md:gap-10">
      {" "}
      {/* Fundo decorativo sutil */}{" "}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,100,100,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(100,100,255,0.12),transparent_40%)] pointer-events-none" />{" "}
      {/* Logo com animação leve */}{" "}
      <div className="relative mt-4 sm:mt-8 md:mt-12 animate-pulse-slow">
        {" "}
        <Image
          src="/logo-fulano.svg"
          alt="Fulano Online"
          width={160}
          height={160}
          priority
          className="drop-shadow-[0_0_25px_rgba(255,140,0,0.6)]"
        />{" "}
        {/* Olhinhos "sus" pequenos no logo */}{" "}
        <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 text-5xl md:text-6xl animate-bounce">
          👀
        </div>{" "}
      </div>{" "}
      {/* Nome do produto */}{" "}
      <span className="text-2xl sm:text-3xl font-bold tracking-wider mb-6 opacity-90">
        {" "}
        fulano<span className="opacity-60">.online</span>{" "}
      </span>{" "}
      {/* Headline impactante */}{" "}
      <h1 className="text-center leading-tight mb-14">
        {/* Linha principal — mais forte */}
        <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
          Alguém é o{" "}
          <span className="text-orange-400 drop-shadow-[0_0_25px_#fb923c] animate-glow">
            impostor
          </span>.
        </span>
        <span className="block mt-6 text-2xl sm:text-3xl md:text-4xl font-semibold text-white/85">
          Descubra quem...
        </span>
        <span className="block mt-2 text-xl sm:text-2xl md:text-3xl font-medium text-white/70">
          antes que seja tarde.
        </span>
      </h1>
      {/* Botões animados – mais largos */}{" "}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 w-full max-w-lg mx-auto justify-center items-center">
        {" "}
        <Link href="/criar-sala" className="w-full">
          {" "}
          <button className=" w-full sm:w-auto py-6 px-14 rounded-2xl font-bold text-xl sm:text-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transform hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(251,146,60,0.6)] hover:shadow-[0_20px_50px_rgba(251,146,60,0.8)] transition-all duration-300 whitespace-nowrap ">
            {" "}
            Criar Sala{" "}
          </button>{" "}
        </Link>{" "}
        <Link href="/entrar-sala" className="w-full">
          {" "}
          <button className=" w-full sm:w-auto py-6 px-14 rounded-2xl font-bold text-xl sm:text-2xl bg-white/10 backdrop-blur-md border-2 border-white/40 hover:bg-white/20 hover:border-white/60 transform hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap ">
            {" "}
            Entrar em Sala{" "}
          </button>{" "}
        </Link>{" "}
      </div>{" "}
      {/* Link Como jogar */}{" "}
      <Link
        href="/como-jogar"
        className="mt-12 text-xl text-orange-300 hover:text-orange-200 underline-offset-4 decoration-orange-500/60 hover:decoration-orange-300 transition-colors"
      >
        {" "}
        Como jogar? (rápido e fácil!){" "}
      </Link>{" "}
    </main>
  );
}
