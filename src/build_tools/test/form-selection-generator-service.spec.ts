import {FeatureDefinition} from "../Types";
import {FormSelectionGeneratorService} from "../form-selection-generator-service";

describe("FormSelectionGeneratorService", () => {
    const service: FormSelectionGeneratorService = new FormSelectionGeneratorService()
    const featureName = "aFeatureName"
    const characteristicsName = "aCharacteristicName"

    const testFeature: FeatureDefinition = {
        featureName,
        orderNumber: 0,
        characteristics: [{name: characteristicsName, content: "someIrrelevant Content"}]
    }

    const characteristicsName2 = "differentCharacteristicName"

    const testFeatureMore: FeatureDefinition = {
        featureName,
        orderNumber: 0,
        characteristics: [{
            name: characteristicsName,
            content: "someIrrelevant Content"
        },
            {name: characteristicsName2, content: "someIrrelevant Content"}
        ]
    }


    describe('addInputHtmlToCharacteristics', function () {
        it('generates a single characteristic correctly', () => {
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
        it('generates multiple characteristics correctly', () => {
            service.addInputHtmlToCharacteristics(testFeatureMore)

            testFeatureMore.characteristics.forEach(characteristic => {
                const expectedRegexes = [
                    /^<input.*\/>$/,
                    `id="${testFeatureMore.featureName}-${characteristic.name}"`,
                    'type="radio"',
                    `name="${testFeatureMore.featureName}"`,
                    `value="${characteristic.name}"`
                ]
                expectedRegexes.forEach(anExpectedRegex => {
                    expect(characteristic.inputHtml).toMatch(anExpectedRegex)
                })
            })

        })
    })

    describe("addLabelHtmlToCharacteristics", () => {
        it('adds the label fragment', () => {

            service
            // <label
            //     class="drinkcard-cc option-off-color-brown" for="oc-brown"></label>
        })
    })

    describe("addCSSFragments", () => {
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

        it("generates a css fragment for a single characteristics", () => {
            service.addCSSFragments(testFeature)

            expectClassNameCorrect(testFeature)
            expectUrlCorrect(testFeature)
        })

        it("generates css fragments for multiple characteristics", () => {
            service.addCSSFragments(testFeatureMore)

            expectClassNameCorrect(testFeatureMore)
            expectUrlCorrect(testFeatureMore)
        })
    })
})
