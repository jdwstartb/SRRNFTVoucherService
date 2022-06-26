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
            service.addLabelHtmlToCharacteristics(testFeature)

            const expectedRegexes = [
                /^<label.*><\/label>$/,
                `class="drinkcard-cc option-${featureName}-${characteristicsName}"`,
                `for="${featureName}-${characteristicsName}"`,
            ]
            expectedRegexes.forEach(anExpectedRegex => {
                expect(testFeature.characteristics[0].labelHtml).toMatch(anExpectedRegex)
            })
        })
        it('adds the label fragment for multiple entries', () => {
            service.addLabelHtmlToCharacteristics(testFeatureMore)

            testFeatureMore.characteristics.forEach((characteristic) => {
                const expectedRegexes = [
                    /^<label.*><\/label>$/,
                    `class="drinkcard-cc option-${testFeatureMore.featureName}-${characteristic.name}"`,
                    `for="${testFeatureMore.featureName}-${characteristic.name}"`,
                ]
                expectedRegexes.forEach(anExpectedRegex => {
                    expect(characteristic.labelHtml).toMatch(anExpectedRegex)
                })
            })

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

    describe("addExampleFileLocation", () => {
        it('adds the expected file location', () => {
            service.addExampleFileLocation(testFeature)

            expect(testFeature.characteristics[0].exampleFileLocation).toEqual(`./public/assets/${testFeature.featureName}/${testFeature.featureName}-${testFeature.characteristics[0].name}.png`)

        })
    })
})
