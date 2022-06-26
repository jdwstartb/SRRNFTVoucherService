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

            const testInputElement = service.getCharacteristicInputElement(testFeature)

            const expectedInputElement = `<input id="${featureName}-${characteristicsName}" type="radio" name="${featureName}" value="${characteristicsName}"/>`
            const expectedLabelElement = `<input id="${featureName}-${characteristicsName}" type="radio" name="${featureName}" value="${characteristicsName}"/>`

            const inputTagRegex = /^<input.*\/>$/

            expect(testInputElement).toMatch(inputTagRegex)


            // <input id="oc-brown" type="radio" name="bodyOffColor" value="brown"/>
            // <label
            //     class="drinkcard-cc option-off-color-brown" for="oc-brown"></label>

        })
    });

})