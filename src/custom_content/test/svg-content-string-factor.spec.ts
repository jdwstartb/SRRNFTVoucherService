import {SvgContentStringFactory} from "../svg-content-string-factory";
import {getAsSVG} from "../../util";
import {PNGFromSvgGenerator} from "../../service/svg-generator-service";
import {FileBackupService} from "../../service/file-backup-service";
import {getValidCustomParams} from "./custom-param-factory";

const pngFromSVGGenerator = new PNGFromSvgGenerator()
const fileBackupService = new FileBackupService()

describe("SvgContentStringFactory", () => {
    const factory = new SvgContentStringFactory()

    it('produces bunnies to see', async () => {

        for (let i = 0; i < 10; i++) {
            const generatedParams = getValidCustomParams()
            const svgFragment = getAsSVG(factory.build(generatedParams.params))
            console.log(svgFragment)
            const pngContent = await pngFromSVGGenerator.transform(svgFragment)
            await fileBackupService.writePngToBackupLocation(pngContent, `verification/bunnies/`, `${generatedParams.contentDescription}`)
        }
    })
})