import { local } from 'wix-storage';

const translations = {
  fr: {
    title: "Des Solutions IT pour les Entreprises",
    subtitle: "Nex-Gen connecte les entreprises aux meilleures solutions technologiques mondiales",
    cta: "Commencer maintenant",
  },
  en: {
    title: "IT Solutions for Businesses",
    subtitle: "Nex-Gen connects companies to the best global technology solutions",
    cta: "Get Started",
  }
};

$w.onReady(function () {
    let lang = local.getItem("nexgen_lang") || "fr";
    applyLanguage(lang);

    // Écouter le changement de langue toutes les 500ms
    setInterval(() => {
        const currentLang = local.getItem("nexgen_lang") || "fr";
        if (currentLang !== lang) {
            lang = currentLang;
            applyLanguage(lang);
        }
    }, 500);
});

function applyLanguage(lang) {
    const t = translations[lang];
    $w("#heroTitle").text    = t.title;
    $w("#heroSubtitle").text = t.subtitle;
    $w("#heroCTA").label     = t.cta;
}