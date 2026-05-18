"use client";

import { useState } from "react";
import Link from "next/link";

export default function PBLSDziecko() {
  const [etap, setEtap] = useState("start");
  const [historia, setHistoria] = useState([]);
  const [oddechTimer, setOddechTimer] = useState(10);
  const [oddechTrwa, setOddechTrwa] = useState(false);
  const [showInstrukcja, setShowInstrukcja] = useState(false);
  const [log, setLog] = useState(["Scenariusz PBLS dziecka rozpoczęty."]);

  const daneEtapu = {
    start: {
      obraz: "/scene-pbls-child-start.png",
      czynność: "Sprawdź bezpieczeństwo",
      opis:
        "Znajdujesz dziecko leżące na podłożu. Najpierw upewnij się, że miejsce zdarzenia jest bezpieczne dla Ciebie i dziecka.",
      zadanie:
        "Oceń otoczenie: ruch uliczny, prąd, dym, ogień, agresywne osoby, zwierzęta lub inne zagrożenia.",
      reakcja: "Nieoceniona",
      oddech: "Nieoceniony",
      stan: "Wymaga oceny",
    },

    reakcja: {
      obraz: "/scene-pbls-child-response.png",
      czynność: "Oceń reakcję dziecka",
      opis:
        "Podejdź do dziecka, delikatnie potrząśnij za ramiona i głośno zapytaj: „Słyszysz mnie?”, „Co się stało?”, „Otwórz oczy?”.",
      zadanie:
        "Nie potrząsaj gwałtownie. Oceń, czy dziecko reaguje na głos lub dotyk.",
      reakcja: "Oceniana",
      oddech: "Nieoceniony",
      stan: "Ocena świadomości",
    },

    pomoc: {
      obraz: "/scene-pbls-child-help.png",
      czynność: "Wołaj o pomoc",
      opis:
        "Dziecko nie reaguje. Na tym etapie głośno wołasz o pomoc, aby zwrócić uwagę osób w pobliżu.",
      zadanie:
        "Zawołaj o pomoc i przejdź do udrożnienia dróg oddechowych oraz oceny oddechu. Konkretne wezwanie ZRM i AED wykonasz po stwierdzeniu braku prawidłowego oddechu.",
      reakcja: "Brak reakcji",
      oddech: "Nieoceniony",
      stan: "Nieprzytomne",
    },

    drogi: {
      obraz: "/scene-pbls-child-airway.png",
      czynność: "Udrożnij drogi oddechowe",
      opis:
        "U dziecka udrożnij drogi oddechowe przez rękoczyn czoło-żuchwa: delikatne odchylenie głowy i uniesienie żuchwy. Nie wykonuj nadmiernego przeprostu szyi.",
      zadanie:
        "Jeżeli widzisz ciało obce w jamie ustnej, usuń je tylko wtedy, gdy jest dobrze widoczne. Nie wykonuj ślepego wygarniania palcem.",
      reakcja: "Brak reakcji",
      oddech: "Nieoceniony",
      stan: "Drogi oddechowe",
      instrukcja: [
        "Połóż jedną dłoń na czole dziecka.",
        "Opuszki dwóch palców drugiej dłoni ułóż pod brodą — na części kostnej, nie uciskając tkanek miękkich pod językiem.",
        "Delikatnie odchyl głowę dziecka do tyłu i jednocześnie unieś żuchwę.",
        "Nie wykonuj nadmiernego przeprostu szyi, ponieważ może to utrudnić drożność dróg oddechowych.",
        "Sprawdź jamę ustną tylko wzrokiem.",
        "Usuń ciało obce tylko wtedy, gdy jest dobrze widoczne i łatwe do usunięcia.",
        "Nie wykonuj ślepego wygarniania palcem.",
      ],
    },

    oddech: {
      obraz: "/scene-pbls-child-breathing.png",
      czynność: "Oceń oddech przez 10 sekund",
      opis:
        "Pochyl się nad dzieckiem. Oceń oddech metodą: widzę, słyszę, czuję.",
      zadanie:
        "Obserwuj ruch klatki piersiowej, nasłuchuj oddechu i wyczuwaj powietrze na policzku. Ocena nie powinna trwać dłużej niż 10 sekund.",
      reakcja: "Brak reakcji",
      oddech:
        oddechTimer === 0 ? "Brak prawidłowego oddechu" : "W trakcie oceny",
      stan: "Ocena oddechu",
    },

    oddechy: {
      obraz: "/scene-pbls-child-breaths.png",
      czynność: "Wezwij ZRM i wykonaj 5 oddechów",
      opis:
        "Dziecko nie reaguje i nie oddycha prawidłowo. Teraz wskaż konkretną osobę do wezwania ZRM i przyniesienia AED, a następnie wykonaj 5 oddechów ratowniczych.",
      zadanie:
        "Powiedz: „Pan w zielonej bluzie — proszę zadzwonić pod 112 i przynieść AED”. Następnie wykonaj 5 spokojnych oddechów ratowniczych.",
      reakcja: "Brak reakcji",
      oddech: "Brak prawidłowego oddechu",
      stan: "Wentylacja",
      instrukcja: [
        "U dzieci zatrzymanie krążenia najczęściej ma przyczynę oddechową.",
        "Dlatego kluczowe jest rozpoczęcie od 5 oddechów ratowniczych — mają one dostarczyć tlen i mogą przywrócić skuteczny oddech.",
        "Najpierw utrzymaj udrożnione drogi oddechowe rękoczynem czoło-żuchwa.",
        "Zaciśnij nos dziecka.",
        "Obejmij szczelnie ustami usta dziecka.",
        "Wdmuchuj powietrze spokojnie przez około 1 sekundę.",
        "Obserwuj, czy klatka piersiowa się unosi.",
        "Wykonaj łącznie 5 oddechów ratowniczych.",
        "Jeżeli klatka piersiowa się nie unosi, popraw udrożnienie dróg oddechowych i spróbuj ponownie.",
      ],
    },

    oznaki: {
      obraz: "/scene-pbls-child-signs.png",
      czynność: "Oceń oznaki życia",
      opis:
        "Po wykonaniu 5 oddechów ratowniczych oceń, czy pojawiły się oznaki życia.",
      zadanie:
        "Zwróć uwagę na prawidłowy oddech, ruch, kaszel lub reakcję dziecka. Jeżeli brak oznak życia — rozpocznij RKO.",
      reakcja: "Brak reakcji",
      oddech: "Nieprawidłowy",
      stan: "Brak oznak życia",
    },

    rko: {
      obraz: "/scene-pbls-child-cpr.png",
      czynność: "Rozpocznij RKO dziecka",
      opis:
        "Rozpocznij resuscytację krążeniowo-oddechową. Uciskaj dolną połowę mostka jedną ręką.",
      zadanie:
        "Uciskaj klatkę piersiową na głębokość około 1/3 jej wymiaru, czyli około 5 cm. Tempo: 100–120/min. Wykonuj schemat 15 uciśnięć i 2 oddechy.",
      reakcja: "Brak reakcji",
      oddech: "Brak prawidłowego oddechu",
      stan: "RKO/PBLS",
    },

    aed: {
      obraz: "/scene-pbls-child-aed.png",
      czynność: "Podłącz AED",
      opis:
        "AED zostało przyniesione. Włącz urządzenie i naklej elektrody zgodnie z ilustracją.",
      zadanie:
        "Jeżeli dostępne są elektrody pediatryczne — użyj ich. Postępuj zgodnie z poleceniami AED. Nie dotykaj dziecka podczas analizy rytmu.",
      reakcja: "Brak reakcji",
      oddech: "Brak prawidłowego oddechu",
      stan: "AED",
      instrukcja: [
        "Włącz AED.",
        "Odsłoń klatkę piersiową dziecka.",
        "Naklej elektrody zgodnie z ilustracją na elektrodach.",
        "Jeżeli masz elektrody pediatryczne — użyj ich.",
        "Jeżeli nie masz elektrod pediatrycznych, użyj dostępnego AED zgodnie z poleceniami urządzenia.",
        "Nie dotykaj dziecka podczas analizy rytmu.",
        "Wykonaj wyładowanie tylko wtedy, gdy AED je zaleci.",
        "Po wyładowaniu natychmiast wróć do RKO.",
      ],
    },

    kontynuacja: {
      obraz: "/scene-pbls-child-cpr.png",
      czynność: "Kontynuuj PBLS",
      opis:
        "Kontynuuj resuscytację do czasu przyjazdu ZRM, powrotu oznak życia, przejęcia działań przez innych ratowników albo wyczerpania sił.",
      zadanie:
        "Minimalizuj przerwy w uciskaniu klatki piersiowej i kontynuuj schemat 15:2.",
      reakcja: "Brak reakcji",
      oddech: "Brak prawidłowego oddechu",
      stan: "Kontynuacja RKO",
    },
  };

  const aktualny = daneEtapu[etap];

  function dodajLog(tekst) {
    setLog((prev) => [tekst, ...prev]);
  }

  function przejdz(nowyEtap, wpis) {
    setHistoria((prev) => [...prev, etap]);
    setEtap(nowyEtap);
    setShowInstrukcja(false);
    dodajLog(wpis);
  }

  function cofnijEtap() {
    if (historia.length === 0) return;

    const poprzedni = historia[historia.length - 1];

    setHistoria((prev) => prev.slice(0, -1));
    setEtap(poprzedni);
    setShowInstrukcja(false);
    setLog((prev) => ["Cofnięto do poprzedniego etapu.", ...prev]);
  }

  function startOcenyOddechu() {
    if (oddechTrwa) return;

    setOddechTrwa(true);
    setOddechTimer(10);
    dodajLog("Rozpoczęto 10-sekundową ocenę oddechu.");

    let czas = 10;

    const interval = setInterval(() => {
      czas -= 1;
      setOddechTimer(czas);

      if (czas <= 0) {
        clearInterval(interval);
        setOddechTrwa(false);
        przejdz(
          "oddechy",
          "Ocena oddechu zakończona. Brak prawidłowego oddechu."
        );
      }
    }, 1000);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold">SYMULATOR PBLS</h1>
            <p className="text-slate-500 mt-2">
              Dziecko powyżej 1. roku życia
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
            <div className="relative h-[520px] rounded-2xl overflow-hidden border bg-slate-200">
              <img
                src={aktualny.obraz}
                alt="Scena PBLS"
                className="w-full h-full object-cover"
              />

              <div className="absolute left-8 bottom-8 bg-slate-900/85 text-white p-4 rounded-2xl max-w-md">
                <p className="text-sm text-slate-300">AKTUALNA CZYNNOŚĆ</p>
                <p className="text-xl font-bold">{aktualny.czynność}</p>
              </div>
            </div>

            {aktualny.instrukcja && (
              <div className="relative">
                <button
                  onClick={() => setShowInstrukcja(!showInstrukcja)}
                  className="absolute -left-4 top-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-r-2xl font-bold shadow"
                >
                  {showInstrukcja ? "×" : "?"}
                </button>

                {showInstrukcja && (
                  <div className="bg-blue-50 border border-blue-300 rounded-2xl p-5 mt-4">
                    <h3 className="text-blue-700 font-bold text-xl mb-3">
                      Instrukcja kroku
                    </h3>

                    <ol className="list-decimal ml-6 space-y-2">
                      {aktualny.instrukcja.map((punkt, index) => (
                        <li key={index}>{punkt}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            )}

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

              {etap === "start" && (
                <button
                  onClick={() =>
                    przejdz(
                      "reakcja",
                      "Miejsce zdarzenia ocenione jako bezpieczne."
                    )
                  }
                  className="bg-blue-700 hover:bg-blue-800 text-white p-5 rounded-2xl font-bold"
                >
                  Miejsce bezpieczne — podejdź do dziecka
                </button>
              )}

              {etap === "reakcja" && (
                <button
                  onClick={() =>
                    przejdz("pomoc", "Oceniono reakcję. Dziecko nie reaguje.")
                  }
                  className="bg-blue-700 hover:bg-blue-800 text-white p-5 rounded-2xl font-bold"
                >
                  Dziecko nie reaguje
                </button>
              )}

              {etap === "pomoc" && (
                <button
                  onClick={() =>
                    przejdz(
                      "drogi",
                      "Zawołano o pomoc. Przejście do udrożnienia dróg oddechowych."
                    )
                  }
                  className="bg-purple-700 hover:bg-purple-800 text-white p-5 rounded-2xl font-bold"
                >
                  Udrożnij drogi oddechowe
                </button>
              )}

              {etap === "drogi" && (
                <button
                  onClick={() =>
                    przejdz(
                      "oddech",
                      "Drogi oddechowe udrożnione. Rozpoczęto ocenę oddechu."
                    )
                  }
                  className="bg-orange-500 hover:bg-orange-600 text-white p-5 rounded-2xl font-bold"
                >
                  Oceń oddech przez 10 sekund
                </button>
              )}

              {etap === "oddech" && (
                <div className="bg-orange-50 border border-orange-300 rounded-2xl p-5">
                  <h3 className="text-xl font-bold text-orange-700 mb-2">
                    Ocena oddechu
                  </h3>

                  <p>
                    Oceń oddech metodą „widzę — słyszę — czuję” przez
                    maksymalnie 10 sekund.
                  </p>

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

              {etap === "oddechy" && (
                <button
                  onClick={() =>
                    przejdz("oznaki", "Wezwano ZRM/AED i wykonano 5 oddechów.")
                  }
                  className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-2xl font-bold"
                >
                  Wykonaj 5 oddechów ratowniczych
                </button>
              )}

              {etap === "oznaki" && (
                <button
                  onClick={() =>
                    przejdz("rko", "Brak oznak życia. Rozpoczęto RKO dziecka.")
                  }
                  className="bg-red-700 hover:bg-red-800 text-white p-5 rounded-2xl font-bold"
                >
                  Brak oznak życia — rozpocznij RKO
                </button>
              )}

              {etap === "rko" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => przejdz("aed", "AED zostało dostarczone.")}
                    className="bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl font-bold"
                  >
                    AED dostępne
                  </button>

                  <button
                    onClick={() =>
                      przejdz("kontynuacja", "Kontynuacja PBLS bez AED.")
                    }
                    className="bg-slate-700 hover:bg-slate-800 text-white p-5 rounded-2xl font-bold"
                  >
                    Kontynuuj PBLS
                  </button>
                </div>
              )}

              {(etap === "aed" || etap === "kontynuacja") && (
                <div className="bg-red-50 border border-red-300 rounded-2xl p-5">
                  <h3 className="text-xl font-bold text-red-700 mb-2">
                    Kontynuuj działania
                  </h3>

                  <p>
                    Prowadź PBLS do czasu przyjazdu ZRM, powrotu oznak życia
                    lub wyczerpania fizycznego.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white border rounded-2xl p-5">
              <h2 className="text-blue-700 font-bold text-xl mb-4">
                STAN DZIECKA
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
                  <span>Stan</span>
                  <b className="text-red-500">{aktualny.stan}</b>
                </div>

                <div className="flex justify-between">
                  <span>Wiek</span>
                  <b>Dziecko &gt; 1 rok</b>
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