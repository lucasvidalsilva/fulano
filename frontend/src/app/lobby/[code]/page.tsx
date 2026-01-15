"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Player = {
  id: string;
  name: string;
  color: string;
  is_host: boolean;
};

type Room = {
  id: string;
  rounds: number;
  impostors: number;
};

export default function LobbyPage() {
  const { code } = useParams<{ code: string }>();

  const [room, setRoom] = useState<Room | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * 1️⃣ Buscar sala
   */
  useEffect(() => {
    if (!code) return;

    async function loadRoom() {
      setLoading(true);

      const { data, error } = await supabase
        .from("rooms")
        .select("id, rounds, impostors")
        .eq("code", code)
        .single();

      if (error || !data) {
        setRoom(null);
        setLoading(false);
        return;
      }

      setRoom(data);
    }

    loadRoom();
  }, [code]);

  /**
   * 2️⃣ Buscar jogadores (função reutilizável)
   */
  const loadPlayers = useCallback(
    async (roomId: string) => {
      const { data } = await supabase
        .from("players")
        .select("id, name, color, is_host")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true });

      setPlayers(data ?? []);
      setLoading(false);
    },
    []
  );

  /**
   * 3️⃣ Players + Realtime
   */
  useEffect(() => {
    if (!room?.id) return;

    loadPlayers(room.id);

    const channel = supabase
      .channel(`room:${room.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "players",
          filter: `room_id=eq.${room.id}`,
        },
        () => loadPlayers(room.id)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [room?.id, loadPlayers]);

  /**
   * Estados globais
   */
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Carregando sala...
      </main>
    );
  }

  if (!room) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Sala não encontrada
      </main>
    );
  }

  /**
   * UI
   */
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

          <button
            onClick={() =>
              navigator.clipboard.writeText(
                `${window.location.origin}/entrar-sala/${code}`
              )
            }
            className="px-5 py-3 rounded-xl font-bold bg-orange-500 hover:bg-orange-600 transition"
          >
            Copiar link
          </button>
        </div>

        <div className="flex justify-between text-sm text-white/70 mt-4">
          <span>{players.length}/10 jogadores</span>
          <span>
            {room.rounds} rodadas · {room.impostors} impostores
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

            {player.is_host && (
              <span className="text-xs px-2 py-0.5 mt-2 rounded-full bg-orange-500">
                HOST
              </span>
            )}
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