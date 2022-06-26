import {FeatureDefinition} from "./Types";

export class FormSelectionGeneratorService {
    addInputHtmlToCharacteristics(feature: FeatureDefinition): void {
        const aInputElement = `<input id="${feature.featureName}-${feature.characteristics[0].name}" type="radio" name="${feature.featureName}" value="${feature.characteristics[0].name}"/>`
        feature.characteristics[0].inputHtml = aInputElement
    }

    addCSSFragments(feature: FeatureDefinition): void {
        feature.characteristics.forEach((characteristic) => {
            characteristic.css = `.option-${feature.featureName}-${characteristic.name} {background-image:  url(./assets/${feature.featureName}/${feature.featureName}-${characteristic.name}.png); }`
        })
    }
}