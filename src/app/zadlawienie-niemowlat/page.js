"use client";

import { useState } from "react";
import Link from "next/link";

export default function ZadlawienieNiemowlat() {
  const [etap, setEtap] = useState("start");
  const [historia, setHistoria] = useState([]);
  const [log, setLog] = useState(["Scenariusz rozpoczęty."]);

  const daneEtapu = {
    start: {
      obraz: "/scene-infant-choking-start.png",
      title: "Zadławienie u niemowlęcia",
      opis:
        "Niemowlę podczas karmienia zaczyna się krztusić, kaszleć i mieć trudność z oddychaniem. Może pojawić się niepokój, płacz lub sinienie skóry.",
      zadanie: "Oceń, czy kaszel jest efektywny czy nieefektywny.",
      stan: "Wymaga oceny",
    },
    kaszelEfektywny: {
      obraz: "/scene-infant-coughing.png",
      title: "Kaszel efektywny",
      opis:
        "Niemowlę kaszle, oddycha i wydaje dźwięki. Drogi oddechowe nie są całkowicie zamknięte.",
      zadanie:
        "Nie wykonuj uderzeń ani uciśnięć. Zachęcaj do kaszlu, obserwuj stan i przygotuj się do wezwania pomocy, jeśli stan się pogorszy.",
      stan: "Kaszel skuteczny",
    },
    kaszelNieefektywny: {
      obraz: "/scene-infant-total.png",
      title: "Kaszel nieefektywny",
      opis:
        "Kaszel jest słaby lub zanika. Niemowlę ma trudność z oddychaniem, może sinieć i nie jest w stanie skutecznie usunąć ciała obcego.",
      zadanie:
        "Ułóż niemowlę na swoim przedramieniu głową w dół, podtrzymując głowę i żuchwę. Wykonaj 5 uderzeń między łopatki.",
      stan: "Zadławienie ciężkie",
    },
    lopatki: {
      obraz: "/scene-infant-backblows.png",
      title: "5 uderzeń między łopatki",
      opis:
        "Niemowlę leży brzuchem na twoim przedramieniu, głową niżej niż tułów. Podtrzymuj głowę i żuchwę, nie uciskając tkanek miękkich pod brodą. Wykonaj do 5 uderzeń między łopatki.",
      zadanie: "Oceń, czy ciało obce zostało usunięte.",
      stan: "Interwencja",
    },
    klatka: {
      obraz: "/scene-infant-chest-thrusts.png",
      title: "5 uciśnięć klatki piersiowej",
      opis:
        "Jeżeli uderzenia między łopatki nie pomogły, odwróć niemowlę na plecy, nadal utrzymując głowę niżej niż tułów. Wykonaj 5 uciśnięć klatki piersiowej dwoma palcami na środku klatki piersiowej.",
      zadanie:
        "Po wykonaniu uciśnięć oceń, czy niedrożność ustąpiła. U niemowląt nie wykonuje się rękoczynu Heimlicha.",
      stan: "Interwencja",
    },
    powtarzaj: {
      obraz: "/scene-infant-chest-thrusts.png",
      title: "Powtarzaj czynności",
      opis:
        "Jeżeli ciało obce nie zostało usunięte, wykonuj naprzemiennie 5 uderzeń między łopatki i 5 uciśnięć klatki piersiowej.",
      zadanie:
        "Kontynuuj działania. Jeśli niemowlę traci przytomność, przejdź do PBLS.",
      stan: "Brak poprawy",
    },
    utrata: {
      obraz: "/scene-infant-collapse.png",
      title: "Niemowlę traci przytomność",
      opis:
        "Niemowlę przestaje reagować. Ułóż je bezpiecznie na twardym podłożu i wezwij ZRM.",
      zadanie:
        "Udrożnij drogi oddechowe, sprawdź jamę ustną i usuń tylko widoczne ciało obce. Nie wykonuj ślepego wygarniania palcem.",
      stan: "Nieprzytomne",
    },
    pbls: {
        obraz: "/scene-infant-pbls.png",
        title: "Przejście do PBLS",
        opis:
          "Niemowlę jest nieprzytomne. Udrożnij drogi oddechowe bardzo ostrożnie. U niemowląt nie należy mocno odchylać głowy jak u dorosłych, ponieważ ze względu na specyficzną budowę anatomiczną może dojść do zamknięcia dróg oddechowych. Głowa powinna znajdować się w pozycji neutralnej — w jednej linii z tułowiem. Aby to uzyskać można delikatnie podłożyć coś pod barki, np. własną dłoń, zwinięty ręcznik, pieluchę lub inny miękki przedmiot.",
        zadanie:
          "Oceń oddech przez 10 sekund. Jeżeli brak prawidłowego oddechu, rozpocznij resuscytację pediatryczną.",
        stan: "Ocena oddechu",
      },
      rko: {
        obraz: "/scene-infant-cpr.png",
        title: "Rozpocznij RKO/PBLS",
        opis:
          "Niemowlę nie reaguje i nie oddycha prawidłowo. Wykonaj 5 oddechów ratowniczych, obejmując swoimi ustami jednocześnie usta i nos niemowlęcia. Wdmuchuj powietrze delikatnie przez około 1 sekundę do widocznego uniesienia klatki piersiowej.",
        zadanie:
          "Następnie wykonuj uciśnięcia klatki piersiowej dwoma palcami na środku klatki piersiowej, tuż poniżej linii sutków. Uciskaj na głębokość około 1/3 wymiaru klatki piersiowej. U niemowląt i dzieci RKO wykonuje się szybciej — z częstotliwością co najmniej 120 uciśnięć na minutę. Wykonuj 15 uciśnięć i 2 oddechy ratownicze.",
        stan: "RKO/PBLS",
      },
    sukces: {
      obraz: "/scene-infant-coughing.png",
      title: "Niedrożność ustąpiła",
      opis:
        "Ciało obce zostało usunięte. Niemowlę zaczyna oddychać skutecznie.",
      zadanie:
        "Obserwuj niemowlę. Po takim zdarzeniu wskazana jest pilna kontrola lekarska.",
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
            <h1 className="text-4xl font-bold">Zadławienie u niemowlęcia</h1>
            <p className="text-slate-500 mt-2">
              Scenariusz KPP: niemowlę poniżej 1. roku życia
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
                alt="Scena zadławienia u niemowlęcia"
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
                      przejdz("kaszelEfektywny", "Rozpoznano kaszel efektywny.")
                    }
                    className="bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold text-left"
                  >
                    Kaszel efektywny
                    <p className="text-sm font-normal mt-1">
                      niemowlę kaszle i oddycha
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
                      słaby kaszel, sinica, narastająca duszność
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
                    Obserwuj i zachęcaj do kaszlu
                  </button>

                  <button
                    onClick={() =>
                      przejdz(
                        "kaszelNieefektywny",
                        "Stan niemowlęcia pogorszył się. Kaszel stał się nieefektywny."
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
                        "klatka",
                        "Uderzenia były nieskuteczne. Przejście do uciśnięć klatki piersiowej."
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-2xl font-bold"
                  >
                    Nie pomogło
                  </button>
                </div>
              )}

              {etap === "klatka" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      przejdz(
                        "sukces",
                        "Uciśnięcia klatki piersiowej były skuteczne."
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
                        "Uciśnięcia klatki piersiowej były nieskuteczne."
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
                      przejdz(
                        "klatka",
                        "Powtórzono 5 uciśnięć klatki piersiowej."
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-2xl font-bold"
                  >
                    Powtórz uciśnięcia
                  </button>

                  <button
                    onClick={() =>
                      przejdz("utrata", "Niemowlę traci przytomność.")
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
                    Udało się pomóc niemowlęciu
                  </h3>
                  <p>
                    Niedrożność ustąpiła. Obserwuj niemowlę i zadbaj o pilną
                    kontrolę lekarską.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white border rounded-3xl p-6">
              <h2 className="text-blue-700 font-bold text-xl mb-4">
                STAN NIEMOWLĘCIA
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
                    etap === "klatka" ||
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