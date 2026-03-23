import { local } from 'wix-storage';
import wixData from 'wix-data';

const translations = {
    fr: {
        send: "Envoyer la demande",
        success: "Votre demande a été envoyée avec succès !",
        error: "Veuillez remplir tous les champs obligatoires.",
    },
    en: {
        send: "Send Request",
        success: "Your request has been sent successfully!",
        error: "Please fill in all required fields.",
    }
};

$w.onReady(function () {
    let lang = local.getItem("nexgen_lang") || "fr";
    applyLanguage(lang);

    setInterval(() => {
        const currentLang = local.getItem("nexgen_lang") || "fr";
        if (currentLang !== lang) {
            lang = currentLang;
            applyLanguage(lang);
        }
    }, 500);

    $w("#btnSend").onClick(() => {
        const t         = translations[lang];
        const firstName = $w("#inputFirstName").value;
        const lastName  = $w("#inputLastName").value;
        const email     = $w("#inputEmail").value;
        const company   = $w("#inputCompany").value;
        const phone     = $w("#inputPhone").value;
        const jobTitle  = $w("#inputJobTitle").value;

        if (!firstName || !email || !company) {
            $w("#msgStatus").text = t.error;
            $w("#msgStatus").show();
            return;
        }

        $w("#btnSend").disable();

        wixData.insert("QuoteRequests", {
            companyName:     company,
            email:           email,
            phone:           phone,
            requestedSoluti: jobTitle,
            message:         `${firstName} ${lastName} - ${jobTitle}`,
            requestStatus:   "En attente",
            requestDate:     new Date()
        })
        .then(() => {
            $w("#msgStatus").text = t.success;
            $w("#msgStatus").show();
            $w("#btnSend").enable();
            $w("#inputFirstName").value = "";
            $w("#inputLastName").value  = "";
            $w("#inputEmail").value     = "";
            $w("#inputCompany").value   = "";
            $w("#inputPhone").value     = "";
            $w("#inputJobTitle").value  = "";
        })
        .catch((err) => {
            console.log(err);
            $w("#btnSend").enable();
        });
    });
});

function applyLanguage(lang) {
    const t = translations[lang];
    $w("#btnSend").label = t.send;
}