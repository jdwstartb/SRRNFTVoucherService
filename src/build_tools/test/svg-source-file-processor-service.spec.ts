import {SvgSourceFileProcessorService} from "../svg-source-file-processor-service";
import {SvgFeatureFragmentsBuilderService} from "../svg-feature-fragments-builder-service";
import {FormSelectionGeneratorService} from "../form-selection-generator-service";
import {FileLoaderService} from "../file-loader.service";
import {ImageSourceConverterTextOutputService} from "../image-source-converter-output.service";
import {ImageSourceConverterImageOutputService} from "../image-source-converter-image-output.service";
import {FileBackupService} from "../../service/file-backup-service";


describe("SVGSourceFileProcessorService", () => {
    const fileLoader: FileLoaderService = new FileLoaderService()
    const svgFragmentsBuilder: SvgFeatureFragmentsBuilderService = new SvgFeatureFragmentsBuilderService()
    const formSelectionGenerator: FormSelectionGeneratorService = new FormSelectionGeneratorService()
    const fileWriterService: FileBackupService = new FileBackupService()
    const converterTextOutputService: ImageSourceConverterTextOutputService = new ImageSourceConverterTextOutputService(fileWriterService)
    const converterImageOutputService: ImageSourceConverterImageOutputService = new ImageSourceConverterImageOutputService()


    const service: SvgSourceFileProcessorService = new SvgSourceFileProcessorService(fileLoader, svgFragmentsBuilder, formSelectionGenerator, converterTextOutputService, converterImageOutputService)

    describe("processSourceFile", () => {
        it('does something', async () => {
            await service.processSourceFile("./source-images/automation.svg", "./test-output/unit")
        })
    })
})