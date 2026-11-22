import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RomanticCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

const WEEKDAYS = [
  { short: 'Mon', full: 'Monday' },
  { short: 'Tue', full: 'Tuesday' },
  { short: 'Wed', full: 'Wednesday' },
  { short: 'Thu', full: 'Thursday' },
  { short: 'Fri', full: 'Friday' },
  { short: 'Sat', full: 'Saturday' },
  { short: 'Sun', full: 'Sunday' },
];

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date | null, b: Date): boolean {
  if (!a) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export const RomanticCalendar: React.FC<RomanticCalendarProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewYear, setViewYear] = useState<number>(() =>
    selectedDate ? selectedDate.getFullYear() : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState<number>(() =>
    selectedDate ? selectedDate.getMonth() : today.getMonth()
  );

  const isAtCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const monthLabel = useMemo(() => {
    return new Date(viewYear, viewMonth, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [viewYear, viewMonth]);

  const calendarCells = useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    // Monday-first offset: Sun (0) -> 6, Mon (1) -> 0, ...
    const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;

    const cells: Array<{ date: Date | null; key: string }> = [];
    for (let i = 0; i < leadingBlanks; i++) {
      cells.push({ date: null, key: `blank-start-${i}` });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({
        date: new Date(viewYear, viewMonth, day),
        key: `day-${viewYear}-${viewMonth}-${day}`,
      });
    }
    return cells;
  }, [viewYear, viewMonth]);

  const handlePrevMonth = () => {
    if (isAtCurrentMonth) return;
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const formattedSelected = selectedDate
    ? selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div className="w-full rounded-[22px] bg-white/95 border border-white p-4 sm:p-6 shadow-[0_8px_24px_rgba(255,23,68,0.1)]">
      {/* Month Navigation */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={isAtCurrentMonth}
          aria-label="Previous month"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FFE5EC] text-[#9D174D] transition-all duration-150 hover:bg-[#FFB8CE] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1744]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h3 className="font-display font-bold text-[#111827] text-lg sm:text-xl tracking-tight text-center">
          {monthLabel}
        </h3>

        <button
          type="button"
          onClick={handleNextMonth}
          aria-label="Next month"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FFE5EC] text-[#9D174D] transition-all duration-150 hover:bg-[#FFB8CE] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1744]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Seven Weekdays (Monday -> Sunday) */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
        {WEEKDAYS.map((wd) => (
          <div
            key={wd.full}
            className="text-[11px] sm:text-xs font-display font-bold text-[#9D174D] py-1"
            title={wd.full}
          >
            <span className="md:hidden">{wd.short}</span>
            <span className="hidden md:inline">{wd.full}</span>
          </div>
        ))}
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {calendarCells.map((cell) => {
          if (!cell.date) {
            return <div key={cell.key} className="h-10 sm:h-11" aria-hidden="true" />;
          }

          const cellDate = cell.date;
          const isPast = cellDate.getTime() < today.getTime();
          const isToday = isSameDay(today, cellDate);
          const isSelected = isSameDay(selectedDate, cellDate);

          return (
            <button
              key={cell.key}
              type="button"
              disabled={isPast}
              onClick={() => onSelectDate(cellDate)}
              aria-pressed={isSelected}
              aria-label={cellDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              className={`mx-auto flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full font-display font-bold text-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1744] ${
                isPast
                  ? 'text-[#CBD5E1] cursor-not-allowed'
                  : isSelected
                    ? 'bg-gradient-to-br from-[#FF4D79] to-[#FF1744] text-white shadow-[0_6px_16px_rgba(255,23,68,0.4)] scale-105 cursor-pointer'
                    : isToday
                      ? 'bg-[#FFE5EC] text-[#D9043D] ring-2 ring-[#FF4D79]/50 hover:bg-[#FFB8CE] cursor-pointer'
                      : 'text-[#1F2937] hover:bg-[#FFE5EC] hover:text-[#D9043D] cursor-pointer'
              }`}
            >
              {cellDate.getDate()}
            </button>
          );
        })}
      </div>

      {/* Selected Date Readout */}
      <div className="mt-4 pt-3 border-t border-[#FFE5EC] text-center text-sm font-semibold text-[#4A1426]">
        {formattedSelected ? (
          <span>
            Selected Date: <strong className="text-[#D9043D]">{formattedSelected}</strong>
          </span>
        ) : (
          <span className="text-[#7C3A52]">Tap any available future date above to pick our day</span>
        )}
      </div>
    </div>
  );
};
