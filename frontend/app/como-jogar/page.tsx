import Link from "next/link";

export default function HowToPlay() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,100,100,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(100,100,255,0.12),transparent_40%)] pointer-events-none" />

      {/* Card central */}
      <div className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-8 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-black mb-6 text-center">
          Como jogar
        </h2>

        <ul className="space-y-4 text-lg sm:text-xl text-white/90">
          <li>• Todo mundo recebe a mesma palavra… menos um</li>
          <li>• Discuta e vote em quem é o impostor</li>
          <li className="mt-4">
            • Acertou: <span className="text-green-400 font-semibold">+10</span>{" "}
            pontos<br />
            • Errou: <span className="text-red-400 font-semibold">-5</span>{" "}
            pontos<br />
            • Pulou: <span className="text-white/70">0</span> pontos
          </li>
          <li className="mt-4">
            • O <span className="text-orange-400 font-semibold">impostor</span>{" "}
            ganha pontos se não for descoberto
          </li>
        </ul>

        {/* Voltar */}
        <div className="mt-10 flex justify-center">
        <Link href="/">
            <button
            className="
                px-10 py-4 rounded-2xl font-semibold text-lg
                bg-white/10 backdrop-blur-md border-2 border-white/30
                hover:bg-white/20 hover:border-white/60
                transform hover:scale-105 active:scale-95
                transition-all duration-300
            "
            >
            Voltar
            </button>
        </Link>
        </div>
      </div>
    </main>
  );
}