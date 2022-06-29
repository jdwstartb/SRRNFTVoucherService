import {FeatureDefinition} from "./Types";
import {FileBackupService} from "../service/file-backup-service";
import {getAsPreviewSVG} from "../util";
import {PNGFromSvgGenerator} from "../service/svg-generator-service";

export class ImageSourceConverterImageOutputService {
    service: FileBackupService = new FileBackupService()

    pngGenerator: PNGFromSvgGenerator = new PNGFromSvgGenerator()

    async handleImageFileCreation(features: FeatureDefinition[], targetFolder: string): Promise<void> {
        features.forEach(feature => {
            feature.characteristics.forEach(characteristic => {
                this.processSingleCharacteristic(characteristic, targetFolder)
            })
        })
    }

    async processSingleCharacteristic(characteristic, targetFolder): Promise<void> {

        const pngBuffer = await this.pngGenerator.transform(getAsPreviewSVG(characteristic.previewContent))
        await this.service.writeFile(`${targetFolder}/${characteristic.exampleFileLocation}`, pngBuffer, "base64")
        return
    }

}