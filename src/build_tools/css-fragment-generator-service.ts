import {FeatureDefinition} from "./Types";

export class CSSFragmentGeneratorService {

    getCSSFragments(feature: FeatureDefinition): string[] {
        const returnValue: string[] = []

        feature.characteristics.forEach((characteristic) => {
            returnValue.push(`.option-${feature.featureName}-${characteristic.name} {background-image:  url(./assets/${feature.featureName}/${feature.featureName}-${characteristic.name}.png); }`)
        })


        return returnValue
    }
}