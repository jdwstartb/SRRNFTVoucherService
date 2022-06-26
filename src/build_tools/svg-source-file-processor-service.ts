import {FormSelectionGeneratorService} from "./form-selection-generator-service";
import {SvgFeatureFragmentsBuilderService} from "./svg-feature-fragments-builder-service";
import {PNGFromSvgGenerator} from "../service/svg-generator-service";
import {FileBackupService} from "../service/file-backup-service";
import {FeatureDefinition} from "./Types";
import {ImageSourceConverterTextOutputService} from "./image-source-converter-output.service";
import {ImageSourceConverterImageOutputService} from "./image-source-converter-image-output.service";

export class SvgSourceFileProcessorService {

    formSelectionGenerator: FormSelectionGeneratorService
    fileWriterService: FileBackupService
    svgFragmentsBuilder: SvgFeatureFragmentsBuilderService
    pngGenerator: PNGFromSvgGenerator
    converterOutputService: ImageSourceConverterTextOutputService
    imageOutputService: ImageSourceConverterImageOutputService

    constructor(formSelectionGenerator: FormSelectionGeneratorService, svgFragmentsBuilder: SvgFeatureFragmentsBuilderService, pngGenerator: PNGFromSvgGenerator, fileWriterService: FileBackupService, converterOutputService: ImageSourceConverterTextOutputService) {
        this.formSelectionGenerator = formSelectionGenerator
        this.svgFragmentsBuilder = svgFragmentsBuilder
        this.pngGenerator = pngGenerator
        this.fileWriterService = fileWriterService
        this.converterOutputService = converterOutputService
    }

    async processSourceFile(pathToFile: string, targetFolder: string) {
        const svgDataString = await this.loadSourceFileContent(pathToFile)
        const svgFeatures = await this.svgFragmentsBuilder.getFeatureFragmentsFromSVGString(svgDataString)
        this.formSelectionGenerator.enhanceOutputInformation(svgFeatures)
        await this.converterOutputService.handleFeatureToFilesTransformation(svgFeatures, targetFolder)
        await this.imageOutputService.handleImageFileCreation(svgFeatures, targetFolder)
    }

    async writeCSSToBuildDir(features: FeatureDefinition[]) {
        const cssContent: string[] = []
        features.forEach(feature => {
            feature.characteristics.forEach(characteristic => {
                cssContent.push(characteristic.css || "")
            })
        })
        await this.fileWriterService.writeOptionsCSSToBuildLocation(cssContent.join("\n"))
    }

    async loadSourceFileContent(pathToFile: string): Promise<string> {
        throw new Error("NOT IMPLEMENTED")
    }
}