"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const COLORS = [
  "#ef4444", // vermelho
  "#3b82f6", // azul
  "#22c55e", // verde
  "#eab308", // amarelo
  "#a855f7", // roxo
  "#f97316", // laranja
];

function gerarCodigo() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

export default function CreateRoom() {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [impostors, setImpostors] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<{ name?: string; color?: string }>({});
  const router = useRouter();

  function handleCreateRoom() {
    const newErrors: { name?: string; color?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Digite seu nome";
    }

    if (!selectedColor) {
      newErrors.color = "Selecione uma cor";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const code = gerarCodigo();

    // MOCK de backend
    const roomData = {
      code,
      host: {
        name,
        color: selectedColor,
      },
      impostors,
    };

    localStorage.setItem("role", "host");
    localStorage.setItem("room", JSON.stringify(roomData));

    router.push(`/lobby/${code}`);
  }


  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,100,100,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(100,100,255,0.12),transparent_40%)] pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-8 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-black mb-8 text-center">
          Criar Sala
        </h2>

        {/* Nome */}
        <div className="mb-6">
          <label className="block mb-2 text-white/80 font-semibold">
            Seu nome
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 focus:outline-none focus:border-red-400 text-white placeholder:text-white/50"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Escolha de cor */}
        <div className="mb-8">
          <span className="block mb-3 text-white/80 font-semibold">
            Escolha sua cor
          </span>
          <div className="flex gap-4 flex-wrap">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`
                  w-12 h-12 rounded-full
                  border-4 transition-all
                  ${
                    selectedColor === color
                      ? "border-white scale-110"
                      : "border-white/30 hover:scale-105"
                  }
                `}
                style={{ backgroundColor: color }}
              />
            ))}
            {errors.color && (
              <p className="mt-3 text-sm text-red-400">{errors.color}</p>
            )}
          </div>
        </div>

        {/* Quantidade de impostores */}
        <div className="mb-10">
          <span className="block mb-3 text-white/80 font-semibold">
            Quantos impostores?
          </span>
          <div className="flex gap-6">
            {[1, 2].map((value) => (
              <label
                key={value}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="impostors"
                  checked={impostors === value}
                  onChange={() => setImpostors(value as 1 | 2)}
                  className="hidden"
                />
                <div
                  className={`
                    w-6 h-6 rounded-full border-2
                    ${
                      impostors === value
                        ? "border-orange-400 bg-orange-400"
                        : "border-white/40"
                    }
                  `}
                />
                <span className="text-lg">{value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleCreateRoom}
            className="
              px-10 py-4 rounded-2xl font-bold text-lg
              bg-gradient-to-r from-orange-500 to-red-600
              hover:from-orange-600 hover:to-red-700
              transform hover:scale-105 active:scale-95
              shadow-[0_10px_30px_rgba(251,146,60,0.6)]
              transition-all duration-300
            "
          >
            Criar Sala
          </button>

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
              Cancelar
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}