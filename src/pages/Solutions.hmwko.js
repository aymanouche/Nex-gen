import { local } from 'wix-storage';
import wixData from 'wix-data';

$w.onReady(function () {
    let lang = local.getItem("nexgen_lang") || "fr";
    loadSolutions(lang);

    setInterval(() => {
        const currentLang = local.getItem("nexgen_lang") || "fr";
        if (currentLang !== lang) {
            lang = currentLang;
            loadSolutions(lang);
        }
    }, 500);
});

function loadSolutions(lang) {
    wixData.query("ItSolutions")
        .ascending("numeroOrdre")
        .find()
        .then((results) => {
            $w("#solutionsRepeater").data = results.items;
            $w("#solutionsRepeater").onItemReady(($item, itemData) => {
                $item("#solutionImage").src  = itemData.imageIcone;
                $item("#solutionTitle").text = lang === "fr"
                    ? itemData.titreFrancais
                    : itemData.titreAnglais;
                $item("#solutionDesc").text  = lang === "fr"
                    ? itemData.descriptionFrancais
                    : itemData.descripti;
            });
        })
        .catch((err) => console.log(err));
}git add .
git commit -m "feat: page Solutions connectée à la BD avec FR/EN"
git push