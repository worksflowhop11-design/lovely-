import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Check, Copy, Edit3 } from 'lucide-react';
import { FloatingHearts } from './FloatingHearts';
import { FoodId, FoodIllustration } from './FoodIllustration';
import { HeartBurst } from './HeartBurst';
import { RomanticCalendar } from './RomanticCalendar';
import { TeddyIllustration } from './TeddyIllustration';

export const OWNER_WHATSAPP_NUMBER = '918866377514';

interface DatePlannerProps {
  onBackToHome: () => void;
}

type PlannerStep = 'form' | 'confirmed';

const TIME_SLOTS = [
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
];

const FOOD_OPTIONS: Array<{ id: FoodId; label: string }> = [
  { id: 'pizza', label: 'Pizza 🍕' },
  { id: 'burger', label: 'Burger 🍔' },
  { id: 'pasta', label: 'Pasta 🍝' },
  { id: 'ice-cream', label: 'Ice Cream 🍦' },
  { id: 'coffee-dessert', label: 'Coffee & Dessert ☕' },
  { id: 'chinese', label: 'Chinese Food 🍜' },
  { id: 'something-else', label: 'Something Else ❤️' },
];

const PLACE_OPTIONS = [
  { id: 'cafe', label: 'Cute Café ☕', subtitle: 'Cozy drinks & sweet talks' },
  { id: 'pizza-place', label: 'Pizza Restaurant 🍕', subtitle: 'Warm slices & laughs' },
  { id: 'movie-dinner', label: 'Movie + Dinner 🎬', subtitle: 'Popcorn & evening stroll' },
  { id: 'your-choice', label: 'Your Choice 💕', subtitle: 'Surprise me anytime' },
];

