"use client";

import { useState } from "react";
import Link from "next/link";

export default function ZadlawienieDzieci() {
  const [etap, setEtap] = useState("start");
  const [historia, setHistoria] = useState([]);
  const [log, setLog] = useState(["Scenariusz rozpoczęty."]);

  const daneEtapu = {
    start: {
      obraz: "/scene-child-choking-start.png",
      title: "Zadławienie u dziecka",
      opis:
        "Dziecko podczas jedzenia zaczyna kaszleć, łapie się za szyję i panikuje. Podejrzewasz niedrożność dróg oddechowych spowodowaną ciałem obcym.",
      zadanie: "Oceń, czy kaszel jest efektywny czy nieefektywny.",
      stan: "Wymaga oceny",
    },
    kaszelEfektywny: {
      obraz: "/scene-child-coughing.png",
      title: "Kaszel efektywny",
      opis:
        "Dziecko może oddychać i kaszleć. Kaszel jest silny i skuteczny.",
      zadanie:
        "Zachęcaj dziecko do kaszlu i stale obserwuj, czy stan się poprawia czy pogarsza.",
      stan: "Kaszel skuteczny",
    },
    kaszelNieefektywny: {
      obraz: "/scene-child-total.png",
      title: "Kaszel nieefektywny",
      opis:
        "Kaszel staje się słaby lub zanika. Dziecko ma narastającą duszność, może sinieć i nie jest w stanie skutecznie oddychać.",
      zadanie:
        "Wezwij pomoc. Jeśli dziecko jest przytomne, wykonaj 5 uderzeń między łopatki.",
      stan: "Zadławienie ciężkie",
    },
    lopatki: {
      obraz: "/scene-child-backblows.png",
      title: "5 uderzeń między łopatki",
      opis:
        "Pochyl dziecko do przodu. Stań z boku i wykonaj do 5 uderzeń między łopatki, kontrolując bezpieczeństwo dziecka.",
      zadanie: "Oceń, czy ciało obce zostało usunięte.",
      stan: "Interwencja",
    },
    heimlich: {
      obraz: "/scene-child-heimlich.png",
      title: "5 uciśnięć nadbrzusza — rękoczyn Heimlicha",
      opis:
        "Jeżeli uderzenia między łopatki nie pomogły, wykonaj rękoczyn Heimlicha. Stań za dzieckiem, obejmij je na wysokości nadbrzusza. Zaciśnij jedną dłoń w pięść i ułóż ją pomiędzy pępkiem a mostkiem. Chwyć pięść drugą ręką i wykonaj energiczny ruch do wewnątrz i ku górze. Wykonaj do 5 uciśnięć nadbrzusza.",
      zadanie:
        "Po wykonaniu rękoczynu Heimlicha oceń, czy niedrożność ustąpiła.",
      stan: "Interwencja",
    },
    powtarzaj: {
      obraz: "/scene-child-heimlich.png",
      title: "Powtarzaj czynności",
      opis:
        "Jeżeli niedrożność nie ustępuje, wykonuj naprzemiennie 5 uderzeń między łopatki i 5 uciśnięć nadbrzusza.",
      zadanie:
        "Kontynuuj działania. Jeśli dziecko traci przytomność, przejdź do PBLS.",
      stan: "Brak poprawy",
    },
    utrata: {
      obraz: "/scene-child-collapse.png",
      title: "Dziecko traci przytomność",
      opis:
        "Dziecko przestaje reagować. Asekuruj je, połóż bezpiecznie na podłożu i wezwij ZRM.",
      zadanie:
        "Udrożnij drogi oddechowe, sprawdź jamę ustną i usuń tylko widoczne ciało obce.",
      stan: "Nieprzytomne",
    },
    pbls: {
      obraz: "/scene-child-pbls.png",
      title: "Przejście do PBLS",
      opis:
        "Dziecko jest nieprzytomne. Udrożnij drogi oddechowe i oceń oddech. Nie usuwaj ciała obcego palcem na ślepo.",
      zadanie:
        "Jeśli brak prawidłowego oddechu, rozpocznij resuscytację pediatryczną.",
      stan: "Ocena oddechu",
    },
    rko: {
      obraz: "/scene-child-cpr.png",
      title: "Rozpocznij RKO/PBLS",
      opis:
        "Dziecko jest nieprzytomne i nie oddycha prawidłowo. Rozpocznij pediatryczne BLS. Udrożnij drogi oddechowe utrzymując głowę w pozycji neutralnej i unieś brodę. Wykonaj 5 oddechów ratowniczych, obejmując szczelnie usta dziecka swoimi ustami. Wdmuchuj powietrze przez około 1 sekundę do widocznego uniesienia klatki piersiowej.",
      zadanie:
        "Następnie rozpocznij uciśnięcia klatki piersiowej jedną ręką na środku klatki piersiowej. Uciskaj na głębokość około 1/3 wymiaru klatki piersiowej z częstotliwością 100–120/min. Wykonuj 15 uciśnięć i 2 oddechy ratownicze.",
      stan: "RKO/PBLS",
    },
    sukces: {
      obraz: "/scene-child-coughing.png",
      title: "Niedrożność ustąpiła",
      opis:
        "Ciało obce zostało usunięte. Dziecko zaczyna oddychać skutecznie.",
      zadanie:
        "Obserwuj dziecko. Po takim zdarzeniu wskazana jest pilna kontrola lekarska.",
      stan: "Poprawa",
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
    setLog((prev) => ["Cofnięto do poprzedniego etapu.", ...prev]);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold">Zadławienie u dziecka</h1>
            <p className="text-slate-500 mt-2">
              Scenariusz KPP: dziecko powyżej 1. roku życia
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={cofnijEtap}
              disabled={historia.length === 0}
              className={`border px-5 py-3 rounded-2xl font-bold ${
                historia.length === 0
                  ? "bg-slate-100 text-slate-400"
                  : "bg-white hover:bg-slate-100"
              }`}
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
                alt="Scena zadławienia u dziecka"
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
                      przejdz(
                        "kaszelEfektywny",
                        "Rozpoznano kaszel efektywny."
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold text-left"
                  >
                    Kaszel efektywny
                    <p className="text-sm font-normal mt-1">
                      dziecko kaszle i może oddychać
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      przejdz(
                        "kaszelNieefektywny",
                        "Rozpoznano kaszel nieefektywny."
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-2xl font-bold text-left"
                  >
                    Kaszel nieefektywny
                    <p className="text-sm font-normal mt-1">
                      brak skutecznego kaszlu, sinica, duszność
                    </p>
                  </button>
                </div>
              )}

              {etap === "kaszelEfektywny" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      przejdz(
                        "sukces",
                        "Zachęcano do kaszlu. Niedrożność ustąpiła."
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold"
                  >
                    Zachęcaj do kaszlu
                  </button>

                  <button
                    onClick={() =>
                      przejdz(
                        "kaszelNieefektywny",
                        "Stan dziecka pogorszył się. Kaszel stał się nieefektywny."
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-2xl font-bold"
                  >
                    Stan się pogarsza
                  </button>
                </div>
              )}

              {etap === "kaszelNieefektywny" && (
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
                        "Uderzenia były nieskuteczne. Przejście do uciśnięć nadbrzusza."
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
                      przejdz(
                        "sukces",
                        "Uciśnięcia nadbrzusza były skuteczne."
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold"
                  >
                    Pomogło
                  </button>

                  <button
                    onClick={() =>
                      przejdz(
                        "powtarzaj",
                        "Uciśnięcia nadbrzusza były nieskuteczne."
                      )
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
                      przejdz("lopatki", "Powtórzono 5 uderzeń między łopatki.")
                    }
                    className="bg-orange-500 hover:bg-orange-600 text-white p-5 rounded-2xl font-bold"
                  >
                    Powtórz uderzenia
                  </button>

                  <button
                    onClick={() =>
                      przejdz("heimlich", "Powtórzono 5 uciśnięć nadbrzusza.")
                    }
                    className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-2xl font-bold"
                  >
                    Powtórz uciśnięcia
                  </button>

                  <button
                    onClick={() =>
                      przejdz("utrata", "Dziecko traci przytomność.")
                    }
                    className="bg-slate-800 hover:bg-slate-900 text-white p-5 rounded-2xl font-bold"
                  >
                    Utrata przytomności
                  </button>
                </div>
              )}

              {etap === "utrata" && (
                <button
                  onClick={() =>
                    przejdz(
                      "pbls",
                      "Wezwano ZRM. Udrożnienie dróg oddechowych i ocena oddechu."
                    )
                  }
                  className="bg-purple-700 hover:bg-purple-800 text-white p-5 rounded-2xl font-bold"
                >
                  Wezwij ZRM i przejdź do PBLS
                </button>
              )}

              {etap === "pbls" && (
                <button
                  onClick={() =>
                    przejdz(
                      "rko",
                      "Brak prawidłowego oddechu. Rozpoczęto RKO/PBLS."
                    )
                  }
                  className="bg-red-700 hover:bg-red-800 text-white p-5 rounded-2xl font-bold"
                >
                  Brak oddechu — rozpocznij RKO/PBLS
                </button>
              )}

              {etap === "rko" && (
                <div className="bg-red-50 border border-red-300 rounded-2xl p-5">
                  <h3 className="text-xl font-bold text-red-700 mb-2">
                    RKO/PBLS rozpoczęte
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
                    Udało się pomóc dziecku
                  </h3>
                  <p>
                    Niedrożność ustąpiła. Obserwuj dziecko i zadbaj o pilną
                    kontrolę lekarską.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white border rounded-3xl p-6">
              <h2 className="text-blue-700 font-bold text-xl mb-4">
                STAN DZIECKA
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-3">
                  <span>Stan</span>
                  <b className="text-red-500">{aktualny.stan}</b>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>Kaszel</span>
                  <b>
                    {etap === "kaszelEfektywny" || etap === "start"
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
                    {etap === "kaszelNieefektywny" ||
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