"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

const MOCK_ROOM = {
  maxPlayers: 10,
  rounds: 2,
  impostors: 2,
};

const MOCK_PLAYERS = [
  {
    id: 1,
    name: "Lucas",
    color: "#ef4444",
    isHost: true,
    isYou: true,
  },
];

export default function LobbyPage() {
  const { code } = useParams<{ code: string }>();
  const [players] = useState(MOCK_PLAYERS);

  if (!code) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Código inválido
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white flex flex-col items-center px-6 py-10 relative overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,140,0,0.12),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(100,100,255,0.12),transparent_40%)] pointer-events-none" />

      {/* Card da sala */}
      <div className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-lg mb-10">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-white/70">Código da sala</p>
            <p className="text-3xl font-black text-orange-400 tracking-widest">
              {code}
            </p>
          </div>

          <button className="px-5 py-3 rounded-xl font-bold bg-orange-500 hover:bg-orange-600 transition">
            Copiar link
          </button>
        </div>

        <div className="flex justify-between text-sm text-white/70 mt-4">
          <span>{players.length}/{MOCK_ROOM.maxPlayers} jogadores</span>
          <span>
            {MOCK_ROOM.rounds} rodadas · {MOCK_ROOM.impostors} impostores
          </span>
        </div>
      </div>

      {/* Jogadores */}
      <div className="flex gap-6 flex-wrap justify-center mb-10">
        {players.map((player) => (
          <div
            key={player.id}
            className="w-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center shadow"
          >
            <div
              className="w-14 h-14 rounded-full mb-3"
              style={{ backgroundColor: player.color }}
            />

            <span className="font-semibold">{player.name}</span>

            <div className="flex gap-2 mt-2">
              {player.isHost && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500">
                  HOST
                </span>
              )}
              {player.isYou && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500">
                  VOCÊ
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Aviso */}
      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 mb-6 text-center">
        Use chamada de vídeo ou joguem pessoalmente para melhor experiência
      </div>

      {/* Estado */}
      <div className="w-full max-w-xl py-5 rounded-2xl text-center font-black text-lg bg-orange-500 shadow-lg">
        AGUARDANDO JOGADORES ({players.length}/4)
      </div>
    </main>
  );
}