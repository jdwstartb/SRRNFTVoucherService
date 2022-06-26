import {FeatureDefinition} from "../Types";
import {CSSFragmentGeneratorService} from "../css-fragment-generator-service";

describe("CSSFragmentGeneratorService", () => {

    const service: CSSFragmentGeneratorService = new CSSFragmentGeneratorService()

    function expectClassNameCorrect(testFeature: FeatureDefinition) {
        testFeature.characteristics.forEach(characteristic => {
            const className = `.option-${testFeature.featureName}-${characteristic.name}`
            expect(characteristic.css).toMatch(className)
        })
    }

    function expectUrlCorrect(testFeature: FeatureDefinition) {
        testFeature.characteristics.forEach(characteristic => {
            const urlPath = `url(./assets/${testFeature.featureName}/${testFeature.featureName}-${characteristic.name}.png)`
            expect(characteristic.css).toMatch(urlPath)
        })
    }

    describe("addCSSFragments", () => {
        it("generates a css fragment for a single characteristics", () => {
            const featureName = "aFeatureName"
            const characteristicsName = "aCharacteristicName"

            const testFeature: FeatureDefinition = {
                featureName,
                orderNumber: 0,
                characteristics: [{name: characteristicsName, content: "someIrrelevant Content"}]
            }

            service.addCSSFragments(testFeature)

            expectClassNameCorrect(testFeature)
            expectUrlCorrect(testFeature)
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

            service.addCSSFragments(testFeature)

            expectClassNameCorrect(testFeature)
            expectUrlCorrect(testFeature)
        })
    })
})