export const DatePlanner: React.FC<DatePlannerProps> = ({ onBackToHome }) => {
  const [step, setStep] = useState<PlannerStep>('form');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [customFoodNote, setCustomFoodNote] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useState<string>('');
  const [personalMessage, setPersonalMessage] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [whatsAppOpened, setWhatsAppOpened] = useState<boolean>(false);
  const [successBurstKey, setSuccessBurstKey] = useState<number>(1);

  const dateSectionRef = useRef<HTMLDivElement>(null);
  const timeSectionRef = useRef<HTMLDivElement>(null);
  const foodSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const toggleFood = (label: string) => {
    setValidationError('');
    setSelectedFoods((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const formattedDateText = useMemo(() => {
    if (!selectedDate) return '';
    return selectedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [selectedDate]);

  const weekdayText = useMemo(() => {
    if (!selectedDate) return '';
    return selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
  }, [selectedDate]);

  const resolvedFoodText = useMemo(() => {
    const items = selectedFoods.map((food) => {
      if (food === 'Something Else ❤️' && customFoodNote.trim()) {
        return `Something Else (${customFoodNote.trim()}) ❤️`;
      }
      return food;
    });
    return items.join(', ');
  }, [selectedFoods, customFoodNote]);

  const resolvedPlaceText = selectedPlace || 'Your Choice 💕';
  const resolvedMessageText = personalMessage.trim() || 'No extra note — just excited to see you!';

  const generatedMessage = useMemo(() => {
    return [
      '💕 OUR DATE PLAN 💕',
      '',
      "Hey! I've planned our date! ❤️",
      '',
      `📅 Date: ${formattedDateText}`,
      `📆 Day: ${weekdayText}`,
      `⏰ Time: ${selectedTime}`,
      `🍕 Food: ${resolvedFoodText}`,
      `📍 Place: ${resolvedPlaceText}`,
      '',
      '💌 Personal Message:',
      resolvedMessageText,
      '',
      "Can't wait to spend some lovely time together! ❤️",
    ].join('\n');
  }, [
    formattedDateText,
    weekdayText,
    selectedTime,
    resolvedFoodText,
    resolvedPlaceText,
    resolvedMessageText,
  ]);

  const whatsappUrl = useMemo(() => {
    const encoded = encodeURIComponent(generatedMessage);
    return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encoded}`;
  }, [generatedMessage]);

  const handleConfirmDate = () => {
    const missing: string[] = [];
    if (!selectedDate) missing.push('a date');
    if (!selectedTime) missing.push('a time');
    if (selectedFoods.length === 0) missing.push('at least one food option');

    if (missing.length > 0) {
      setValidationError(`Please choose ${missing.join(', ')} before confirming our date.`);
      if (!selectedDate) {
        dateSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (!selectedTime) {
        timeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        foodSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setValidationError('');
    setCopied(false);
    setWhatsAppOpened(false);
    setSuccessBurstKey((k) => k + 1);
    setStep('confirmed');
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = generatedMessage;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    }
  };

  return (
    <main className="relative min-h-dvh w-full bg-[#0D1524] flex flex-col items-center justify-start px-4 py-8 pb-20 sm:px-6 sm:py-12 sm:pb-20 overflow-x-hidden">
      {/* Ambient Floating Hearts & Sparkles Around the Card */}
      <FloatingHearts
        variant="ambient"
        intensity={step === 'confirmed' ? 'celebrate' : 'normal'}
      />

      {/* Page 2 Heading & Subtitle */}
      <header className="animate-title-in relative z-10 text-center max-w-2xl mb-6 sm:mb-8 select-none">
        <h1 className="font-display font-extrabold tracking-tight text-balance text-[1.95rem] sm:text-[2.85rem] md:text-[3.25rem] leading-tight">
          <span className="text-white">Let&apos;s Plan Our </span>
          <span className="text-[#FF1744] drop-shadow-[0_4px_18px_rgba(255,23,68,0.38)]">
            Date! 💗
          </span>
        </h1>
        <p className="mt-2 font-body font-semibold text-[#FCE7F3] text-sm sm:text-lg text-balance">
          A little time together, a little food and lots of smiles.
        </p>
      </header>

      {/* Large Pastel Pink Card */}
      <section className="animate-card-in relative z-10 w-full max-w-[900px] rounded-[28px] bg-[#FFD0DF] border-2 border-white shadow-[0_24px_64px_rgba(0,0,0,0.48),0_0_45px_rgba(255,23,68,0.16)] px-5 py-7 sm:px-10 sm:py-10 overflow-hidden">
        <FloatingHearts
          variant="card"
          intensity={step === 'confirmed' ? 'celebrate' : 'normal'}
        />

        {step === 'confirmed' && <HeartBurst burstKey={successBurstKey} />}

        {/* Top Navigation Back Action inside Card */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={step === 'form' ? onBackToHome : () => setStep('form')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/85 hover:bg-white text-[#4A1426] font-display font-bold text-xs sm:text-sm shadow-sm transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1744]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 'form' ? 'Back' : 'Edit My Choices'}</span>
          </button>
        </div>

        {/* === STEP 1: INTERACTIVE DATE PLANNER FORM === */}
        {step === 'form' && (
          <div className="relative z-10 flex flex-col gap-8 sm:gap-10">
            {/* Cute Teddy Bear Cafe Illustration */}
            <div className="flex flex-col items-center text-center">
              <TeddyIllustration mode="cafe" />
            </div>

            {/* SECTION 1: CHOOSE YOUR DATE */}
            <div ref={dateSectionRef} className="flex flex-col gap-3">
              <div className="text-center sm:text-left">
                <h2 className="font-display font-extrabold text-[#111827] text-xl sm:text-2xl tracking-tight">
                  1. Choose Your Date
                </h2>
                <p className="text-sm font-semibold text-[#5C2338]">
                  Pick any upcoming day that works best for you
                </p>
              </div>
              <RomanticCalendar
                selectedDate={selectedDate}
                onSelectDate={(date) => {
                  setValidationError('');
                  setSelectedDate(date);
                }}
              />
            </div>

            {/* SECTION 2: CHOOSE YOUR TIME */}
            <div ref={timeSectionRef} className="flex flex-col gap-3">
              <div className="text-center sm:text-left">
                <h2 className="font-display font-extrabold text-[#111827] text-xl sm:text-2xl tracking-tight">
                  2. Choose Your Time
                </h2>
                <p className="text-sm font-semibold text-[#5C2338]">
                  Select one time slot for our date
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setValidationError('');
                        setSelectedTime(slot);
                      }}
                      aria-pressed={isSelected}
                      className={`min-h-[48px] px-4 py-2.5 rounded-2xl font-display font-bold text-sm sm:text-base transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1744] ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#FF4D79] to-[#FF1744] text-white shadow-[0_8px_20px_rgba(255,23,68,0.36)] scale-[1.02] border border-white/50'
                          : 'bg-white/95 text-[#2A141D] hover:bg-white hover:scale-[1.02] border border-white shadow-sm'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 3: WHAT WOULD YOU LIKE TO EAT? */}
            <div ref={foodSectionRef} className="flex flex-col gap-3">
              <div className="text-center sm:text-left">
                <h2 className="font-display font-extrabold text-[#111827] text-xl sm:text-2xl tracking-tight">
                  3. What Would You Like To Eat?
                </h2>
                <p className="text-sm font-semibold text-[#5C2338]">
                  Pick one or more cravings you&apos;d love
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {FOOD_OPTIONS.map((food) => {
                  const isSelected = selectedFoods.includes(food.label);
                  return (
                    <button
                      key={food.id}
                      type="button"
                      onClick={() => toggleFood(food.label)}
                      aria-pressed={isSelected}
                      className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-[20px] text-center transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1744] ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#FF5C8A] to-[#FF1744] text-white shadow-[0_10px_24px_rgba(255,23,68,0.34)] scale-[1.02] border-2 border-white'
                          : 'bg-white/95 text-[#1F2937] hover:bg-white hover:scale-[1.02] border-2 border-white shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2.5 right-2.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#FF1744]">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFF0F5]">
                        <FoodIllustration id={food.id} />
                      </div>
                      <span className="font-display font-bold text-sm leading-snug">
                        {food.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedFoods.includes('Something Else ❤️') && (
                <div className="mt-1">
                  <input
                    type="text"
                    value={customFoodNote}
                    onChange={(e) => setCustomFoodNote(e.target.value)}
                    placeholder="Tell me what you're craving (optional)..."
                    aria-label="Custom food craving"
                    className="w-full rounded-2xl bg-white/95 border border-white px-4 py-3 text-sm sm:text-base font-semibold text-[#1F2937] placeholder:text-[#9CA3AF] shadow-sm focus:outline-2 focus:outline-[#FF1744]"
                  />
                </div>
              )}
            </div>

            {/* SECTION 4: WHERE SHOULD WE GO? */}
            <div className="flex flex-col gap-3">
              <div className="text-center sm:text-left">
                <h2 className="font-display font-extrabold text-[#111827] text-xl sm:text-2xl tracking-tight">
                  4. Where Should We Go?
                </h2>
                <p className="text-sm font-semibold text-[#5C2338]">
                  Choose the vibe for our hangout
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PLACE_OPTIONS.map((place) => {
                  const isSelected = selectedPlace === place.label;
                  return (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => setSelectedPlace(place.label)}
                      aria-pressed={isSelected}
                      className={`flex items-center justify-between gap-3 px-5 py-4 rounded-[20px] text-left transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1744] ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#FF4D79] to-[#FF1744] text-white shadow-[0_10px_24px_rgba(255,23,68,0.34)] border-2 border-white'
                          : 'bg-white/95 text-[#1F2937] hover:bg-white border-2 border-white shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="font-display font-bold text-base">{place.label}</div>
                        <div
                          className={`text-xs sm:text-sm font-semibold mt-0.5 ${
                            isSelected ? 'text-white/90' : 'text-[#6B7280]'
                          }`}
                        >
                          {place.subtitle}
                        </div>
                      </div>
                      {isSelected && (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#FF1744] shrink-0">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 5: ADD A PERSONAL MESSAGE */}
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="personal-message"
                className="font-display font-extrabold text-[#111827] text-xl sm:text-2xl tracking-tight text-center sm:text-left"
              >
                5. Add a Personal Message
              </label>
              <textarea
                id="personal-message"
                rows={3}
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                placeholder="Anything else you'd like to tell me? 💌"
                className="w-full rounded-[20px] bg-white/95 border-2 border-white px-4 py-3.5 text-sm sm:text-base font-semibold text-[#1F2937] placeholder:text-[#9CA3AF] shadow-sm focus:outline-2 focus:outline-[#FF1744] resize-y"
              />
            </div>

            {/* SECTION 6: LIVE SUMMARY & CONFIRMATION */}
            <div className="rounded-[22px] bg-white/95 border-2 border-white p-5 sm:p-6 shadow-[0_8px_24px_rgba(255,23,68,0.1)]">
              <h3 className="font-display font-extrabold text-[#111827] text-lg sm:text-xl mb-3">
                Our Date Summary
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm sm:text-base">
                <div>
                  <dt className="font-bold text-[#9D174D] text-xs">Date</dt>
                  <dd className="font-semibold text-[#1F2937]">
                    {selectedDate ? `${weekdayText}, ${formattedDateText}` : 'Not selected yet'}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-[#9D174D] text-xs">Time</dt>
                  <dd className="font-semibold text-[#1F2937]">
                    {selectedTime || 'Not selected yet'}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-[#9D174D] text-xs">Food</dt>
                  <dd className="font-semibold text-[#1F2937]">
                    {selectedFoods.length > 0 ? resolvedFoodText : 'Not selected yet'}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-[#9D174D] text-xs">Place</dt>
                  <dd className="font-semibold text-[#1F2937]">{resolvedPlaceText}</dd>
                </div>
                {personalMessage.trim() && (
                  <div className="sm:col-span-2">
                    <dt className="font-bold text-[#9D174D] text-xs">Personal Message</dt>
                    <dd className="font-semibold text-[#1F2937] break-words">
                      {personalMessage.trim()}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {validationError && (
              <div
                role="alert"
                className="rounded-2xl bg-[#FFE4E6] border border-[#FF1744] px-4 py-3 text-center font-display font-bold text-sm sm:text-base text-[#9F1239]"
              >
                {validationError}
              </div>
            )}

            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={handleConfirmDate}
                className="w-full sm:w-auto min-h-[54px] px-10 py-3.5 rounded-full bg-gradient-to-r from-[#FF4D79] to-[#FF1744] text-white font-display font-extrabold text-base sm:text-lg tracking-wide shadow-[0_12px_28px_rgba(255,23,68,0.4)] border-2 border-white/50 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_16px_34px_rgba(255,23,68,0.52)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF1744] cursor-pointer"
              >
                Confirm Our Date 💗
              </button>
            </div>
          </div>
        )}

        {/* === STEP 2: FINAL DATE CONFIRMATION & WHATSAPP NOTIFICATION === */}
        {step === 'confirmed' && (
          <div
            key={`date-confirmed-${successBurstKey}`}
            className="relative z-10 flex flex-col items-center text-center gap-5 py-2"
          >
            <div className="animate-stagger-in" style={{ ['--stagger-delay' as string]: '0s' }}>
              <TeddyIllustration mode="celebrating" />
            </div>

            <h2
              className="animate-stagger-in font-display font-extrabold text-[#111827] text-[1.75rem] sm:text-[2.35rem] tracking-tight text-balance"
              style={{ ['--stagger-delay' as string]: '0.14s' }}
            >
              Yay! We Have a Date! ❤️
            </h2>

            <p
              className="animate-stagger-in font-body font-bold text-[#9D174D] text-base sm:text-xl max-w-md"
              style={{ ['--stagger-delay' as string]: '0.32s' }}
            >
              Can&apos;t wait to spend some lovely time together!
            </p>

            {/* Pink Date Summary Card */}
            <div
              className="animate-stagger-in w-full max-w-lg rounded-[24px] bg-[#FFE5EC]/95 border-2 border-white p-5 sm:p-6 shadow-[0_10px_28px_rgba(255,23,68,0.16)] text-left"
              style={{ ['--stagger-delay' as string]: '0.5s' }}
            >
              <dl className="flex flex-col gap-2.5 text-sm sm:text-base">
                <div className="flex justify-between gap-4 border-b border-white pb-2">
                  <dt className="font-bold text-[#9D174D]">📅 Date</dt>
                  <dd className="font-bold text-[#111827] text-right">{formattedDateText}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white pb-2">
                  <dt className="font-bold text-[#9D174D]">📆 Day</dt>
                  <dd className="font-bold text-[#111827] text-right">{weekdayText}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white pb-2">
                  <dt className="font-bold text-[#9D174D]">⏰ Time</dt>
                  <dd className="font-bold text-[#111827] text-right">{selectedTime}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white pb-2">
                  <dt className="font-bold text-[#9D174D]">🍕 Food</dt>
                  <dd className="font-bold text-[#111827] text-right">{resolvedFoodText}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white pb-2">
                  <dt className="font-bold text-[#9D174D]">📍 Place</dt>
                  <dd className="font-bold text-[#111827] text-right">{resolvedPlaceText}</dd>
                </div>
                <div className="pt-0.5">
                  <dt className="font-bold text-[#9D174D] mb-1">💌 Personal Message</dt>
                  <dd className="font-semibold text-[#111827] break-words bg-white/80 rounded-xl px-3.5 py-2.5 border border-white">
                    {resolvedMessageText}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Honest WhatsApp Review Instruction */}
            <p
              className="animate-stagger-in text-xs sm:text-sm font-semibold text-[#5C2338] max-w-md"
              style={{ ['--stagger-delay' as string]: '0.62s' }}
            >
              {whatsAppOpened
                ? 'WhatsApp opened with your date plan! Review your message there and tap Send — or copy it below.'
                : 'Clicking below opens WhatsApp with your message pre-filled so you can review and press Send.'}
            </p>

            {/* Primary Action Buttons */}
            <div
              className="animate-stagger-in flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-lg"
              style={{ ['--stagger-delay' as string]: '0.72s' }}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setWhatsAppOpened(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-full bg-gradient-to-r from-[#FF4D79] to-[#FF1744] text-white font-display font-extrabold text-sm sm:text-base shadow-[0_10px_24px_rgba(255,23,68,0.4)] border border-white/50 transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF1744] whitespace-nowrap"
              >
                <span>Send My Date Plan on WhatsApp 💌</span>
              </a>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-full bg-white text-[#4A1426] font-display font-bold text-sm sm:text-base border-2 border-white shadow-sm transition-all duration-150 hover:bg-[#FFF0F5] active:scale-95 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1744]"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit My Choices</span>
              </button>
            </div>

            {/* Fallback Copy Message Button */}
            <div
              className="animate-stagger-in"
              style={{ ['--stagger-delay' as string]: '0.84s' }}
            >
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/85 hover:bg-white text-[#9D174D] font-display font-bold text-xs sm:text-sm border border-white shadow-sm transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF1744]"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Message Copied!' : 'Copy Message (WhatsApp Fallback)'}</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
