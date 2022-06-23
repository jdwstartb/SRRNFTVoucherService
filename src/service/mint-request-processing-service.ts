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

    async performMintRequest(requestParams: MintRequestParams): Promise<{ success: boolean, message: string }> {


        const theVoucher = requestParams.voucher

        const validationResult = await this.validateRequest(theVoucher)
        if (!validationResult.success) {
            return validationResult
        }

        const pngData = await this.generatePng(requestParams)

        const pinataResponse = await this.uploadPng(pngData, theVoucher)

        if (!pinataResponse.success) {
            return {success: false, message: "Error when uploading requested image"}
        }

        const startrailAPIResponse = await this.handleStartrailRequest(requestParams, pinataResponse.payload.url)

        if (startrailAPIResponse.success) {
            await voucherService.invalidateVoucher(theVoucher)
            return {success: true, message: "ok"}
        }
        return {success: false, message: "error"}
    }


    async validateRequest(theVoucher: string): Promise<{ success: boolean, message: string }> {
        if (!voucherService.isValidVoucher(theVoucher)) {
            return {success: false, message: "validation Error"}
        }

        return {success: true, message: "OK"}
    }


    async generatePng(requestParams: MintRequestParams): Promise<string | Buffer> {

        console.log(`${Date.now()}:starting SVG generation`)

        const nftImageSource = await svgBuilderService.buildSVGString(requestParams)

        console.log(`${Date.now()}:build SVG string done`)

        const pngBuffer = await pngFromSvgGenerator.transform(nftImageSource)

        console.log(`${Date.now()}:transformation done`)

        return ""
    }

    async uploadPng(fileContentData: Buffer | string, theVoucher: string): Promise<{ success: boolean, message: string, payload: { url: string } }> {
        const editionNumber = voucherService.getEdition(theVoucher)

        const fileName = `SBNYv1-${editionNumber}`

        console.log(`${Date.now()}:pinata start`)
        const pinataResponse = await pinataService.uploadImage(fileContentData, fileName)
        console.log(`${Date.now()}:pinata done`)
        return pinataResponse
    }

    async handleStartrailRequest(requestParams: MintRequestParams, imageUrl): Promise<{ success: boolean }> {

        console.log(`${Date.now()}:preparing issue request payload ...`)
        const srrMetadata = metadataService.getIssueSRRRequestPayload(requestParams, imageUrl)

        console.log(`${Date.now()}:preparing issue request payload done`)

        console.log(`${Date.now()}:starting issue request ...`)

        const startrailAPIResponse = await srrApiService.issueAndTransferSRR(srrMetadata)

        console.log(`${Date.now()}:issue request done`)
        return startrailAPIResponse
    }

}
