import {PNGFromSvgGenerator} from './svg-generator-service'
import {MetadataService} from './metadata-service'
import {VoucherService} from './voucher-service'
import {NFTSVGBuilderService} from './nft-svg-builder-service'
import {EditionService} from "./edition-service";
import {PinataService} from "./pinata-service";
import {MintRequestParams} from "../mint-request-params";
import {SrrApiService} from "./srr-api-service";


const pngFromSvgGenerator = new PNGFromSvgGenerator()
const voucherService = new VoucherService()
const svgBuilderService = new NFTSVGBuilderService()
const editionService = new EditionService()
const pinataService = new PinataService()
const metadataService = new MetadataService(editionService)
const srrApiService = new SrrApiService()

export class MintRequestProcessingService {

    async generateFileAndUploadAndMint(requestParams: MintRequestParams): Promise<{ success: boolean, message: string }> {


        const theVoucher = requestParams.voucher

        if (!voucherService.isValidVoucher(theVoucher)) {
            return {success: false, message: "validation Error"}
        }
        const editionNumber = voucherService.getEdition(theVoucher)

        const nftImageSource = await svgBuilderService.buildSVGString(requestParams)

        const pngBuffer = await pngFromSvgGenerator.transform(nftImageSource)

        const pinataResponse = await pinataService.uploadImage(pngBuffer, `SBNYv1-${editionNumber}`)

        if (!pinataResponse.success) {
            return {success: false, message: "Error when uploading"}
        }

        const srrMetadata = metadataService.getMetadataRequest(requestParams, pinataResponse.payload.url)

        const startrailAPIResponse = await srrApiService.issueAndTransferSRR(srrMetadata)

        if (startrailAPIResponse.success) {
            voucherService.invalidateVoucher(theVoucher)
            return {success: true, message: "ok"}
        }
        return {success: false, message: "error"}
    }
}
