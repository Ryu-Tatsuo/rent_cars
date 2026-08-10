import React, { useState, useEffect, useCallback } from "react";
import { Page } from "./data";
import { Lang } from "./i18n";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import {
  HomePage,
  InventoryPage,
  CarDetailPage,
  AboutPage,
  ContactPage,
} from "./components/Pages";

export default function App() {
  const [page, setPage] = useState<Page>({ name: "home" });
  const [lang, setLang] = useState<Lang>("ar"); // Default language for Moroccan dealership: Arabic

  // Sync RTL and lang attribute on document element when language changes
  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [lang]);

  const navigate = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-body bg-stone-50 text-stone-900 selection:bg-amber-500/20 selection:text-amber-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-amber-600 text-white px-4 py-2 z-[100] text-xs font-bold rounded-lg shadow-lg"
      >
        تخطي إلى المحتوى
      </a>

      <Header current={page.name} navigate={navigate} lang={lang} setLang={setLang} />

      <main id="main-content" className="flex-1">
        {page.name === "home" && <HomePage navigate={navigate} lang={lang} />}
        {page.name === "inventory" && <InventoryPage navigate={navigate} lang={lang} />}
        {page.name === "car" && <CarDetailPage id={page.id} navigate={navigate} lang={lang} />}
        {page.name === "about" && <AboutPage navigate={navigate} lang={lang} />}
        {page.name === "contact" && (
          <ContactPage initialSubject={page.subject} navigate={navigate} lang={lang} />
        )}
      </main>

      {/* Floating WhatsApp Widget */}
      <WhatsAppButton lang={lang} />

      <Footer navigate={navigate} lang={lang} />
    </div>
  );
}
