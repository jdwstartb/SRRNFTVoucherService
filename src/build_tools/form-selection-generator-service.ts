import {FeatureDefinition} from "./Types";

export class FormSelectionGeneratorService {
    getCharacteristicInputElement(feature: FeatureDefinition): string {
        return `<input />`
    }
}