import {FeatureDefinition} from "../Types";
import {CSSFragmentGeneratorService} from "../css-fragment-generator-service";

describe("CSSFragmentGeneratorService", () => {

    const service: CSSFragmentGeneratorService = new CSSFragmentGeneratorService()

    function expectClassNameCorrect(cssFragment, featureName, characteristicName) {
        const className = `.option-${featureName}-${characteristicName}`
        expect(cssFragment).toMatch(className)
    }

    function expectUrlCorrect(cssFragment, featureName, characteristicName) {
        const urlPath = `url(./assets/${featureName}/${featureName}-${characteristicName}.png)`
        expect(cssFragment).toMatch(urlPath)
    }

    it("generates a css fragment for a single characteristics", () => {
        const featureName = "aFeatureName"
        const characteristicsName = "aCharacteristicName"

        const testFeature: FeatureDefinition = {
            featureName,
            orderNumber: 0,
            characteristics: [{name: characteristicsName, content: "someIrrelevant Content"}]
        }

        const cssFragments = service.getCSSFragments(testFeature)


        expect(cssFragments.length).toEqual(1)
        expectClassNameCorrect(cssFragments[0], featureName, characteristicsName)
        expectUrlCorrect(cssFragments[0], featureName, characteristicsName)
    })

    it("generates css fragments for multiple characteristics", () => {
        const featureName = "aFeatureName"
        const characteristicsName = "aCharacteristicName"
        const characteristicsName2 = "differntCharacteristicName"

        const testFeature: FeatureDefinition = {
            featureName,
            orderNumber: 0,
            characteristics: [{
                name: characteristicsName,
                content: "someIrrelevant Content"
            }, {name: characteristicsName2, content: "someIrrelevant Content"}]
        }

        const cssFragments = service.getCSSFragments(testFeature)

        expect(cssFragments.length).toEqual(2)
        expectClassNameCorrect(cssFragments[0], featureName, characteristicsName)
        expectClassNameCorrect(cssFragments[1], featureName, characteristicsName2)

        expectUrlCorrect(cssFragments[0], featureName, characteristicsName)
        expectUrlCorrect(cssFragments[1], featureName, characteristicsName2)


    })

})