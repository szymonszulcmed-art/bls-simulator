"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [openChoking, setOpenChoking] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-4xl font-bold">SYMULATOR KPP</h1>
            <p className="text-slate-500 mt-2">
              Interaktywne scenariusze pierwszej pomocy i BLS
            </p>
          </div>

          <a
            href="#scenariusze"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl font-bold"
          >
            Rozpocznij
          </a>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">
              PROTOTYP EDUKACYJNY
            </span>

            <h2 className="text-5xl font-bold mt-6 leading-tight">
              Ucz się ratować przez realistyczne decyzje
            </h2>

            <p className="text-xl text-slate-600 mt-6">
              Wybieraj działania, obserwuj stan poszkodowanego i przechodź przez
              scenariusze krok po kroku — tak, jak podczas realnej interwencji.
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="#scenariusze"
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-4 rounded-2xl font-bold"
              >
                Wybierz scenariusz
              </a>

              <button className="bg-white border px-6 py-4 rounded-2xl font-bold">
                O projekcie
              </button>
            </div>
          </div>

          <div className="bg-white border rounded-3xl p-6 shadow-sm">
            <div className="h-[420px] rounded-2xl bg-slate-200 overflow-hidden">
              <img
                src="/scene-start.png"
                alt="Symulator BLS"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <section id="scenariusze">
          <h2 className="text-3xl font-bold mb-6">Scenariusze</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScenarioCard
              title="BLS dorosły"
              description="Ocena reakcji, oddechu, RKO i AED."
              status="Dostępny"
              color="blue"
              href="/bls"
            />

            <div className="bg-white border rounded-3xl p-6 hover:shadow-md transition">
              <button
                onClick={() => setOpenChoking(!openChoking)}
                className="w-full text-left"
              >
                <div className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-orange-500 text-white">
                  Dostępne
                </div>

                <div className="flex items-center justify-between mt-6">
                  <h3 className="text-2xl font-bold">Zadławienie</h3>

                  <span className="text-3xl font-bold text-orange-500">
                    {openChoking ? "▲" : "▼"}
                  </span>
                </div>

                <p className="text-slate-600 mt-3 min-h-16">
                  Wybierz wariant scenariusza: dorosły, dziecko lub niemowlę.
                </p>
              </button>

              {openChoking && (
                <div className="mt-6 space-y-3">
                  <Link
                    href="/zadlawienie"
                    className="block bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-2xl font-bold text-center"
                  >
                    Zadławienie dorosłych
                  </Link>

                  <Link
                    href="/zadlawienie-dzieci"
                    className="block bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-2xl font-bold text-center"
                  >
                    Zadławienie dzieci
                  </Link>

                  <Link
                    href="/zadlawienie-niemowlat"
                    className="block bg-orange-100 hover:bg-orange-200 text-orange-700 p-4 rounded-2xl font-bold text-center"
                  >
                    Zadławienie niemowląt
                  </Link>
                </div>
              )}
            </div>

            <ScenarioCard
              title="Urazy"
              description="Bezpieczeństwo, ocena poszkodowanego i priorytety."
              status="Wkrótce"
              color="slate"
              href="/urazy"
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function ScenarioCard({ title, description, status, color, href }) {
  const colors = {
    blue: "bg-blue-700 text-white",
    orange: "bg-orange-500 text-white",
    slate: "bg-slate-700 text-white",
  };

  return (
    <div className="bg-white border rounded-3xl p-6 hover:shadow-md transition">
      <div
        className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${colors[color]}`}
      >
        {status}
      </div>

      <h3 className="text-2xl font-bold mt-6">{title}</h3>

      <p className="text-slate-600 mt-3 min-h-16">{description}</p>

      <Link
        href={href}
        className="mt-6 block w-full bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-2xl font-bold text-center"
      >
        Otwórz scenariusz
      </Link>
    </div>
  );
}