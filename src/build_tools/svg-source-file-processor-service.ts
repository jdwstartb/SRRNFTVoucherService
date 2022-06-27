import {FormSelectionGeneratorService} from "./form-selection-generator-service";
import {SvgFeatureFragmentsBuilderService} from "./svg-feature-fragments-builder-service";
import {ImageSourceConverterTextOutputService} from "./image-source-converter-output.service";
import {ImageSourceConverterImageOutputService} from "./image-source-converter-image-output.service";
import {FileLoaderService} from "./file-loader.service";

export class SvgSourceFileProcessorService {

    formSelectionGenerator: FormSelectionGeneratorService
    svgFragmentsBuilder: SvgFeatureFragmentsBuilderService
    fileLoader: FileLoaderService
    converterTextOutputService: ImageSourceConverterTextOutputService
    converterImageOutputService: ImageSourceConverterImageOutputService

    constructor(fileLoader: FileLoaderService, svgFragmentsBuilder: SvgFeatureFragmentsBuilderService, formSelectionGenerator: FormSelectionGeneratorService, converterTextOutputService: ImageSourceConverterTextOutputService, converterImageOutputService: ImageSourceConverterImageOutputService) {
        this.fileLoader = fileLoader
        this.formSelectionGenerator = formSelectionGenerator
        this.svgFragmentsBuilder = svgFragmentsBuilder
        this.converterTextOutputService = converterTextOutputService
        this.converterImageOutputService = converterImageOutputService
    }

    async processSourceFile(pathToFile: string, targetFolder: string) {
        const svgDataString = await this.fileLoader.loadSourceFileContent(pathToFile)
        const svgFeatures = await this.svgFragmentsBuilder.getFeatureFragmentsFromSVGString(svgDataString)
        this.formSelectionGenerator.enhanceTextOutputInformation(svgFeatures)
        await this.converterTextOutputService.handleFeatureToFilesTransformation(svgFeatures, targetFolder)
        await this.converterImageOutputService.handleImageFileCreation(svgFeatures, targetFolder)
    }

}