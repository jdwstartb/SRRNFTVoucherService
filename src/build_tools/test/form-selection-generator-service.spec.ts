import {FeatureDefinition} from "../Types";
import {FormSelectionGeneratorService} from "../form-selection-generator-service";

describe("FormSelectionGeneratorService", () => {
    const service: FormSelectionGeneratorService = new FormSelectionGeneratorService()
    describe('getCharacteristicInputElement', function () {
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


            // <input id="oc-brown" type="radio" name="bodyOffColor" value="brown"/>
            // <label
            //     class="drinkcard-cc option-off-color-brown" for="oc-brown"></label>

        })
    });

})