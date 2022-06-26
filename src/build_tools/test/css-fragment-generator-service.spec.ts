import {FeatureDefinition} from "../Types";
import {CSSFragmentGeneratorService} from "../css-fragment-generator-service";

describe("CSSFragmentGeneratorService", () => {

    const service: CSSFragmentGeneratorService = new CSSFragmentGeneratorService()

    it("generates a css fragment for a single entry", () => {
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

        // .option-darkBlue {
        //         background-image: url(./assets/bg/bg-darkBlue.png);
        //     }
    })
})