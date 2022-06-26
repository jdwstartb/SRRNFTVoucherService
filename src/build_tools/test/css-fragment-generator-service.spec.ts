import {FeatureDefinition} from "../Types";
import {CSSFragmentGeneratorService} from "../css-fragment-generator-service";

describe("CSSFragmentGeneratorService", () => {

    const service: CSSFragmentGeneratorService = new CSSFragmentGeneratorService()

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
        const className = `.option-${featureName}-${characteristicsName}`
        expect(cssFragments[0]).toMatch(className)
        const urlPath = `url(./assets/${featureName}/${featureName}-${characteristicsName}.png)`
        expect(cssFragments[0]).toMatch(urlPath)
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
        const className = `.option-${featureName}-${characteristicsName}`
        expect(cssFragments[0]).toMatch(className)
        const urlPath = `url(./assets/${featureName}/${featureName}-${characteristicsName}.png)`
        expect(cssFragments[0]).toMatch(urlPath)

        const className2 = `.option-${featureName}-${characteristicsName2}`
        expect(cssFragments[1]).toMatch(className2)
        const urlPath2 = `url(./assets/${featureName}/${featureName}-${characteristicsName2}.png)`
        expect(cssFragments[1]).toMatch(urlPath2)

    })

})