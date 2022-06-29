import {FeatureDefinition} from "../Types";
import {ImageSourceConverterTextOutputService} from "../image-source-converter-output.service";
import {FileBackupService} from "../../service/file-backup-service";

jest.mock("../../service/file-backup-service")

describe('ImageSourceConverterTextOutputService', function () {
    const mockWriter: FileBackupService = new FileBackupService()
    const mockWriteCSSFileFunction = mockWriter.writeFile as any

    const service: ImageSourceConverterTextOutputService = new ImageSourceConverterTextOutputService(mockWriter)

    afterEach(() => {
        jest.clearAllMocks()
    })
    const targetOutputFolder = "afolder"
    const testNoFeatures: FeatureDefinition[] = []

    describe("createCSSFile", () => {


        it('builds for no features and dispatches an empty css', async () => {

            await service.createCSSFile(testNoFeatures, targetOutputFolder)
            expect(mockWriteCSSFileFunction).toHaveBeenCalledTimes(1)
            expect(mockWriteCSSFileFunction.mock.calls[0][1]).toEqual("")
            expect(mockWriteCSSFileFunction.mock.calls[0][0]).toMatch(targetOutputFolder)
        })

        it('builds for multiple features with multiple characteristics', async () => {
            const features = [{characteristics: [{css: "aString"}, {css: "moreCSS"}]}, {characteristics: [{css: "someString"}]}] as any
            await service.createCSSFile(features, targetOutputFolder)
            expect(mockWriteCSSFileFunction).toHaveBeenCalledTimes(1)
            const cssContent = mockWriteCSSFileFunction.mock.calls[0][1]
            expect(cssContent).toMatch(/aString/)
            expect(cssContent).toMatch(/moreCSS/)
            expect(cssContent).toMatch(/someString/)
        })

    })

    describe('createFormFragmentsFile', function () {

        it('creates a form file', async () => {
            await service.createFormFragmentsFile(testNoFeatures, targetOutputFolder)
            expect(mockWriteCSSFileFunction).toHaveBeenCalledTimes(1)
            expect(mockWriteCSSFileFunction.mock.calls[0][1]).toEqual("")
            expect(mockWriteCSSFileFunction.mock.calls[0][0]).toMatch(targetOutputFolder)
        })

        it('builds for multiple features with multiple characteristics', async () => {
            const features = [{
                htmlFormFeaturePrefix: "pre",
                htmlFormFeaturePostfix: "post",
                characteristics: [{labelHtml: "label1", inputHtml: "input1"}, {
                    labelHtml: "label2",
                    inputHtml: "input2"
                }] as any
            } as FeatureDefinition,]
            await service.createFormFragmentsFile(features, targetOutputFolder)
            expect(mockWriteCSSFileFunction).toHaveBeenCalledTimes(1)
            const htmlContent = mockWriteCSSFileFunction.mock.calls[0][1]
            expect(htmlContent).toMatch(/pre\sinput1\slabel1\sinput2\slabel2\spost/)

        })

    });


});