"use client";

import { useState } from "react";
import Link from "next/link";

export default function Zadlawienie() {
    const [etap, setEtap] = useState("start");
    const [historia, setHistoria] = useState([]);
  const [log, setLog] = useState(["Scenariusz rozpoczęty."]);

  const daneEtapu = {
    start: {
      obraz: "/scene-choking-start.png",
      title: "Zadławienie",
      opis:
        "Osoba podczas spożywania posiłku zaczyna odczuwać duszność i kaszleć. Może panikować, a skóra zaczyna robić się sinawa.",
      zadanie: "Określ rodzaj niedrożności dróg oddechowych.",
      stan: "Wymaga oceny",
    },
    czesciowa: {
      obraz: "/scene-partial.png",
      title: "Niedrożność częściowa",
      opis:
        "Światło dróg oddechowych jest częściowo przymknięte. Poszkodowany może oddychać i intensywnie kaszleć.",
      zadanie: "Zachęcaj poszkodowanego do kaszlu i stale obserwuj jego stan.",
      stan: "Kaszel skuteczny",
    },
    calkowita: {
      obraz: "/scene-total.png",
      title: "Niedrożność całkowita",
      opis:
        "Światło dróg oddechowych jest zamknięte. Kaszel jest słaby lub niemożliwy, może pojawić się sinica i stridor.",
      zadanie:
        "Poleć poszkodowanemu pochylić się do przodu i wykonaj 5 uderzeń między łopatki.",
      stan: "Zadławienie ciężkie",
    },
    lopatki: {
      obraz: "/scene-backblows.png",
      title: "5 uderzeń między łopatki",
      opis:
        "Stań z boku poszkodowanego. Jedną ręką podtrzymuj klatkę piersiową, drugą wykonaj do 5 uderzeń między łopatki ruchem ku górze.",
      zadanie: "Oceń, czy ciało obce zostało usunięte.",
      stan: "Interwencja",
    },
    heimlich: {
      obraz: "/scene-heimlich.png",
      title: "Rękoczyn Heimlicha",
      opis:
        "Stań za poszkodowanym. Zaciśnij dłoń w pięść i ułóż ją w nadbrzuszu, między pępkiem a mostkiem. Chwyć pięść drugą ręką i pociągnij energicznie do wewnątrz i ku górze.",
      zadanie: "Wykonaj do 5 uciśnięć nadbrzusza i oceń skuteczność.",
      stan: "Interwencja",
    },
    sukces: {
      obraz: "/scene-partial.png",
      title: "Udało się pomóc",
      opis:
        "Ciało obce zostało usunięte. Poszkodowany zaczyna oddychać skutecznie.",
      zadanie:
        "Kontroluj stan poszkodowanego i w razie potrzeby wezwij pomoc medyczną.",
      stan: "Poprawa",
    },
    powtarzaj: {
      obraz: "/scene-heimlich.png",
      title: "Powtarzaj czynności",
      opis:
        "Uderzenia między łopatki i rękoczyn Heimlicha nie przyniosły efektu. Wykonuj je naprzemiennie: 5 uderzeń między łopatki i 5 uciśnięć nadbrzusza.",
      zadanie:
        "Kontynuuj działania. Jeśli poszkodowany traci przytomność, przejdź do BLS.",
      stan: "Brak poprawy",
    },
    utrata: {
      obraz: "/scene-collapse.png",
      title: "Utrata przytomności",
      opis:
        "Poszkodowany przestaje reagować lub traci przytomność. Asekuruj go, aby nie upadł.",
      zadanie:
        "Wezwij pomoc pod numer 112, udrożnij drogi oddechowe i oceń oddech.",
      stan: "Nieprzytomny",
    },
    bls: {
      obraz: "/scene-rko-choking.png",
      title: "Przejście do BLS",
      opis:
        "Poszkodowany jest nieprzytomny. Udrożnij drogi oddechowe i oceń oddech przez 10 sekund.",
      zadanie: "Jeśli brak prawidłowego oddechu, rozpocznij RKO.",
      stan: "Ocena oddechu",
    },
    rko: {
      obraz: "/scene-rko-choking.png",
      title: "Rozpocznij RKO",
      opis: "Poszkodowany nie reaguje i nie oddycha prawidłowo.",
      zadanie:
        "Rozpocznij RKO: 30 uciśnięć klatki piersiowej i 2 oddechy, jeśli możesz je wykonać.",
      stan: "RKO",
    },
  };

  const aktualny = daneEtapu[etap];

  function przejdz(nowyEtap, wpis) {
    setHistoria((prev) => [...prev, etap]);
    setEtap(nowyEtap);
    setLog((prev) => [wpis, ...prev]);
  }
  function cofnijEtap() {
    if (historia.length === 0) return;
  
    const poprzedni = historia[historia.length - 1];
  
    setHistoria((prev) => prev.slice(0, -1));
    setEtap(poprzedni);
  
    setLog((prev) => [
      "Cofnięto do poprzedniego etapu.",
      ...prev,
    ]);
  }
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold">Zadławienie</h1>
            <p className="text-slate-500 mt-2">
              Scenariusz KPP: częściowa i całkowita niedrożność dróg oddechowych
            </p>
          </div>

          <div className="flex gap-3">
        <button
        onClick={cofnijEtap}
    className="bg-white border px-5 py-3 rounded-2xl font-bold hover:bg-slate-100"
  >
    ← Cofnij
  </button>

  <Link
    href="/"
    className="bg-white border px-5 py-3 rounded-2xl font-bold hover:bg-slate-100"
  >
    Powrót
  </Link>
</div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-[520px] rounded-3xl overflow-hidden border bg-slate-200">
              <img
                src={aktualny.obraz}
                alt="Scena zadławienia"
                className="w-full h-full object-cover"
              />

              <div className="absolute left-8 bottom-8 bg-slate-900/85 text-white p-4 rounded-2xl max-w-md">
                <p className="text-sm text-slate-300">AKTUALNY ETAP</p>
                <p className="text-xl font-bold">{aktualny.title}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border rounded-3xl p-5">
              <div>
                <h2 className="text-blue-700 font-bold mb-2">OPIS SYTUACJI</h2>
                <p>{aktualny.opis}</p>
              </div>

              <div>
                <h2 className="text-blue-700 font-bold mb-2">TWOJE ZADANIE</h2>
                <p>{aktualny.zadanie}</p>
              </div>
            </div>

            <div className="bg-white border rounded-3xl p-6">
              <h2 className="text-blue-700 font-bold mb-4">
                DOSTĘPNE DZIAŁANIA
              </h2>

              {etap === "start" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      przejdz("czesciowa", "Rozpoznano niedrożność częściową.")
                    }
                    className="bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold text-left"
                  >
                    Niedrożność częściowa
                    <p className="text-sm font-normal mt-1">
                      poszkodowany oddycha i intensywnie kaszle
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      przejdz("calkowita", "Rozpoznano niedrożność całkowitą.")
                    }
                    className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-2xl font-bold text-left"
                  >
                    Niedrożność całkowita
                    <p className="text-sm font-normal mt-1">
                      brak skutecznego kaszlu, sinica, stridor
                    </p>
                  </button>
                </div>
              )}

              {etap === "czesciowa" && (
                <button
                  onClick={() =>
                    przejdz(
                      "sukces",
                      "Zachęcano do kaszlu. Poszkodowany odzyskał drożność."
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold"
                >
                  Zachęcaj do kaszlu
                </button>
              )}

              {etap === "calkowita" && (
                <button
                  onClick={() =>
                    przejdz("lopatki", "Wykonano 5 uderzeń między łopatki.")
                  }
                  className="bg-orange-500 hover:bg-orange-600 text-white p-5 rounded-2xl font-bold"
                >
                  Wykonaj 5 uderzeń między łopatki
                </button>
              )}

              {etap === "lopatki" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      przejdz(
                        "sukces",
                        "Uderzenia między łopatki były skuteczne."
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold"
                  >
                    Pomogło
                  </button>

                  <button
                    onClick={() =>
                      przejdz(
                        "heimlich",
                        "Uderzenia były nieskuteczne. Przejście do rękoczynu Heimlicha."
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-2xl font-bold"
                  >
                    Nie pomogło
                  </button>
                </div>
              )}

              {etap === "heimlich" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      przejdz("sukces", "Rękoczyn Heimlicha był skuteczny.")
                    }
                    className="bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold"
                  >
                    Pomogło
                  </button>

                  <button
                    onClick={() =>
                      przejdz("powtarzaj", "Rękoczyn Heimlicha był nieskuteczny.")
                    }
                    className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-2xl font-bold"
                  >
                    Nie pomogło
                  </button>
                </div>
              )}

              {etap === "powtarzaj" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() =>
                      przejdz("lopatki", "Powtórzono uderzenia między łopatki.")
                    }
                    className="bg-orange-500 hover:bg-orange-600 text-white p-5 rounded-2xl font-bold"
                  >
                    Powtórz uderzenia
                  </button>

                  <button
                    onClick={() =>
                      przejdz("heimlich", "Powtórzono rękoczyn Heimlicha.")
                    }
                    className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-2xl font-bold"
                  >
                    Powtórz Heimlicha
                  </button>

                  <button
                    onClick={() =>
                      przejdz("utrata", "Poszkodowany traci przytomność.")
                    }
                    className="bg-slate-800 hover:bg-slate-900 text-white p-5 rounded-2xl font-bold"
                  >
                    Utrata przytomności
                  </button>
                </div>
              )}

              {etap === "utrata" && (
                <button
                  onClick={() => przejdz("bls", "Wezwano 112. Przejście do BLS.")}
                  className="bg-purple-700 hover:bg-purple-800 text-white p-5 rounded-2xl font-bold"
                >
                  Wezwij 112 i przejdź do BLS
                </button>
              )}

              {etap === "bls" && (
                <button
                  onClick={() =>
                    przejdz("rko", "Brak prawidłowego oddechu. Rozpoczęto RKO.")
                  }
                  className="bg-red-700 hover:bg-red-800 text-white p-5 rounded-2xl font-bold"
                >
                  Brak oddechu — rozpocznij RKO
                </button>
              )}

              {etap === "rko" && (
                <div className="bg-red-50 border border-red-300 rounded-2xl p-5">
                  <h3 className="text-xl font-bold text-red-700 mb-2">
                    RKO rozpoczęte
                  </h3>
                  <p>
                    Kontynuuj resuscytację do czasu przybycia ZRM, powrotu
                    czynności życiowych albo wyczerpania sił.
                  </p>
                </div>
              )}

              {etap === "sukces" && (
                <div className="bg-green-50 border border-green-300 rounded-2xl p-5">
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    Udało się pomóc poszkodowanemu
                  </h3>
                  <p>
                    Poszkodowany odzyskał drożność dróg oddechowych. Obserwuj
                    go i w razie potrzeby wezwij pomoc medyczną.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white border rounded-3xl p-6">
              <h2 className="text-blue-700 font-bold text-xl mb-4">
                STAN POSZKODOWANEGO
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-3">
                  <span>Stan</span>
                  <b className="text-red-500">{aktualny.stan}</b>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>Kaszel</span>
                  <b>
                    {etap === "czesciowa" || etap === "start"
                      ? "Obecny"
                      : "Słaby / brak"}
                  </b>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>Oddech</span>
                  <b>{etap === "rko" ? "Brak" : "Utrudniony"}</b>
                </div>

                <div className="flex justify-between">
                  <span>Skóra</span>
                  <b className="text-blue-700">
                    {etap === "calkowita" ||
                    etap === "heimlich" ||
                    etap === "powtarzaj"
                      ? "Sinawa"
                      : "Obserwuj"}
                  </b>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-3xl p-6 min-h-80">
              <h2 className="text-blue-700 font-bold text-xl mb-4">
                DZIENNIK ZDARZEŃ
              </h2>

              <div className="space-y-2">
                {log.map((item, index) => (
                  <p key={index} className="text-slate-600">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}