import {FileBackupService} from "../../service/file-backup-service";
import {ImageSourceConverterTextOutputService} from "../image-source-converter-output.service";
import {FeatureDefinition} from "../Types";

describe('ImageSourceConverterTextOutputService Integration', function () {
    const writer: FileBackupService = new FileBackupService()
    const service: ImageSourceConverterTextOutputService = new ImageSourceConverterTextOutputService(writer)
    it("creates all files", () => {
        const features: FeatureDefinition[] = [{
            characteristics: [{css: "cssDefinition"}, {css: "moreDefitions"} as any],
            featureName: "featureName",
            orderNumber: 1,
            htmlFormFeaturePostfix: "prefix",
            htmlFormFeaturePrefix: "postfix"
        }]
        service.handleFeatureToFilesTransformation(features, "./aTestFolderForIntegration")
    })
})