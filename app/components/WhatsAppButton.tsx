import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppUrl } from "../data";
import { Lang, t } from "../i18n";

interface WhatsAppButtonProps {
  lang: Lang;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ lang }) => {
  const [openTooltip, setOpenTooltip] = useState(true);

  const defaultMsg =
    lang === "ar"
      ? "السلام عليكم Apex Auto، أرغب في الاستفسار عن سيارة أورغب في زيارة معرضكم بالدار البيضاء."
      : lang === "fr"
      ? "Bonjour Apex Auto, je souhaite me renseigner sur un véhicule et prendre rendez-vous au showroom de Casablanca."
      : "Hello Apex Auto, I would like to inquire about a vehicle at your Casablanca showroom.";

  const waUrl = getWhatsAppUrl(defaultMsg);

  return (
    <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 flex flex-col items-end rtl:items-start group">
      {/* Tooltip Popup */}
      {openTooltip && (
        <div className="mb-3 max-w-xs bg-white text-stone-800 p-4 rounded-2xl shadow-2xl border border-stone-200 animate-fade-in-up relative text-xs font-body">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenTooltip(false);
            }}
            className="absolute top-2 right-2 rtl:right-auto rtl:left-2 text-stone-400 hover:text-stone-700 p-1"
            aria-label="Close tooltip"
          >
            <X size={13} />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Apex Auto Casablanca
            </span>
          </div>
          <p className="text-stone-600 leading-relaxed mb-3">
            {t(lang, "whatsappGreeting")}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-600/20"
          >
            <MessageCircle size={14} />
            <span>{t(lang, "whatsappBtnText")}</span>
          </a>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative group"
      >
        <MessageCircle size={28} className="fill-white/10" />
        <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-ping" />
      </a>
    </div>
  );
};
