import {Characteristic, FeatureDefinition} from "./Types";

export class FormSelectionGeneratorService {

    enhanceTextOutputInformation(features: FeatureDefinition[]): void {
        features.forEach((feature) => {
            this.addFormHtmlToFeature(feature)
            this.addCSSFragments(feature)
            this.addInputHtmlToCharacteristics(feature)
            this.addLabelHtmlToCharacteristics(feature)
            this.addExampleFileLocation(feature)
            this.enhancePreviewFragment(feature)
        })
    }

    addFormHtmlToFeature(feature: FeatureDefinition): void {
        feature.htmlFormFeaturePrefix = `<label for="${feature.featureName}">Select ${feature.featureName}<div class="cc-selector">`
        feature.htmlFormFeaturePostfix = `</div></label><br>`
    }

    addInputHtmlToCharacteristics(feature: FeatureDefinition): void {

        feature.characteristics.forEach((characteristic) => {
            const aInputElement = `<input id="${feature.featureName}-${characteristic.name}" type="radio" name="${feature.featureName}" value="${characteristic.name}"/>`
            characteristic.inputHtml = aInputElement
        })

    }

    addCSSFragments(feature: FeatureDefinition): void {
        feature.characteristics.forEach((characteristic) => {
            characteristic.css = `.option-${feature.featureName}-${characteristic.name} {background-image:  url(.${this.getFilePathForCharacteristicOfFeatureInAssetsFolder(characteristic, feature)}); }`
        })
    }

    addLabelHtmlToCharacteristics(feature: FeatureDefinition): void {
        feature.characteristics.forEach((characteristic) => {
            characteristic.labelHtml = `<label class="drinkcard-cc option-${feature.featureName}-${characteristic.name}" for="${feature.featureName}-${characteristic.name}"></label>`
        })
    }

    addExampleFileLocation(feature: FeatureDefinition): void {
        feature.characteristics.forEach((characteristic) => {
            characteristic.exampleFileLocation = `./public${this.getFilePathForCharacteristicOfFeatureInAssetsFolder(characteristic, feature)}`
        })
    }

    enhancePreviewFragment(feature: FeatureDefinition): void {
        let previewBG
        let previewFG

        feature.characteristics.forEach((characteristic) => {
            if (characteristic.name === `${feature.featureName}-${feature.featureName}-bg`) {
                previewBG = characteristic
            }
            if (characteristic.name === `${feature.featureName}-${feature.featureName}-fg`) {
                previewFG = characteristic
            }
        })

        feature.characteristics.forEach((characteristic) => {

            if (characteristic.name !== `${feature.featureName}-bg` && characteristic.name !== `${feature.featureName}-fg`) {
                const previewBGFragment = previewBG?.content || ''
                const previewFGFragment = previewFG?.content || ''

                characteristic.previewContent = `${previewBGFragment}${characteristic.content}${previewFGFragment}`
            }
        })

        feature.characteristics = feature.characteristics.filter((characteristic) => characteristic !== previewFG && characteristic !== previewBG)
    }

    getFilePathForCharacteristicOfFeatureInAssetsFolder(characteristic: Characteristic, feature: FeatureDefinition): string {
        return `/assets/${feature.featureName}/${feature.featureName}-${characteristic.name}.png`
    }

}