"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import BrushUnderline from "./BrushUnderline";

const MONTHS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const DAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDateISO(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatDateLong(d: Date) {
  return `${DAYS_FR[(d.getDay() + 6) % 7]} ${d.getDate()} ${MONTHS_FR[d.getMonth()].toLowerCase()}`;
}

/** Date+heure de début d'un créneau (ex. "14:00") pour un jour donné. */
function slotStart(date: Date, slot: string): Date {
  const [h, m] = slot.split(":").map(Number);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, 0, 0);
}

/** Vrai s'il reste au moins un créneau à venir ce jour-là (par rapport à maintenant). */
function dayHasFutureSlot(date: Date, now: Date): boolean {
  return TIME_SLOTS.some((slot) => slotStart(date, slot) > now);
}

export default function BookingCalendar() {
  const now = useMemo(() => new Date(), []);
  const today = useMemo(() => startOfDay(now), [now]);
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const days = useMemo(() => buildMonthGrid(viewMonth), [viewMonth]);

  const canGoPrev =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() &&
      viewMonth.getMonth() > today.getMonth());

  function changeMonth(delta: number) {
    setViewMonth(
      (m) => new Date(m.getFullYear(), m.getMonth() + delta, 1)
    );
    setSelectedDate(null);
    setSelectedSlot(null);
  }

  function selectDate(d: Date) {
    if (d.getDay() === 0) return; // dimanche fermé
    if (d < today) return; // jour passé
    if (!dayHasFutureSlot(d, now)) return; // aujourd'hui mais plus aucun créneau
    setSelectedDate(d);
    setSelectedSlot(null);
  }

  const confirmHref = selectedDate && selectedSlot
    ? `/demande?date=${formatDateISO(selectedDate)}&time=${selectedSlot}`
    : "/demande";

  return (
    <section id="rendez-vous" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-content mx-auto px-page">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-french-blue bg-french-blue/5 px-3 py-1 rounded-full border border-french-blue/10 mb-4">
            Réservez en ligne
          </span>
          <h2 className="text-[26px] leading-8 sm:text-[32px] sm:leading-10 font-bold tracking-tight text-ink-black mb-4">
            <span className="relative inline-block">
              Prenez un rendez-vous
              <BrushUnderline />
            </span>
          </h2>
          <p className="text-[16px] text-on-surface-variant max-w-2xl mx-auto">
            Choisissez le créneau qui vous convient pour un premier échange de
            30 minutes. Gratuit et sans engagement.
          </p>
        </div>

        <div className="bg-white border border-ink-black/[0.08] rounded-2xl shadow-md p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Calendrier */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  disabled={!canGoPrev}
                  aria-label="Mois précédent"
                  className="w-10 h-10 rounded-lg border border-ink-black/10 flex items-center justify-center text-ink-black hover:bg-french-blue hover:text-white hover:border-french-blue disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink-black disabled:cursor-not-allowed transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_left
                  </span>
                </button>
                <h3 className="text-[18px] font-bold text-ink-black tracking-tight">
                  {MONTHS_FR[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                </h3>
                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  aria-label="Mois suivant"
                  className="w-10 h-10 rounded-lg border border-ink-black/10 flex items-center justify-center text-ink-black hover:bg-french-blue hover:text-white hover:border-french-blue transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_right
                  </span>
                </button>
              </div>

              {/* En-tête des jours */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {DAYS_FR.map((d) => (
                  <div
                    key={d}
                    className="text-center text-[11px] font-bold uppercase tracking-wider text-on-surface-variant py-2"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Grille des jours */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((d, i) => {
                  if (!d) {
                    return <div key={`empty-${i}`} />;
                  }
                  const isPast = d < today;
                  const isSunday = d.getDay() === 0;
                  const isToday = d.getTime() === today.getTime();
                  const isSelected =
                    selectedDate && d.getTime() === selectedDate.getTime();
                  // Aujourd'hui devient indisponible s'il ne reste aucun créneau à venir.
                  const noSlotsLeft = !isPast && !isSunday && !dayHasFutureSlot(d, now);
                  const disabled = isPast || isSunday || noSlotsLeft;

                  return (
                    <button
                      key={d.toISOString()}
                      type="button"
                      onClick={() => selectDate(d)}
                      disabled={disabled}
                      className={[
                        "aspect-square rounded-lg flex items-center justify-center text-[14px] font-semibold transition-all",
                        disabled
                          ? "text-ink-black/20 cursor-not-allowed"
                          : "text-ink-black hover:bg-french-blue/10 cursor-pointer",
                        isSelected &&
                          "!bg-french-blue !text-white shadow-md scale-105",
                        isToday && !isSelected
                          ? "ring-1 ring-french-blue/40"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 mt-6 text-[12px] text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-french-blue" />
                  Sélectionné
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm ring-1 ring-french-blue/40 bg-white" />
                  Aujourd&apos;hui
                </span>
                <span className="opacity-70">
                  Dimanches & jours passés indisponibles
                </span>
              </div>
            </div>

            {/* Créneaux horaires */}
            <div className="lg:col-span-2 lg:border-l lg:border-ink-black/[0.08] lg:pl-10">
              <h3 className="text-[18px] font-bold text-ink-black tracking-tight mb-1">
                {selectedDate
                  ? formatDateLong(selectedDate)
                  : "Choisissez une date"}
              </h3>
              <p className="text-[13px] text-on-surface-variant mb-6">
                {selectedDate
                  ? "Sélectionnez un créneau horaire :"
                  : "Cliquez sur un jour pour voir les créneaux disponibles."}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2.5">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  const isPastSlot = selectedDate
                    ? slotStart(selectedDate, slot) <= now
                    : false;
                  const disabled = !selectedDate || isPastSlot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      disabled={disabled}
                      className={[
                        "py-3 rounded-lg text-[14px] font-semibold border transition-all",
                        disabled
                          ? "border-ink-black/5 text-ink-black/20 cursor-not-allowed bg-ink-black/[0.02]"
                          : isSelected
                          ? "bg-french-blue border-french-blue text-white shadow-md"
                          : "bg-white border-ink-black/10 text-ink-black hover:border-french-blue hover:text-french-blue cursor-pointer",
                      ].join(" ")}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              {/* Résumé + CTA */}
              <div className="mt-8">
                {selectedDate && selectedSlot ? (
                  <div className="bg-french-blue/5 border border-french-blue/15 rounded-xl p-4 mb-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-french-blue">
                      event_available
                    </span>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-french-blue mb-0.5">
                        Créneau choisi
                      </p>
                      <p className="text-[14px] font-semibold text-ink-black">
                        {formatDateLong(selectedDate)} à {selectedSlot}
                      </p>
                    </div>
                  </div>
                ) : null}

                <Link
                  href={confirmHref}
                  className={[
                    "w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl text-[14px] font-bold tracking-wide shadow-md transition-all",
                    selectedDate && selectedSlot
                      ? "bg-french-blue hover:bg-[#000066] text-white"
                      : "bg-ink-black/[0.06] text-ink-black/40 pointer-events-none",
                  ].join(" ")}
                  aria-disabled={!(selectedDate && selectedSlot)}
                >
                  Confirmer ce rendez-vous
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'wght' 400" }}
                  >
                    arrow_right_alt
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Retourne un tableau de 35 (ou 42) cases représentant la grille du mois affiché.
 * Les cases avant le 1er du mois sont `null`. Semaine commence lundi.
 */
function buildMonthGrid(monthStart: Date): (Date | null)[] {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  // Décalage : on veut lundi = 0
  const offset = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  // Compléter pour atteindre un multiple de 7
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
