import {FeatureDefinition} from "./Types";

export class CSSFragmentGeneratorService {

    addCSSFragments(feature: FeatureDefinition): void {
        feature.characteristics.forEach((characteristic) => {
            characteristic.css = `.option-${feature.featureName}-${characteristic.name} {background-image:  url(./assets/${feature.featureName}/${feature.featureName}-${characteristic.name}.png); }`
        })
    }
}