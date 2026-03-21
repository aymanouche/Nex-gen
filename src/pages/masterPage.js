import { local } from 'wix-storage';
import { session } from 'wix-storage';

$w.onReady(function () {
    let lang = local.getItem("nexgen_lang") || "fr";
    updateButton(lang);

    $w("#langSwitch").onClick(() => {
        lang = lang === "fr" ? "en" : "fr";
        local.setItem("nexgen_lang", lang);
        updateButton(lang);
    });
});

function updateButton(lang) {
    $w("#langSwitch").label = lang === "fr" ? "FR | EN >" : "EN | FR >";
}