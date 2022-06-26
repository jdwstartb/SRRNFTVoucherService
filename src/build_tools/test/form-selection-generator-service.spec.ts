import {FeatureDefinition} from "../Types";
import {FormSelectionGeneratorService} from "../form-selection-generator-service";

describe("FormSelectionGeneratorService", () => {
    const service: FormSelectionGeneratorService = new FormSelectionGeneratorService()
    describe('addInputHtmlToCharacteristics', function () {
        it('generates a single characteristic correctly', () => {
            const featureName = "aFeatureName"
            const characteristicsName = "aCharacteristicName"

            const testFeature: FeatureDefinition = {
                featureName,
                orderNumber: 0,
                characteristics: [{name: characteristicsName, content: "someIrrelevant Content"}]
            }

            service.addInputHtmlToCharacteristics(testFeature)

            const expectedRegexes = [
                /^<input.*\/>$/,
                `id="${featureName}-${characteristicsName}"`,
                'type="radio"',
                `name="${featureName}"`,
                `value="${characteristicsName}"`
            ]

            expectedRegexes.forEach(anExpectedRegex => {
                expect(testFeature.characteristics[0].inputHtml).toMatch(anExpectedRegex)
            })
        })
    });

})