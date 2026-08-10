import React, { useState, useMemo, useCallback } from "react";
import {
  Shield, Award, Zap, ChevronRight, Check, ArrowRight,
  MapPin, Phone, Mail, Clock, Filter, RefreshCw, MessageCircle
} from "lucide-react";
import {
  Car, CARS, FilterState, EMPTY_FILTERS, filterCars, Page, fmt$, fmtMi,
  sanitize, sanitizeName, sanitizeEmail, sanitizePhone, validateEmail,
  getWhatsAppUrl, DEALER_PHONE_DISPLAY
} from "../data";
import { Lang, t } from "../i18n";
import { HeroSection } from "./HeroSection";
import { CarCard } from "./CarCard";
import { SearchFilters } from "./SearchFilters";
import { Reveal, StaggerContainer, StaggerChild, CountUp } from "./Animations";
import { motion } from "framer-motion";

interface PageProps {
  navigate: (p: Page) => void;
  lang: Lang;
}

// ── HomePage ───────────────────────────────────────────────────────────────────
export const HomePage: React.FC<PageProps> = ({ navigate, lang }) => {
  const featured = useMemo(() => CARS.slice(0, 6), []);

  const waCalloutUrl = getWhatsAppUrl(
    lang === "ar"
      ? "السلام عليكم Apex Auto، أرغب في حجز سيارة أو ترتيب زيارة لمعرضكم بالدار البيضاء."
      : "Bonjour Apex Auto Casablanca, je souhaiterais réserver un essai ou visiter votre showroom."
  );

  return (
    <div className="bg-stone-50 min-h-screen">
      <HeroSection navigate={navigate} lang={lang} />

      {/* Why Choose Us — Moroccan Trust Hooks */}
      <section className="bg-white py-20 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" className="text-center mb-16">
            <span className="font-body font-bold text-amber-600 text-xs tracking-widest uppercase block mb-3">
              {t(lang, "ourPromise")}
            </span>
            <h2 className="font-display font-black text-stone-900 text-4xl sm:text-5xl uppercase tracking-tight">
              {t(lang, "whyChoose")}
            </h2>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {[
              {
                Icon: Shield,
                titleKey: "cert150" as const,
                descKey: "cert150Desc" as const,
              },
              {
                Icon: Award,
                titleKey: "financing" as const,
                descKey: "financingDesc" as const,
              },
              {
                Icon: Zap,
                titleKey: "tradeIn" as const,
                descKey: "tradeInDesc" as const,
              },
            ].map(({ Icon, titleKey, descKey }) => (
              <StaggerChild key={titleKey}>
              <div
                className="bg-stone-50/80 border border-stone-200/80 rounded-2xl p-8 hover:border-amber-500/50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white text-amber-700 transition-colors duration-300 shadow-xs">
                  <Icon size={24} />
                </div>
                <h3 className="font-display font-black text-stone-900 text-xl uppercase mb-3">
                  {t(lang, titleKey)}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-body">
                  {t(lang, descKey)}
                </p>
              </div>
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Vehicles Grid */}
      <section className="bg-stone-100/60 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <Reveal direction="up">
              <span className="font-body font-bold text-amber-600 text-xs tracking-widest uppercase block mb-2">
                {t(lang, "handPicked")}
              </span>
              <h2 className="font-display font-black text-stone-900 text-4xl uppercase tracking-tight">
                {t(lang, "featuredVehicles")}
              </h2>
            </Reveal>
            <button
              onClick={() => navigate({ name: "inventory" })}
              className="flex items-center gap-2 font-body font-bold text-xs tracking-wider uppercase text-stone-800 hover:text-amber-600 transition-colors group border border-stone-300 rounded-xl px-4 py-2 bg-white shadow-xs"
            >
              <span>{t(lang, "viewAll")}</span>
              <ChevronRight size={16} className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.12}>
            {featured.map((car, i) => (
              <StaggerChild key={car.id}>
                <CarCard car={car} navigate={navigate} lang={lang} eager={i < 3} />
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Strip with WhatsApp */}
      <section className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl uppercase leading-tight mb-4">
                {t(lang, "readyToFind")}
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-body">
                {t(lang, "visitShowroom")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <a
                href={waCalloutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-body font-bold text-xs tracking-wider uppercase transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                <span>{t(lang, "whatsappUs")}</span>
              </a>

              <button
                onClick={() => navigate({ name: "contact" })}
                className="border border-stone-600 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-body font-bold text-xs tracking-wider uppercase transition-colors"
              >
                {t(lang, "contactUs")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Moroccan Stats Section */}
      <section className="bg-stone-50 py-16 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" staggerDelay={0.1}>
            {[
              { num: 150, suffix: "+", labelKey: "vehiclesInStock" as const },
              { num: 4800, suffix: "+", labelKey: "happyCustomers" as const },
              { num: 4.9, suffix: "★", labelKey: "googleRating" as const },
              { num: 14, suffix: "", labelKey: "yearsInBiz" as const },
            ].map((s) => (
              <StaggerChild key={s.labelKey}>
                <div className="p-5 rounded-2xl bg-white border border-stone-200/60 shadow-xs">
                  <div className="font-display font-black text-amber-600 text-4xl lg:text-5xl mb-1">
                    <CountUp target={s.num} suffix={s.suffix} />
                  </div>
                  <div className="font-body font-bold text-stone-600 text-xs tracking-wider uppercase">
                    {t(lang, s.labelKey)}
                  </div>
                </div>
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
};

// ── InventoryPage ──────────────────────────────────────────────────────────────
export const InventoryPage: React.FC<PageProps> = ({ navigate, lang }) => {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const updateFilters = useCallback((partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  }, []);

  const results = useMemo(() => filterCars(CARS, filters), [filters]);
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="bg-stone-100/60 min-h-screen">
      {/* Header banner */}
      <div className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-body font-bold text-amber-600 text-xs tracking-wider uppercase block mb-2" dir="ltr">
            {results.length} {t(lang, "of")} {CARS.length} {t(lang, "vehicles")}
          </span>
          <h1 className="font-display font-black text-stone-900 text-4xl sm:text-5xl uppercase tracking-tight">
            {t(lang, "vehicleInventory")}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Filters Sidebar */}
          <SearchFilters
            filters={filters}
            onChange={updateFilters}
            onReset={() => setFilters(EMPTY_FILTERS)}
            lang={lang}
          />

          {/* Results Grid */}
          <div>
            {results.length === 0 ? (
              <div className="text-center py-20 bg-white border border-stone-200 rounded-2xl shadow-xs px-4">
                <Filter size={48} className="mx-auto text-stone-300 mb-4" />
                <h2 className="font-display font-black text-stone-800 text-2xl uppercase mb-2">
                  {t(lang, "noResults")}
                </h2>
                <p className="text-stone-500 text-sm mb-6 font-body max-w-md mx-auto">
                  {t(lang, "noResultsDesc")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={getWhatsAppUrl("Bonjour Apex Auto, je recherche un véhicule spécifique au Maroc.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-body font-bold text-xs tracking-wider uppercase transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Sourcing</span>
                  </a>

                  <button
                    onClick={() => setFilters(EMPTY_FILTERS)}
                    className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-3 rounded-xl font-body font-bold text-xs tracking-wider uppercase transition-colors"
                  >
                    {t(lang, "resetFilters")}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {hasFilters && (
                  <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                    <p className="text-xs text-stone-600 font-body">
                      {t(lang, "showing")} <span className="font-bold text-stone-900" dir="ltr">{results.length}</span> {t(lang, results.length === 1 ? "vehicle" : "vehicles")}
                    </p>
                    <button
                      onClick={() => setFilters(EMPTY_FILTERS)}
                      className="text-xs font-body font-bold tracking-wider uppercase text-stone-500 hover:text-amber-600 flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw size={12} /> {t(lang, "clearAll")}
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {results.map((car, i) => (
                    <CarCard key={car.id} car={car} navigate={navigate} lang={lang} eager={i < 3} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── CarDetailPage ──────────────────────────────────────────────────────────────
export const CarDetailPage: React.FC<PageProps & { id: string }> = ({ id, navigate, lang }) => {
  const car = useMemo(() => CARS.find((c) => c.id === id), [id]);

  if (!car) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl border border-stone-200 shadow-md max-w-md w-full">
          <h2 className="font-display font-black text-stone-900 text-3xl uppercase mb-3">
            {t(lang, "vehicleNotFound")}
          </h2>
          <p className="text-stone-500 mb-6 font-body text-sm">
            {t(lang, "vehicleNotFoundDesc")}
          </p>
          <button
            onClick={() => navigate({ name: "inventory" })}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-body font-bold text-xs tracking-wider uppercase transition-colors"
          >
            {t(lang, "backToInventory")}
          </button>
        </div>
      </div>
    );
  }

  const specs = [
    [t(lang, "year"), car.year],
    [t(lang, "mileage"), fmtMi(car.mileage)],
    [t(lang, "fuelType"), car.fuelType],
    [t(lang, "transmission"), car.transmission],
    [t(lang, "color"), car.color],
    [t(lang, "originLabel"), car.originTag],
    ["Vignette 2026", car.vignettePaid ? "Payée / Exonéré" : "À payer"],
    ["Main", car.firstOwner ? "1ère Main (WW)" : "Occasion certifiée"],
  ] as const;

  const waCarUrl = getWhatsAppUrl(
    lang === "ar"
      ? `السلام عليكم Apex Auto، أرغب في الاستفسار وحجز موعد لمعاينة سيارة ${car.year} ${car.make} ${car.model} (الثمن: ${fmt$(car.price)}).`
      : `Bonjour Apex Auto, je souhaite réserver un essai pour la ${car.year} ${car.make} ${car.model} à ${fmt$(car.price)}.`
  );

  return (
    <div className="bg-stone-100/60 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-body text-stone-500">
            <button onClick={() => navigate({ name: "home" })} className="hover:text-amber-600 transition-colors">
              {t(lang, "home")}
            </button>
            <ChevronRight size={12} className="rtl:rotate-180" />
            <button onClick={() => navigate({ name: "inventory" })} className="hover:text-amber-600 transition-colors">
              {t(lang, "inventory")}
            </button>
            <ChevronRight size={12} className="rtl:rotate-180" />
            <span className="text-stone-900 font-semibold">
              {car.year} {car.make} {car.model}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          {/* Main info */}
          <div>
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-stone-200 mb-8 border border-stone-200/80 shadow-md">
              <img
                src={car.image}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                <span className="font-body font-bold text-xs px-4 py-1.5 rounded-full bg-emerald-600 text-white shadow-md">
                  {car.originTag}
                </span>
                {car.vignettePaid && (
                  <span className="font-body font-bold text-xs px-3 py-1.5 rounded-full bg-stone-900 text-amber-400 border border-stone-700 shadow-md">
                    Vignette 2026 Payée
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8 mb-6 shadow-xs">
              <h2 className="font-display font-black text-stone-900 text-2xl uppercase mb-4">
                {t(lang, "aboutThisVehicle")}
              </h2>
              <p className="text-stone-600 leading-relaxed font-body text-base">
                {car.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
              <h2 className="font-display font-black text-stone-900 text-2xl uppercase mb-6">
                {t(lang, "keyFeatures")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {car.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-stone-700 font-body">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                      <Check size={12} />
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA & Specs */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
              <h1 className="font-display font-black text-stone-900 text-3xl uppercase leading-tight mb-2">
                {car.year} {car.make} {car.model}
              </h1>

              {/* Price display in Dirhams */}
              <div className="font-display font-black text-amber-600 text-4xl my-6 bg-amber-50 p-4 rounded-xl border border-amber-200/60 text-center" dir="ltr">
                {fmt$(car.price)}
              </div>

              <div className="space-y-3.5 border-t border-stone-100 pt-6">
                {specs.map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center text-sm font-body">
                    <span className="text-stone-500 font-bold text-xs uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="font-semibold text-stone-900" dir="ltr">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <a
              href={waCarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-body font-bold text-sm tracking-wider uppercase shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle size={18} />
              <span>{t(lang, "inquireCar")}</span>
            </a>

            <button
              onClick={() => navigate({ name: "contact", subject: `Financement / Reprise - ${car.make} ${car.model}` })}
              className="w-full border-2 border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white py-4 rounded-xl font-body font-bold text-sm tracking-wider uppercase transition-colors"
            >
              {t(lang, "applyFinancing")}
            </button>

            {/* Direct Contact Hotline Card */}
            <div className="bg-stone-900 rounded-2xl p-6 text-stone-300">
              <h3 className="font-body font-bold text-white text-xs tracking-wider uppercase mb-4">
                {t(lang, "speakSpecialist")}
              </h3>
              <div className="space-y-3 text-xs font-body">
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-amber-500" />
                  <a href="tel:+212661000000" className="hover:text-white transition-colors" dir="ltr">
                    {DEALER_PHONE_DISPLAY}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-amber-500" />
                  <span>contact@apexauto.ma</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={15} className="text-amber-500" />
                  <span>Casablanca, Maroc</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── AboutPage ──────────────────────────────────────────────────────────────────
export const AboutPage: React.FC<PageProps> = ({ navigate, lang }) => {
  const team = [
    {
      name: "Mehdi Benjelloun",
      role: "Directeur Général",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
    },
    {
      name: "Khadija El Mansouri",
      role: "Responsable Ventes & Reprise",
      img: "https://images.unsplash.com/photo-1494790108755-2616b612b2fd?w=300&h=300&fit=crop&auto=format",
    },
    {
      name: "Karim Tazi",
      role: "Expert Financement & Crédit",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
    },
    {
      name: "Sanaa Bennani",
      role: "Service Carte Grise & Administratif",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format",
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-stone-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="font-body font-bold text-amber-500 text-xs tracking-widest uppercase block mb-3">
            {t(lang, "ourStory")}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            {t(lang, "aboutApex")}
          </h1>
          <p className="text-stone-400 mt-4 max-w-xl mx-auto font-body text-base">
            {t(lang, "since2008")}
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-6 font-body text-stone-600 leading-relaxed">
              <span className="font-bold text-amber-600 text-xs tracking-widest uppercase block">
                {t(lang, "founded")}
              </span>
              <h2 className="font-display font-black text-stone-900 text-4xl uppercase tracking-tight">
                {t(lang, "builtOn")}
              </h2>
              <p>{t(lang, "missionP1")}</p>
              <p>{t(lang, "missionP2")}</p>
              <p>{t(lang, "missionP3")}</p>

              <button
                onClick={() => navigate({ name: "inventory" })}
                className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3.5 rounded-xl font-body font-bold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <span>{t(lang, "browseOurInventory")}</span>
                <ArrowRight size={16} className="rtl:rotate-180" />
              </button>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200 aspect-[4/3] bg-stone-200">
              <img
                src="https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop&auto=format"
                alt="Apex Auto Casablanca Showroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 bg-amber-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="font-display font-black text-4xl leading-none" dir="ltr">14</div>
                <div className="font-body font-bold text-xs tracking-wider uppercase mt-1 opacity-90">{t(lang, "yearsStrong")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-stone-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-body font-bold text-amber-600 text-xs tracking-widest uppercase block mb-3">
              {t(lang, "peopleBehind")}
            </span>
            <h2 className="font-display font-black text-stone-900 text-4xl uppercase">
              {t(lang, "meetTheTeam")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="aspect-square bg-stone-200">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-black text-stone-900 text-xl">{member.name}</h3>
                  <p className="font-body font-bold text-amber-600 text-xs tracking-wider uppercase mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casablanca Location Map Embed */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-stone-900 text-4xl uppercase mb-2">
              {t(lang, "findUs")}
            </h2>
            <p className="text-stone-500 font-body text-sm">{t(lang, "address")}</p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg border border-stone-200 h-96 bg-stone-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d-7.632!3d33.573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM0JzIyLjgiTiA3wrAzNyc1NS4yIlc!5e0!3m2!1sen!2sma!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Apex Auto Casablanca location map"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// ── ContactPage ────────────────────────────────────────────────────────────────
export const ContactPage: React.FC<PageProps & { initialSubject?: string }> = ({ initialSubject, lang }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: initialSubject ?? "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const raw = e.target.value;
    let clean = raw;
    if (key === "name") clean = sanitizeName(raw);
    else if (key === "email") clean = sanitizeEmail(raw);
    else if (key === "phone") clean = sanitizePhone(raw);
    else clean = sanitize(raw);

    setForm((prev) => ({ ...prev, [key]: clean }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErr: Record<string, string> = {};

    if (!form.name.trim()) newErr.name = "Le nom est obligatoire.";
    if (!form.email.trim()) newErr.email = "L'adresse email est obligatoire.";
    else if (!validateEmail(form.email)) newErr.email = "Format d'email invalide.";
    if (!form.message.trim()) newErr.message = "Le message est obligatoire.";

    if (Object.keys(newErr).length > 0) {
      setErrors(newErr);
      return;
    }

    setSubmitted(true);
  };

  const inputCls =
    "w-full border border-stone-200 bg-stone-50/70 rounded-xl px-4 py-3 text-sm font-body text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:bg-white transition-all shadow-xs";
  const labelCls =
    "block font-body font-bold text-stone-700 text-xs tracking-wider uppercase mb-1.5";

  const waDirectUrl = getWhatsAppUrl(
    `Bonjour Apex Auto, je suis ${form.name || "un client"} et je souhaite vous contacter au sujet de: ${form.subject || "Demande d'informations"}.`
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white border border-stone-200 p-12 rounded-3xl text-center shadow-lg max-w-md w-full animate-fade-in-up">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} />
          </div>
          <h2 className="font-display font-black text-stone-900 text-3xl uppercase mb-3">
            {t(lang, "messageSent")}
          </h2>
          <p className="text-stone-600 font-body text-sm leading-relaxed mb-6">
            {t(lang, "thankYou", { name: form.name })} <span className="font-semibold text-stone-900">{form.email}</span>.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", email: "", phone: "", subject: "", message: "" });
            }}
            className="font-body font-bold text-xs tracking-wider uppercase text-amber-600 hover:text-amber-700 transition-colors"
          >
            {t(lang, "sendAnother")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-100/60 min-h-screen">
      <div className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-body font-bold text-amber-500 text-xs tracking-widest uppercase block mb-3">
            {t(lang, "hereToHelp")}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl uppercase">
            {t(lang, "contactTitle")}
          </h1>
          <p className="text-stone-400 mt-2 font-body text-sm">
            {t(lang, "respondTime")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          {/* Form */}
          <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="font-display font-black text-stone-900 text-2xl uppercase">
                {t(lang, "sendMessage")}
              </h2>

              <a
                href={waDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 px-4 py-2 rounded-xl text-xs font-bold font-body flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle size={15} className="text-emerald-600" />
                <span>{t(lang, "whatsappUs")}</span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="c-name" className={labelCls}>{t(lang, "fullName")} *</label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    placeholder={t(lang, "namePlaceholder")}
                    value={form.name}
                    onChange={handleChange("name")}
                    className={inputCls + (errors.name ? " border-rose-500" : "")}
                  />
                  {errors.name && <p className="text-xs text-rose-600 mt-1 font-body">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="c-email" className={labelCls}>{t(lang, "emailAddress")} *</label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    placeholder={t(lang, "emailPlaceholder")}
                    value={form.email}
                    onChange={handleChange("email")}
                    className={inputCls + (errors.email ? " border-rose-500" : "")}
                    dir="ltr"
                  />
                  {errors.email && <p className="text-xs text-rose-600 mt-1 font-body">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="c-phone" className={labelCls}>{t(lang, "phoneNumber")}</label>
                  <input
                    id="c-phone"
                    type="tel"
                    placeholder={t(lang, "phonePlaceholder")}
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className={inputCls}
                    dir="ltr"
                  />
                </div>

                <div>
                  <label htmlFor="c-subject" className={labelCls}>{t(lang, "subject")}</label>
                  <input
                    id="c-subject"
                    type="text"
                    placeholder={t(lang, "subjectPlaceholder")}
                    value={form.subject}
                    onChange={handleChange("subject")}
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="c-msg" className={labelCls}>{t(lang, "message")} *</label>
                <textarea
                  id="c-msg"
                  required
                  rows={5}
                  placeholder={t(lang, "messagePlaceholder")}
                  value={form.message}
                  onChange={handleChange("message")}
                  className={inputCls + " resize-none" + (errors.message ? " border-rose-500" : "")}
                />
                {errors.message && <p className="text-xs text-rose-600 mt-1 font-body">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 rounded-xl font-body font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <span>{t(lang, "sendBtn")}</span>
                <ArrowRight size={16} className="rtl:rotate-180" />
              </button>

              <p className="text-xs text-stone-400 text-center font-body">
                {t(lang, "required")}
              </p>
            </form>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
              <h3 className="font-display font-black text-stone-900 text-sm uppercase tracking-wider mb-6 pb-3 border-b border-stone-100">
                {t(lang, "visitShowroomCard")}
              </h3>
              <div className="space-y-4 text-sm text-stone-600 font-body">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{t(lang, "address")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-amber-600 flex-shrink-0" />
                  <a href="tel:+212661000000" className="hover:text-amber-600 transition-colors" dir="ltr">
                    {DEALER_PHONE_DISPLAY}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-amber-600 flex-shrink-0" />
                  <a href="mailto:contact@apexauto.ma" className="hover:text-amber-600 transition-colors">
                    contact@apexauto.ma
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
              <h3 className="font-display font-black text-stone-900 text-sm uppercase tracking-wider mb-6 pb-3 border-b border-stone-100 flex items-center gap-2">
                <Clock size={16} className="text-amber-600" /> {t(lang, "businessHours")}
              </h3>
              <div className="space-y-3 text-xs font-body">
                <div className="flex justify-between">
                  <span className="text-stone-500">{t(lang, "monFri")}</span>
                  <span className="font-semibold text-stone-900">{t(lang, "hours1")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{t(lang, "saturday")}</span>
                  <span className="font-semibold text-stone-900">{t(lang, "hours2")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{t(lang, "sunday")}</span>
                  <span className="font-semibold text-stone-900">{t(lang, "hours3")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
