import {FormSelectionGeneratorService} from "./form-selection-generator-service";
import {SvgFeatureFragmentsBuilderService} from "./svg-feature-fragments-builder-service";
import {PNGFromSvgGenerator} from "../service/svg-generator-service";
import {FileBackupService} from "../service/file-backup-service";
import {FeatureDefinition} from "./Types";

export class SvgSourceFileProcessorService {

    formSelectionGenerator: FormSelectionGeneratorService
    fileWriterService: FileBackupService
    svgFragmentsBuilder: SvgFeatureFragmentsBuilderService
    pngGenerator: PNGFromSvgGenerator

    constructor(formSelectionGenerator: FormSelectionGeneratorService, svgFragmentsBuilder: SvgFeatureFragmentsBuilderService, pngGenerator: PNGFromSvgGenerator, fileWriterService: FileBackupService) {
        this.formSelectionGenerator = formSelectionGenerator
        this.svgFragmentsBuilder = svgFragmentsBuilder
        this.pngGenerator = pngGenerator
        this.fileWriterService = fileWriterService
    }

    processSourceFile(pathToFile: string) {

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
}