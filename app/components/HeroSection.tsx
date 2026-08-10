import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronRight, MessageCircle, ArrowRight, Star } from "lucide-react";
import { Lang, t } from "../i18n";
import { Page, CARS, fmt$, getWhatsAppUrl } from "../data";

interface HeroSectionProps {
  navigate: (p: Page) => void;
  lang: Lang;
}

// Cars to showcase in the rotating hero gallery
const HERO_CARS = CARS.slice(0, 5);

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=900&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1549924231-f129b911e442?w=900&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1552519507-da3b142c5d3f?w=900&h=600&fit=crop&auto=format",
];

export const HeroSection: React.FC<HeroSectionProps> = ({ navigate, lang }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_CARS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeCar = HERO_CARS[activeIdx];

  const waMsg =
    lang === "ar"
      ? `السلام عليكم، بغيت نسول على ${activeCar.make} ${activeCar.model} لي عندكم فالمعرض ديالكم بكازا.`
      : `Bonjour, je suis intéressé(e) par la ${activeCar.make} ${activeCar.model} que vous avez en stock à Casablanca.`;

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-stone-950">
      {/* ── Rotating Background Images ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <img
            src={HERO_IMAGES[activeIdx]}
            alt={`${activeCar.make} ${activeCar.model}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-950/40 rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30" />
        </motion.div>
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* ── Left: Copy & CTAs ── */}
          <div className="lg:col-span-6 space-y-6">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-400 text-xs font-body font-bold tracking-widest uppercase backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t(lang, "tagline")}
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] uppercase tracking-tight"
            >
              {t(lang, "heroTitle1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300">
                {t(lang, "heroTitle2")}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-lg font-body"
            >
              {t(lang, "heroDesc")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <a
                href={getWhatsAppUrl(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-4 rounded-xl font-body font-bold text-sm tracking-wider uppercase shadow-lg shadow-emerald-600/30 transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95"
              >
                <MessageCircle size={18} />
                <span>{t(lang, "whatsappUs")}</span>
              </a>

              <button
                onClick={() => navigate({ name: "inventory" })}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-7 py-4 rounded-xl font-body font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>{t(lang, "browseInventory")}</span>
                <ChevronRight size={16} className="rtl:rotate-180" />
              </button>
            </motion.div>

            {/* Trust micro-badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="pt-6 border-t border-white/10 flex flex-wrap gap-6"
            >
              {[
                { icon: <Shield size={16} />, text: "WW Maroc & Dédouanées" },
                { icon: <Star size={16} />, text: "4.9★ Google Reviews" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2.5 text-stone-400 text-xs font-body font-semibold">
                  <span className="text-amber-500">{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Dynamic Car Showcase ── */}
          <div className="lg:col-span-6">
            {/* Floating car thumbnails grid */}
            <div className="relative">
              {/* Active car big card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCar.id}
                  initial={{ opacity: 0, x: 60, rotateY: -8 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -40, rotateY: 8 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={activeCar.image}
                      alt={`${activeCar.year} ${activeCar.make} ${activeCar.model}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex gap-2">
                      <span className="bg-emerald-600 text-white text-[11px] font-body font-bold px-3 py-1 rounded-full shadow-lg">
                        {activeCar.originTag}
                      </span>
                      {activeCar.firstOwner && (
                        <span className="bg-amber-500 text-white text-[11px] font-body font-bold px-3 py-1 rounded-full shadow-lg">
                          1ère Main
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info overlay */}
                  <div className="p-5 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent absolute bottom-0 left-0 right-0">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-display font-black text-white text-xl uppercase leading-tight">
                          {activeCar.make} {activeCar.model}
                        </h3>
                        <p className="text-stone-400 text-xs font-body mt-0.5">
                          {activeCar.year} · {new Intl.NumberFormat("en-US").format(activeCar.mileage)} km · {activeCar.fuelType}
                        </p>
                      </div>
                      <motion.span
                        key={activeCar.price}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-display font-black text-amber-400 text-2xl" dir="ltr"
                      >
                        {fmt$(activeCar.price)}
                      </motion.span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <a
                        href={getWhatsAppUrl(waMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl text-xs font-body font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle size={14} /> WhatsApp
                      </a>
                      <button
                        onClick={() => navigate({ name: "car", id: activeCar.id })}
                        className="flex-1 bg-white/15 hover:bg-white/25 backdrop-blur text-white py-2.5 rounded-xl text-xs font-body font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1 transition-colors"
                      >
                        {t(lang, "viewAll")} <ArrowRight size={12} className="rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Thumbnail strip */}
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {HERO_CARS.map((car, i) => (
                  <motion.button
                    key={car.id}
                    onClick={() => setActiveIdx(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      i === activeIdx
                        ? "border-amber-500 shadow-lg shadow-amber-500/30 ring-1 ring-amber-500/50"
                        : "border-white/15 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={car.image}
                      alt={car.make}
                      className="w-full h-full object-cover"
                    />
                    {i === activeIdx && (
                      <motion.div
                        layoutId="thumb-active"
                        className="absolute inset-0 border-2 border-amber-400 rounded-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Progress bar */}
              <div className="flex gap-1.5 mt-3">
                {HERO_CARS.map((_, i) => (
                  <div key={i} className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                    {i === activeIdx && (
                      <motion.div
                        className="h-full bg-amber-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "linear" }}
                        key={`progress-${activeIdx}-${i}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient bleed into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 to-transparent z-20" />
    </section>
  );
};
