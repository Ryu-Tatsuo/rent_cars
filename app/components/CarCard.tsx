import React from "react";
import { Gauge, Fuel, Settings2, ArrowRight, MessageCircle } from "lucide-react";
import { Car, fmt$, fmtMi, Page, getWhatsAppUrl } from "../data";
import { Lang, t } from "../i18n";

interface CarCardProps {
  car: Car;
  navigate: (p: Page) => void;
  lang: Lang;
  eager?: boolean;
}

export const CarCard: React.FC<CarCardProps> = ({ car, navigate, lang, eager = false }) => {
  const waMsg =
    lang === "ar"
      ? `السلام عليكم Apex Auto، أرغب في الاستفسار عن سيارة ${car.year} ${car.make} ${car.model} (الثمن: ${fmt$(car.price)}).`
      : `Bonjour Apex Auto, je suis intéressé par la ${car.year} ${car.make} ${car.model} (${fmt$(car.price)}). Est-elle toujours disponible ?`;

  const waUrl = getWhatsAppUrl(waMsg);

  const originStyles: Record<Car["originTag"], string> = {
    "WW Maroc": "bg-emerald-600/90 text-white border-emerald-500",
    Dédouanée: "bg-amber-600/90 text-white border-amber-500",
    "WW Neuve": "bg-sky-600/90 text-white border-sky-500",
  };

  return (
    <div className="group bg-white text-left rtl:text-right w-full rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col focus:outline-none">
      {/* Image container */}
      <div
        className="relative overflow-hidden bg-stone-100 aspect-[16/10] cursor-pointer"
        onClick={() => navigate({ name: "car", id: car.id })}
      >
        <img
          src={car.image}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading={eager ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Moroccan Origin Tag Badge */}
        <span
          className={`absolute top-3 left-3 rtl:left-auto rtl:right-3 text-[11px] font-body font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-sm tracking-wide border ${originStyles[car.originTag]}`}
        >
          {car.originTag}
        </span>

        {/* Vignette badge if paid */}
        {car.vignettePaid && (
          <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 text-[10px] font-body font-semibold px-2.5 py-0.5 rounded-full bg-stone-900/80 text-amber-400 backdrop-blur-md border border-stone-700">
            Vignette 2026 Payée
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              onClick={() => navigate({ name: "car", id: car.id })}
              className="font-display font-black text-stone-900 text-lg leading-snug group-hover:text-amber-700 transition-colors cursor-pointer"
            >
              {car.year} {car.make} {car.model}
            </h3>
          </div>

          {/* Price badge with Western numbers in MAD */}
          <div className="mb-3">
            <span className="font-display font-black text-amber-600 text-2xl leading-none inline-block bg-amber-50 px-3 py-1 rounded-lg border border-amber-200/60" dir="ltr">
              {fmt$(car.price)}
            </span>
          </div>

          <p className="text-xs text-stone-500 line-clamp-2 mb-4 leading-relaxed font-body">
            {car.description}
          </p>
        </div>

        <div>
          {/* Specs footer */}
          <div className="flex items-center justify-between text-xs text-stone-600 border-t border-stone-100 pt-3 mb-4 font-body">
            <span className="flex items-center gap-1.5 font-semibold" dir="ltr">
              <Gauge size={13} className="text-amber-600" />
              {fmtMi(car.mileage)}
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Fuel size={13} className="text-amber-600" />
              {car.fuelType}
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Settings2 size={13} className="text-amber-600" />
              {car.transmission}
            </span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 py-2.5 rounded-xl text-xs font-body font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle size={14} className="text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => navigate({ name: "car", id: car.id })}
              className="bg-stone-900 hover:bg-stone-800 text-white py-2.5 rounded-xl text-xs font-body font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
            >
              <span>{t(lang, "viewAll")}</span>
              <ArrowRight size={12} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
