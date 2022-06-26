import {FeatureDefinition} from "./Types";

export class CSSFragmentGeneratorService {

    getCSSFragments(feature: FeatureDefinition): string[] {
        return [".option-aFeatureName-aCharacteristicName url(./assets/aFeatureName/aFeatureName-aCharacteristicName.png)"]
    }
}