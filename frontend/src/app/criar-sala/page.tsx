"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

const COLORS = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#a855f7",
  "#f97316",
];

export default function CreateRoom() {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [impostors, setImpostors] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<{ name?: string; color?: string }>({});
  const router = useRouter();

  async function handleCreateRoom() {
    const newErrors: { name?: string; color?: string } = {};

    if (!name.trim()) newErrors.name = "Digite seu nome";
    if (!selectedColor) newErrors.color = "Selecione uma cor";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await api<{
        roomCode: string;
        hostToken: string;
        playerToken: string;
      }>("/rooms/create", {
        method: "POST",
        body: JSON.stringify({
          name,
          color: selectedColor,
          impostors,
          rounds: 2,
        }),
      });

      localStorage.setItem("playerToken", res.playerToken);
      localStorage.setItem("hostToken", res.hostToken);
      localStorage.setItem("roomCode", res.roomCode);
      localStorage.setItem("role", "host");

      router.push(`/lobby/${res.roomCode}`);
    } catch (err: any) {
      alert(err.message || "Erro ao criar sala");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-black mb-8 text-center">
          Criar Sala
        </h2>

        {/* Nome */}
        <div className="mb-6">
          <label className="block mb-2 text-white/80 font-semibold">
            Seu nome
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Cor */}
        <div className="mb-8">
          <span className="block mb-3 text-white/80 font-semibold">
            Escolha sua cor
          </span>
          <div className="flex gap-4 flex-wrap">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-12 h-12 rounded-full border-4 ${
                  selectedColor === color
                    ? "border-white scale-110"
                    : "border-white/30"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          {errors.color && (
            <p className="mt-3 text-sm text-red-400">{errors.color}</p>
          )}
        </div>

        {/* Impostores */}
        <div className="mb-10">
          <span className="block mb-3 text-white/80 font-semibold">
            Quantos impostores?
          </span>
          <div className="flex gap-6">
            {[1, 2].map((value) => (
              <label key={value} className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={impostors === value}
                  onChange={() => setImpostors(value as 1 | 2)}
                  hidden
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 ${
                    impostors === value
                      ? "bg-orange-400 border-orange-400"
                      : "border-white/40"
                  }`}
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleCreateRoom}
            className="px-10 py-4 rounded-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600"
          >
            Criar Sala
          </button>

          <Link href="/">
            <button className="px-10 py-4 rounded-2xl bg-white/10 border border-white/30">
              Cancelar
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}