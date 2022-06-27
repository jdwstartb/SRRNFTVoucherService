import {FeatureDefinition} from "../Types";
import {ImageSourceConverterTextOutputService} from "../image-source-converter-output.service";
import {FileBackupService} from "../../service/file-backup-service";

jest.mock("../../service/file-backup-service")

describe('ImageSourceConverterTextOutputService', function () {
    const mockWriter: FileBackupService = new FileBackupService()
    const service: ImageSourceConverterTextOutputService = new ImageSourceConverterTextOutputService(mockWriter)

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("writeCSSToBuildDir", () => {
        const mockWriteCSSFileFunction = mockWriter.writeFile as any
        const targetOutputFolder = "afolder"

        const testFeatures: FeatureDefinition[] = []
        it('builds for no features and dispatches an empty css', async () => {

            await service.createCSSFile(testFeatures, targetOutputFolder)
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

});