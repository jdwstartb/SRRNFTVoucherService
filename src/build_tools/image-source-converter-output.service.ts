import {FeatureDefinition} from "./Types";
import {FileBackupService} from "../service/file-backup-service";

export class ImageSourceConverterTextOutputService {
    fileWriterService: FileBackupService

    constructor(fileWriterService: FileBackupService) {
        this.fileWriterService = fileWriterService
    }

    async handleFeatureToFilesTransformation(features: FeatureDefinition[], targetFolder: string): Promise<void> {

    }

    async createCSSFile(features: FeatureDefinition[], targetFolder: string): Promise<void> {
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


    async createSVGFragmentsFile(features: FeatureDefinition[], targetFolder: string): Promise<void> {

    }

    async createFormFragmentsFile(features: FeatureDefinition[], targetFolder: string): Promise<void> {

    }


}