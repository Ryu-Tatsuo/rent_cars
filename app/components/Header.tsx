import React, { useState } from "react";
import { Menu, X, Globe, ChevronDown, MessageCircle, Phone } from "lucide-react";
import { Lang, t } from "../i18n";
import { Page, WA_PHONE_NUMBER, getWhatsAppUrl } from "../data";

interface HeaderProps {
  current: Page["name"];
  navigate: (p: Page) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}

export const Header: React.FC<HeaderProps> = ({ current, navigate, lang, setLang }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navLinks: { labelKey: "home" | "inventory" | "about" | "contact"; page: Page["name"] }[] = [
    { labelKey: "home", page: "home" },
    { labelKey: "inventory", page: "inventory" },
    { labelKey: "about", page: "about" },
    { labelKey: "contact", page: "contact" },
  ];

  const languages: { code: Lang; name: string; flag: string }[] = [
    { code: "ar", name: "العربية (المغرب)", flag: "🇲🇦" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  const waHeaderUrl = getWhatsAppUrl(
    lang === "ar"
      ? "السلام عليكم Apex Auto، أرغب في الاستفسار عن سيارة."
      : "Bonjour Apex Auto, je souhaite me renseigner sur un véhicule."
  );

  return (
    <header className="bg-white/95 backdrop-blur-md text-stone-800 sticky top-0 z-50 border-b border-stone-200/80 shadow-xs transition-colors duration-300">
      {/* Top Banner specific to Morocco */}
      <div className="bg-stone-900 text-stone-300 py-1.5 px-4 text-xs font-body border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-white">{t(lang, "agencyCity")}</span>
            <span className="hidden sm:inline text-stone-500">|</span>
            <span className="hidden sm:inline text-stone-400">{t(lang, "hiddenFees")}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:+212661000000"
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
              dir="ltr"
            >
              <Phone size={12} className="text-amber-500" />
              <span>06 61 00 00 00</span>
            </a>
            <a
              href={waHeaderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold flex items-center gap-1"
            >
              <MessageCircle size={12} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => {
              navigate({ name: "home" });
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 group text-left rtl:text-right focus:outline-none"
            aria-label="Apex Auto Home"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform duration-300">
              <span className="font-display font-black text-white text-xl leading-none">A</span>
            </div>
            <div>
              <span className="font-display font-black tracking-wider text-xl uppercase text-stone-900 block leading-tight">
                Apex<span className="text-amber-600"> Auto</span>
              </span>
              <span className="text-[10px] tracking-widest text-stone-600 uppercase font-semibold block">
                {t(lang, "agencyName")}
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((l) => (
              <button
                key={l.page}
                onClick={() => navigate({ name: l.page } as Page)}
                className={`font-body font-semibold text-sm tracking-wide transition-all duration-200 relative py-1 ${
                  current === l.page
                    ? "text-amber-600 font-bold"
                    : "text-stone-700 hover:text-amber-600"
                }`}
              >
                {t(lang, l.labelKey)}
                {current === l.page && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full animate-fade-in" />
                )}
              </button>
            ))}

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-200 hover:border-amber-500/50 bg-stone-50 hover:bg-amber-50/50 text-stone-800 text-xs font-semibold transition-all shadow-xs"
                aria-label="Change language"
              >
                <Globe size={14} className="text-amber-600" />
                <span className="uppercase">{lang}</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${langMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-44 bg-white border border-stone-200 rounded-xl shadow-xl py-1 z-50 animate-fade-in-up">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left rtl:text-right px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-amber-50 hover:text-amber-700 transition-colors ${
                        lang === item.code ? "bg-amber-50/80 text-amber-600 font-bold" : "text-stone-700"
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="text-sm">{item.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={waHeaderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-body font-bold text-xs tracking-wider uppercase shadow-md shadow-emerald-600/20 transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>

            {/* CTA Button */}
            <button
              onClick={() => navigate({ name: "inventory" })}
              className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-lg font-body font-bold text-xs tracking-wider uppercase transition-all duration-300 active:scale-95"
            >
              {t(lang, "browseCars")}
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={waHeaderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white p-2 rounded-lg text-xs font-bold flex items-center gap-1"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>

            <button
              onClick={() => {
                const nextLang: Lang = lang === "ar" ? "fr" : lang === "fr" ? "en" : "ar";
                setLang(nextLang);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-xs font-bold uppercase text-stone-700 flex items-center gap-1"
            >
              <Globe size={13} className="text-amber-600" />
              {lang}
            </button>

            <button
              className="text-stone-700 hover:text-amber-600 p-2 rounded-lg hover:bg-stone-100 transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-lg border-t border-stone-200 animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((l) => (
              <button
                key={l.page}
                onClick={() => {
                  navigate({ name: l.page } as Page);
                  setMobileOpen(false);
                }}
                className={`block w-full text-left rtl:text-right px-4 py-3 rounded-lg font-body font-semibold text-sm transition-colors ${
                  current === l.page
                    ? "text-amber-600 bg-amber-50/70 font-bold"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
              >
                {t(lang, l.labelKey)}
              </button>
            ))}

            <div className="pt-3 pb-1 border-t border-stone-100 flex flex-col gap-2">
              <a
                href={waHeaderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-body font-bold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <MessageCircle size={16} />
                <span>{t(lang, "whatsappUs")}</span>
              </a>

              <button
                onClick={() => {
                  navigate({ name: "inventory" });
                  setMobileOpen(false);
                }}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-body font-bold text-xs tracking-wider uppercase transition-all text-center"
              >
                {t(lang, "browseCars")}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
