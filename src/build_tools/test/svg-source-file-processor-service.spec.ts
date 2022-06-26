import {SvgSourceFileProcessorService} from "../svg-source-file-processor-service";
import {SvgFeatureFragmentsBuilderService} from "../svg-feature-fragments-builder-service";
import {FormSelectionGeneratorService} from "../form-selection-generator-service";
import {PNGFromSvgGenerator} from "../../service/svg-generator-service";
import {FeatureDefinition} from "../Types";


describe("SVGSourceFileProcessorService", () => {
    const svgFragmentsBuilder = {
        getFeatureFragmentsFromSVGString: jest.fn(),
        getInkscapeName: jest.fn(),
        cleanupSodipodiAndAddPathID: jest.fn(),
        getCharacteristics: jest.fn()
    } as SvgFeatureFragmentsBuilderService
    const formGeneratorMock = {} as FormSelectionGeneratorService
    const pngGeneratorMock = {} as PNGFromSvgGenerator
    const fileWriterMock = {
        writeOptionsCSSToBuildLocation: jest.fn()
    } as any

    afterEach(() => {
        jest.clearAllMocks()
    })

    const service: SvgSourceFileProcessorService = new SvgSourceFileProcessorService(formGeneratorMock, svgFragmentsBuilder, pngGeneratorMock, fileWriterMock)

    describe("processSourceFile", () => {
        it('does something', () => {
            service.processSourceFile("./source-images/automation.svg")
        })
    })

    describe("writeCSSToBuildDir", () => {

        const testFeatures: FeatureDefinition[] = []
        it('builds for no features and dispatches an empty css', async () => {

            await service.writeCSSToBuildDir(testFeatures)
            expect(fileWriterMock.writeOptionsCSSToBuildLocation).toHaveBeenCalledTimes(1)
            expect(fileWriterMock.writeOptionsCSSToBuildLocation.mock.calls[0][0]).toEqual("")
        })

        it('builds for multiple features with multiple characteristics', async () => {
            const features = [{characteristics: [{css: "aString"}, {css: "moreCSS"}]}, {characteristics: [{css: "someString"}]}] as any
            await service.writeCSSToBuildDir(features)
            expect(fileWriterMock.writeOptionsCSSToBuildLocation).toHaveBeenCalledTimes(1)
            const cssContent = fileWriterMock.writeOptionsCSSToBuildLocation.mock.calls[0][0]
            expect(cssContent).toMatch(/aString/)
            expect(cssContent).toMatch(/moreCSS/)
            expect(cssContent).toMatch(/someString/)
        })

    })

})