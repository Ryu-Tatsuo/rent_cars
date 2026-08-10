import React from "react";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { Lang, t } from "../i18n";
import { Page } from "../data";

interface FooterProps {
  navigate: (p: Page) => void;
  lang: Lang;
}

export const Footer: React.FC<FooterProps> = ({ navigate, lang }) => {
  const navLinks: { labelKey: "home" | "inventory" | "about" | "contact"; page: Page["name"] }[] = [
    { labelKey: "home", page: "home" },
    { labelKey: "inventory", page: "inventory" },
    { labelKey: "about", page: "about" },
    { labelKey: "contact", page: "contact" },
  ];

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="font-display font-black text-white text-base">A</span>
              </div>
              <span className="font-display font-black tracking-wider text-xl uppercase text-white">
                Apex<span className="text-amber-500"> Motors</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone-400 max-w-sm">
              {t(lang, "taglineFooter")}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-md w-fit border border-amber-500/20">
              <ShieldCheck size={16} />
              <span>{t(lang, "cert150")}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-body font-bold text-white text-xs tracking-widest uppercase mb-5 border-b border-stone-800 pb-2 w-fit">
              {t(lang, "quickLinks")}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => navigate({ name: l.page } as Page)}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-amber-500 text-xs">›</span>
                    {t(lang, l.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-body font-bold text-white text-xs tracking-widest uppercase mb-5 border-b border-stone-800 pb-2 w-fit">
              {t(lang, "contactHours")}
            </h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-amber-500" />
                <span>{t(lang, "address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0 text-amber-500" />
                <span dir="ltr">(720) 555-0184</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0 text-amber-500" />
                <span>sales@apexmotors.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="flex-shrink-0 text-amber-500" />
                <span>{t(lang, "monFriHours")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <span>{t(lang, "copyright")}</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t(lang, "denver")}
          </span>
        </div>
      </div>
    </footer>
  );
};
