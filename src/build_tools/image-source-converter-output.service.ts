import {Characteristic, FeatureDefinition} from "./Types";
import {FileBackupService} from "../service/file-backup-service";

export class ImageSourceConverterTextOutputService {
    fileWriterService: FileBackupService

    constructor(fileWriterService: FileBackupService) {
        this.fileWriterService = fileWriterService
    }

    async handleFeatureToFilesTransformation(features: FeatureDefinition[], targetFolder: string): Promise<void> {
        await this.createCSSFile(features, targetFolder)
        await this.createSVGFragmentsFile(features, targetFolder)
        await this.createFormFragmentsFile(features, targetFolder)
    }

    async createCSSFile(features: FeatureDefinition[], targetFolder: string): Promise<void> {
        const cssContent: string[] = []
        features.forEach(feature => {
            feature.characteristics.forEach(characteristic => {
                cssContent.push(characteristic.css || "")
            })
        })
        await this.writeOutputTextFile(targetFolder, "feature-options.css", cssContent)
    }

    async createSVGFragmentsFile(features: FeatureDefinition[], targetFolder: string): Promise<void> {

    }

    async createFormFragmentsFile(features: FeatureDefinition[], targetFolder: string): Promise<void> {
        const formContent: string[] = []

        features.forEach(feature => {
            formContent.push(...this.getFormForSingleFeature(feature))
        })

        await this.writeOutputTextFile(targetFolder, "fragments.hbs", formContent)
    }

    async writeOutputTextFile(folder: string, filename: string, contentParts: string[]): Promise<void> {
        await this.fileWriterService.writeFile(`${folder}/${filename}`, contentParts.join("\n"), "utf-8")
    }

    getFormForSingleFeature(feature: FeatureDefinition): string[] {
        const featureFormContent: string [] = []
        featureFormContent.push(feature.htmlFormFeaturePrefix || "")
        feature.characteristics.forEach(characteristic => {
            featureFormContent.push(this.getFeatureCharacteristicFormFragment(characteristic))
        })
        featureFormContent.push(feature.htmlFormFeaturePostfix || "")
        return featureFormContent
    }

    getFeatureCharacteristicFormFragment(characteristic: Characteristic): string {
        return `${characteristic.inputHtml} ${characteristic.labelHtml}`
    }


}