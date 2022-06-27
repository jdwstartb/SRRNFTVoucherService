import {SvgSourceFileProcessorService} from "../svg-source-file-processor-service";
import {SvgFeatureFragmentsBuilderService} from "../svg-feature-fragments-builder-service";
import {FormSelectionGeneratorService} from "../form-selection-generator-service";
import {FileLoaderService} from "../file-loader.service";
import {ImageSourceConverterTextOutputService} from "../image-source-converter-output.service";
import {ImageSourceConverterImageOutputService} from "../image-source-converter-image-output.service";


jest.mock('../file-loader.service')

describe("SVGSourceFileProcessorService", () => {
    const fileLoader: FileLoaderService = new FileLoaderService()
    const svgFragmentsBuilder: SvgFeatureFragmentsBuilderService = new SvgFeatureFragmentsBuilderService()
    const formSelectionGenerator: FormSelectionGeneratorService = new FormSelectionGeneratorService()
    const converterTextOutputService: ImageSourceConverterTextOutputService = new ImageSourceConverterTextOutputService({} as any)
    const converterImageOutputService: ImageSourceConverterImageOutputService = new ImageSourceConverterImageOutputService()

    afterEach(() => {
        jest.clearAllMocks()
    })

    const service: SvgSourceFileProcessorService = new SvgSourceFileProcessorService(fileLoader, svgFragmentsBuilder, formSelectionGenerator, converterTextOutputService, converterImageOutputService)

    describe("processSourceFile", () => {
        it('does something', () => {
            service.processSourceFile("./source-images/automation.svg", "./test-output/unit")
        })
    })
})