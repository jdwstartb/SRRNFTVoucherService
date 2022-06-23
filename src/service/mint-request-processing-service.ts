import {PNGFromSvgGenerator} from './svg-generator-service'
import {IssueRequestPayloadService} from './issue-request-payload-service'
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
const metadataService = new IssueRequestPayloadService(editionService)
const srrApiService = new SrrApiService()

export class MintRequestProcessingService {

    async generateFileAndUploadAndMint(requestParams: MintRequestParams): Promise<{ success: boolean, message: string }> {


        const theVoucher = requestParams.voucher

        if (!voucherService.isValidVoucher(theVoucher)) {
            return {success: false, message: "validation Error"}
        }
        const editionNumber = voucherService.getEdition(theVoucher)

        const nftImageSource = await svgBuilderService.buildSVGString(requestParams)

        console.log(`${Date.now()}:build SVG string done`)

        const pngBuffer = await pngFromSvgGenerator.transform(nftImageSource)

        console.log(`${Date.now()}:transformation done`)

        const pinataResponse = await pinataService.uploadImage(pngBuffer, `SBNYv1-${editionNumber}`)

        console.log(`${Date.now()}:pinata done`)
        if (!pinataResponse.success) {
            return {success: false, message: "Error when uploading"}
        }

        const srrMetadata = metadataService.getIssueSRRRequestPayload(requestParams, pinataResponse.payload.url)

        console.log(`${Date.now()}:metadata calculation done`)

        const startrailAPIResponse = await srrApiService.issueAndTransferSRR(srrMetadata)

        console.log(`${Date.now()}:issuance done`)

        if (startrailAPIResponse.success) {
            voucherService.invalidateVoucher(theVoucher)
            return {success: true, message: "ok"}
        }
        return {success: false, message: "error"}
    }
}
