"use client";

import { useState } from "react";
import Link from "next/link";

export default function BLS() {
  const [etap, setEtap] = useState("start");
  const [historia, setHistoria] = useState([]);
  const [metodaUdroznienia, setMetodaUdroznienia] = useState("");
  const [oddechTimer, setOddechTimer] = useState(10);
  const [oddechTrwa, setOddechTrwa] = useState(false);
  const [log, setLog] = useState(["Scenariusz rozpoczęty."]);

  const daneEtapu = {
    start: {
      obraz: "/scene-start.png",
      czynność: "Podejdź do poszkodowanego",
      opis:
        "Poszkodowany znaleziony na chodniku. Na miejscu widzisz 2 świadków zdarzenia.",
      zadanie:
        "Podejdź od przodu i rozpocznij ocenę reakcji poszkodowanego.",
      reakcja: "Nieoceniona",
      oddech: "Nieoceniony",
      tetno: "Nieocenione",
    },
    reakcja: {
      obraz: "/scene-reaction.png",
      czynność: "Oceń reakcję poszkodowanego",
      opis:
        "Podchodzisz od przodu, w polu widzenia poszkodowanego. Działasz ostrożnie, pamiętając o możliwym urazie kręgosłupa.",
      zadanie: "Zastosuj bodziec słowny i delikatny bodziec bólowy.",
      reakcja: "Brak reakcji",
      oddech: "Nieoceniony",
      tetno: "Nieocenione",
    },
    udroznienie: {
      obraz: "/scene-airway.png",
      czynność: "Udrożnij drogi oddechowe",
      opis: "Pacjent nie reaguje. Należy udrożnić drogi oddechowe.",
      zadanie:
        "Wybierz metodę udrożnienia dróg oddechowych. Pamiętaj o możliwym urazie kręgosłupa.",
      reakcja: "Brak reakcji",
      oddech: "Nieoceniony",
      tetno: "Nieocenione",
    },
    oddech: {
      obraz: "/scene-breathing.png",
      czynność: "Oceń oddech przez 10 sekund",
      opis:
        "Drogi oddechowe zostały udrożnione. Teraz oceń oddech poszkodowanego.",
      zadanie:
        "Pochyl się nad poszkodowanym. Obserwuj klatkę piersiową, nasłuchuj i wyczuwaj oddech przez 10 sekund.",
      reakcja: "Brak reakcji",
      oddech:
        oddechTimer === 0 ? "Brak prawidłowego oddechu" : "W trakcie oceny",
      tetno: "Nieocenione",
    },
    pomoc: {
      obraz: "/scene-help.png",
      czynność: "Wyznacz świadków",
      opis:
        "Stwierdzono brak prawidłowego oddechu. Należy natychmiast zorganizować pomoc.",
      zadanie:
        "Wskaż jedną osobę do wezwania ZRM, a drugą do przyniesienia AED, jeśli znajduje się w pobliżu.",
      reakcja: "Brak reakcji",
      oddech: "Brak prawidłowego oddechu",
      tetno: "Nieocenione",
    },
    rko: {
      obraz: "/scene-cpr.png",
      czynność: "Rozpocznij RKO",
      opis:
        "Pacjent nie reaguje i nie oddycha prawidłowo. Pomoc została wezwana, AED jest organizowane.",
      zadanie:
        "Rozpocznij uciski klatki piersiowej. Wykonuj 30 uciśnięć i 2 oddechy, jeśli potrafisz i możesz je wykonać.",
      reakcja: "Brak reakcji",
      oddech: "Brak prawidłowego oddechu",
      tetno: "NZK",
    },
    aed: {
      obraz: "/scene-aed.png",
      czynność: "Podłącz AED",
      opis: "AED zostało przyniesione przez świadka zdarzenia.",
      zadanie: "Włącz AED i postępuj zgodnie z poleceniami urządzenia.",
      reakcja: "Brak reakcji",
      oddech: "Brak prawidłowego oddechu",
      tetno: "NZK",
    },
    brakAed: {
      obraz: "/scene-cpr.png",
      czynność: "Kontynuuj RKO",
      opis:
        "AED nie jest dostępne w pobliżu. Nie przerywaj działań ratunkowych.",
      zadanie:
        "Kontynuuj RKO do czasu przybycia ZRM, powrotu czynności życiowych albo wyczerpania sił.",
      reakcja: "Brak reakcji",
      oddech: "Brak prawidłowego oddechu",
      tetno: "NZK",
    },
  };

  const aktualny = daneEtapu[etap];

  function dodajLog(tekst) {
    setLog((prev) => [tekst, ...prev]);
  }

  function przejdz(nowyEtap, wpis) {
    setHistoria((prev) => [...prev, etap]);
    setEtap(nowyEtap);
    dodajLog(wpis);
  }

  function cofnijEtap() {
    if (historia.length === 0) return;

    const poprzedni = historia[historia.length - 1];

    setHistoria((prev) => prev.slice(0, -1));
    setEtap(poprzedni);
    setLog((prev) => ["Cofnięto do poprzedniego etapu.", ...prev]);
  }

  function ocenReakcje() {
    przejdz("reakcja", "Oceniono reakcję. Pacjent nie reaguje.");
  }

  function przejdzDoUdroznienia() {
    przejdz("udroznienie", "Przejście do udrożnienia dróg oddechowych.");
  }

  function wybierzCzoloZuchwa() {
    setMetodaUdroznienia("czolo-zuchwa");
    dodajLog("Wybrano odchylenie głowy metodą czoło-żuchwa.");
  }

  function wybierzWysuniecieZuchwy() {
    setMetodaUdroznienia("wysuniecie-zuchwy");
    dodajLog("Wybrano udrożnienie przez wysunięcie żuchwy.");
  }

  function przejdzDoOcenyOddechu() {
    przejdz("oddech", "Rozpoczęto etap oceny oddechu.");
    setOddechTimer(10);
    setOddechTrwa(false);
  }

  function startOcenyOddechu() {
    if (oddechTrwa) return;

    setOddechTrwa(true);
    setOddechTimer(10);
    dodajLog("Ocena oddechu rozpoczęta.");

    let czas = 10;

    const interval = setInterval(() => {
      czas -= 1;
      setOddechTimer(czas);

      if (czas <= 0) {
        clearInterval(interval);
        setOddechTrwa(false);
        przejdz("pomoc", "Ocena oddechu zakończona. Brak prawidłowego oddechu.");
      }
    }, 1000);
  }

  function rozpocznijRKO() {
    przejdz("rko", "Rozpoczęto RKO.");
  }

  function aedDostepne() {
    przejdz("aed", "AED dostępne. Postępuj zgodnie z poleceniami urządzenia.");
  }

  function aedNiedostepne() {
    przejdz("brakAed", "AED niedostępne. Kontynuuj RKO.");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold">SYMULATOR BLS</h1>

            <span className="bg-blue-700 text-white px-5 py-2 rounded-full font-bold">
              SCENARIUSZ 1
            </span>
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
            <div className="relative h-[520px] rounded-2xl overflow-hidden border bg-slate-200">
              <img
                src={aktualny.obraz}
                alt="Scena BLS"
                className="w-full h-full object-cover"
              />

              <div className="absolute left-8 bottom-8 bg-slate-900/85 text-white p-4 rounded-2xl max-w-md">
                <p className="text-sm text-slate-300">AKTUALNA CZYNNOŚĆ</p>
                <p className="text-xl font-bold">{aktualny.czynność}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border rounded-2xl p-5">
              <div>
                <h2 className="text-blue-700 font-bold mb-2">
                  OPIS SYTUACJI
                </h2>
                <p>{aktualny.opis}</p>
              </div>

              <div>
                <h2 className="text-blue-700 font-bold mb-2">
                  TWOJE ZADANIE
                </h2>
                <p>{aktualny.zadanie}</p>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-5">
              <h2 className="text-blue-700 font-bold mb-4">
                DOSTĘPNE DZIAŁANIA
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  onClick={ocenReakcje}
                  disabled={etap !== "start"}
                  className={`p-5 rounded-2xl font-bold text-left ${
                    etap !== "start"
                      ? "bg-slate-100 text-slate-400"
                      : "bg-blue-700 hover:bg-blue-800 text-white"
                  }`}
                >
                  Oceń reakcję
                  <p className="text-sm font-normal mt-1">
                    bodziec słowny i bólowy
                  </p>
                </button>

                <button
                  onClick={przejdzDoUdroznienia}
                  disabled={etap !== "reakcja"}
                  className={`p-5 rounded-2xl font-bold text-left ${
                    etap !== "reakcja"
                      ? "bg-slate-100 text-slate-400"
                      : "bg-purple-700 hover:bg-purple-800 text-white"
                  }`}
                >
                  Udrożnij drogi oddechowe
                  <p className="text-sm font-normal mt-1">kolejny krok</p>
                </button>

                <button
                  onClick={przejdzDoOcenyOddechu}
                  disabled={etap !== "udroznienie" || metodaUdroznienia === ""}
                  className={`p-5 rounded-2xl font-bold text-left ${
                    etap !== "udroznienie" || metodaUdroznienia === ""
                      ? "bg-slate-100 text-slate-400"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  Oceń oddech
                  <p className="text-sm font-normal mt-1">10 sekund</p>
                </button>

                <button
                  onClick={rozpocznijRKO}
                  disabled={etap !== "pomoc"}
                  className={`p-5 rounded-2xl font-bold text-left ${
                    etap !== "pomoc"
                      ? "bg-slate-100 text-slate-400"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  Rozpocznij RKO
                  <p className="text-sm font-normal mt-1">
                    uciski klatki piersiowej
                  </p>
                </button>
              </div>

              {etap === "udroznienie" && (
                <div className="mt-5 bg-slate-50 border rounded-2xl p-5">
                  <h3 className="text-lg font-bold mb-3">
                    Wybierz metodę udrożnienia dróg oddechowych:
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={wybierzCzoloZuchwa}
                      className={`p-4 rounded-xl font-bold text-white ${
                        metodaUdroznienia === "czolo-zuchwa"
                          ? "bg-orange-700"
                          : "bg-orange-500 hover:bg-orange-600"
                      }`}
                    >
                      Odchylenie głowy metodą czoło-żuchwa
                    </button>

                    <button
                      onClick={wybierzWysuniecieZuchwy}
                      className={`p-4 rounded-xl font-bold text-white ${
                        metodaUdroznienia === "wysuniecie-zuchwy"
                          ? "bg-green-800"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      Wysunięcie żuchwy
                    </button>
                  </div>

                  {metodaUdroznienia === "czolo-zuchwa" && (
                    <div className="mt-4 bg-orange-50 border border-orange-300 text-orange-900 p-4 rounded-xl">
                      <p className="font-bold mb-2">
                        Uwaga przy podejrzeniu urazu kręgosłupa:
                      </p>

                      <p>
                        W tym przypadku, jeżeli potrafimy, należy wybrać
                        udrożnienie przez wysunięcie żuchwy z racji na
                        podejrzenie urazu kręgosłupa.
                      </p>

                      <p className="mt-2">
                        Jeżeli jednak nie mamy takich umiejętności, życie i
                        dotlenienie mózgu mają absolutny priorytet nad
                        potencjalnym urazem kręgosłupa. Wtedy należy zastosować
                        rękoczyn czoło-żuchwa.
                      </p>
                    </div>
                  )}

                  {metodaUdroznienia === "wysuniecie-zuchwy" && (
                    <div className="mt-4 bg-green-50 border border-green-300 text-green-900 p-4 rounded-xl">
                      <p className="font-bold mb-2">
                        Technika wykonania — ruch saneczkowy:
                      </p>

                      <p>
                        Kciukami delikatnie naciska się ku dołowi, lekko
                        otwierając usta.
                      </p>

                      <p className="mt-2">
                        Jednocześnie palcami wskazującymi i pozostałymi pociąga
                        się kąty żuchwy ku górze i do przodu.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {etap === "oddech" && (
                <div className="mt-5 bg-orange-50 border border-orange-300 rounded-2xl p-5">
                  <h3 className="text-xl font-bold text-orange-700 mb-2">
                    Ocena oddechu
                  </h3>

                  <p>
                    Pochyl się nad poszkodowanym. Obserwuj ruch klatki
                    piersiowej, nasłuchuj oddechu i staraj się go wyczuć przez
                    10 sekund.
                  </p>

                  <div className="mt-4 bg-white border border-orange-200 rounded-xl p-4">
                    <p className="font-semibold text-orange-700 mb-2">
                      Prawidłowa ocena oddechu:
                    </p>

                    <p>
                      W ciągu 10 sekund powinny być wyczuwalne i widoczne
                      minimum 2 prawidłowe oddechy.
                    </p>

                    <p className="mt-2">
                      Jeżeli oddech nie występuje lub jest nieprawidłowy, np.
                      oddech agonalny, należy natychmiast rozpocząć RKO.
                    </p>
                  </div>

                  <div className="mt-4 text-4xl font-bold">
                    {oddechTimer} s
                  </div>

                  <button
                    onClick={startOcenyOddechu}
                    disabled={oddechTrwa}
                    className="mt-4 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl font-bold"
                  >
                    Rozpocznij 10-sekundową ocenę oddechu
                  </button>
                </div>
              )}

              {etap === "pomoc" && (
                <div className="mt-5 bg-blue-50 border border-blue-300 rounded-2xl p-5">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">
                    Wyznacz zadania świadkom
                  </h3>

                  <p className="mb-3">
                    Pacjent nie reaguje i nie oddycha prawidłowo. Wskaż
                    konkretnych świadków i przydziel im zadania.
                  </p>

                  <div className="space-y-3">
                    <div className="bg-white border rounded-xl p-4">
                      <b>Świadek 1:</b> Proszę zadzwonić pod 112 lub 999 i
                      powiedzieć, że poszkodowany nie oddycha.
                    </div>

                    <div className="bg-white border rounded-xl p-4">
                      <b>Świadek 2:</b> Proszę przynieść AED, jeżeli znajduje
                      się w pobliżu.
                    </div>
                  </div>
                </div>
              )}

              {etap === "rko" && (
                <div className="mt-5 bg-red-50 border border-red-300 rounded-2xl p-5">
                  <h3 className="text-xl font-bold text-red-700 mb-3">
                    RKO rozpoczęte
                  </h3>

                  <p className="mb-4">
                    Prowadź resuscytację. Jeżeli AED zostanie przyniesione,
                    należy je podłączyć i postępować zgodnie z poleceniami
                    urządzenia.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={aedDostepne}
                      className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-bold"
                    >
                      AED jest dostępne
                    </button>

                    <button
                      onClick={aedNiedostepne}
                      className="bg-slate-700 hover:bg-slate-800 text-white p-4 rounded-xl font-bold"
                    >
                      AED nie jest dostępne
                    </button>
                  </div>
                </div>
              )}

              {etap === "aed" && (
                <div className="mt-5 bg-green-50 border border-green-300 rounded-2xl p-5">
                  <h3 className="text-xl font-bold text-green-700 mb-3">
                    AED podłączone
                  </h3>

                  <p className="mb-3">
                    Elektrody zostały naklejone na klatkę piersiową
                    poszkodowanego.
                  </p>

                  <div className="bg-white border rounded-xl p-4">
                    <b>Postępuj zgodnie z poleceniami urządzenia AED.</b>
                  </div>
                </div>
              )}

              {etap === "brakAed" && (
                <div className="mt-5 bg-slate-100 border rounded-2xl p-5">
                  <h3 className="text-xl font-bold mb-3">AED niedostępne</h3>

                  <p>
                    Kontynuuj RKO bez przerywania do czasu przybycia ZRM,
                    powrotu czynności życiowych albo wyczerpania fizycznego.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white border rounded-2xl p-5">
              <h2 className="text-blue-700 font-bold text-xl mb-4">
                STAN PACJENTA
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-3">
                  <span>Reakcja</span>
                  <b className="text-red-500">{aktualny.reakcja}</b>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>Oddech</span>
                  <b className="text-orange-500">{aktualny.oddech}</b>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>Tętno</span>
                  <b className="text-orange-500">{aktualny.tetno}</b>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>Stan</span>
                  <b className="text-red-500">Krytyczny</b>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>Podejrzenie urazu</span>
                  <b className="text-orange-500">Możliwy uraz kręgosłupa</b>
                </div>

                <div className="flex justify-between">
                  <span>Świadkowie</span>
                  <b>2 osoby</b>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-5 min-h-60">
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