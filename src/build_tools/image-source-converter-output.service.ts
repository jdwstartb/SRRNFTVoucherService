import {FeatureDefinition} from "./Types";
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
        await this.fileWriterService.writeFile(`${targetFolder}/feature-options.css`, cssContent.join("\n"), "utf-8")
    }

    async createSVGFragmentsFile(features: FeatureDefinition[], targetFolder: string): Promise<void> {


    }

    async createFormFragmentsFile(features: FeatureDefinition[], targetFolder: string): Promise<void> {

    }


}