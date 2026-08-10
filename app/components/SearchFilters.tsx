import React, { useState } from "react";
import { Filter, RefreshCw, Search } from "lucide-react";
import { FilterState, MAKES, Condition, FuelType, sanitize } from "../data";
import { Lang, t } from "../i18n";

interface SearchFiltersProps {
  filters: FilterState;
  onChange: (partial: Partial<FilterState>) => void;
  onReset: () => void;
  lang: Lang;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onChange,
  onReset,
  lang,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const inputCls =
    "w-full border border-stone-200 bg-stone-50/70 rounded-xl px-3.5 py-2 text-xs font-body text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:bg-white transition-all shadow-xs";

  const labelCls =
    "block font-body font-bold text-stone-700 text-xs tracking-wider uppercase mb-1.5";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ search: sanitize(e.target.value) });
  };

  const inner = (
    <div className="space-y-5">
      {/* Search Input */}
      <div>
        <label htmlFor="sf-search" className={labelCls}>
          {t(lang, "search")}
        </label>
        <div className="relative">
          <input
            id="sf-search"
            type="text"
            placeholder={t(lang, "searchPlaceholder")}
            value={filters.search}
            onChange={handleSearchChange}
            className={inputCls + " pl-9 rtl:pl-3 rtl:pr-9"}
          />
          <Search size={14} className="absolute left-3 rtl:left-auto rtl:right-3 top-2.5 text-stone-400" />
        </div>
      </div>

      {/* Make */}
      <div>
        <label htmlFor="sf-make" className={labelCls}>
          {t(lang, "make")}
        </label>
        <select
          id="sf-make"
          value={filters.make}
          onChange={(e) => onChange({ make: e.target.value })}
          className={inputCls}
        >
          <option value="">{t(lang, "allMakes")}</option>
          {MAKES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Year Range */}
      <div>
        <span className={labelCls}>{t(lang, "yearRange")}</span>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder={t(lang, "from")}
            value={filters.minYear}
            onChange={(e) => onChange({ minYear: sanitize(e.target.value) })}
            className={inputCls}
            min="2000"
            max="2025"
            dir="ltr"
            aria-label="Minimum year"
          />
          <input
            type="number"
            placeholder={t(lang, "to")}
            value={filters.maxYear}
            onChange={(e) => onChange({ maxYear: sanitize(e.target.value) })}
            className={inputCls}
            min="2000"
            max="2025"
            dir="ltr"
            aria-label="Maximum year"
          />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <span className={labelCls}>{t(lang, "priceRange")}</span>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder={t(lang, "minPrice")}
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: sanitize(e.target.value) })}
            className={inputCls}
            dir="ltr"
            aria-label="Minimum price"
          />
          <input
            type="number"
            placeholder={t(lang, "maxPrice")}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: sanitize(e.target.value) })}
            className={inputCls}
            dir="ltr"
            aria-label="Maximum price"
          />
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <label htmlFor="sf-fuel" className={labelCls}>
          {t(lang, "fuelType")}
        </label>
        <select
          id="sf-fuel"
          value={filters.fuelType}
          onChange={(e) => onChange({ fuelType: e.target.value })}
          className={inputCls}
        >
          <option value="">{t(lang, "allTypes")}</option>
          {(["Gasoline", "Diesel", "Electric", "Hybrid"] as FuelType[]).map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Condition */}
      <div>
        <label htmlFor="sf-condition" className={labelCls}>
          {t(lang, "condition")}
        </label>
        <select
          id="sf-condition"
          value={filters.condition}
          onChange={(e) => onChange({ condition: e.target.value })}
          className={inputCls}
        >
          <option value="">{t(lang, "allConditions")}</option>
          {(["New", "Used", "Certified Pre-Owned"] as Condition[]).map((c) => (
            <option key={c} value={c}>
              {c === "New" ? t(lang, "condNew") : c === "Used" ? t(lang, "condUsed") : t(lang, "condCpo")}
            </option>
          ))}
        </select>
      </div>

      {/* Transmission */}
      <div>
        <label htmlFor="sf-trans" className={labelCls}>
          {t(lang, "transmission")}
        </label>
        <select
          id="sf-trans"
          value={filters.transmission}
          onChange={(e) => onChange({ transmission: e.target.value })}
          className={inputCls}
        >
          <option value="">{t(lang, "allTransmissions")}</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 text-xs font-body font-bold tracking-wider uppercase text-stone-600 hover:text-amber-600 border border-stone-200 hover:border-amber-400 py-2.5 rounded-xl transition-all bg-white hover:bg-amber-50/50 shadow-xs"
      >
        <RefreshCw size={13} /> {t(lang, "clearFilters")}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="w-full flex items-center justify-between bg-white border border-stone-200 rounded-xl px-4 py-3 font-body font-bold text-xs tracking-wider uppercase text-stone-800 shadow-sm"
        >
          <span className="flex items-center gap-2">
            <Filter size={15} className="text-amber-600" />
            {t(lang, "filters")}
          </span>
          <span className="text-amber-600 text-sm">{mobileOpen ? "▲" : "▼"}</span>
        </button>
        {mobileOpen && (
          <div className="mt-3 bg-white border border-stone-200 rounded-2xl p-5 shadow-lg animate-fade-in-up">
            {inner}
          </div>
        )}
      </div>

      {/* Desktop filter sidebar */}
      <div className="hidden lg:block bg-white border border-stone-200/90 rounded-2xl p-6 sticky top-24 shadow-sm">
        <h2 className="font-display font-black text-stone-900 text-lg uppercase tracking-wider flex items-center gap-2.5 mb-6 pb-4 border-b border-stone-100">
          <Filter size={18} className="text-amber-600" /> {t(lang, "filterResults")}
        </h2>
        {inner}
      </div>
    </>
  );
};
